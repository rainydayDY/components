/**
 * 用于向用户提供接口
 * @param {object} options 用户可以自行设置的参数
 */
export function PolyvUpload(options) {
    if (!options.userid || !options.ts || !options.hash || !options.sign || !options.uploadButtton) {
        throw new TypeError('缺少必选参数！');
    }
    // var urlPrefix = location.protocol + '//beta.polyv.net/file/plug-in-v2';
    var urlPrefix = location.protocol + '//v.polyv.net/file/plug-in-v2';
    // var urlPrefix = location.protocol + '//localhost:8088/polyv-file/plug-in-v2';
    this.options = {
        userid: options.userid,
        ts: options.ts,
        ptime: options.ts,
        hash: options.hash,
        sign: options.sign,
        component: options.component || 'all',
        cataid: options.cataid || 1,
        luping: (options.luping || 0) + '',
        defaultTagPlaceholder: options.defaultTagPlaceholder || '标签 用" , "分隔',
        defaultDescPlaceholder: options.defaultDescPlaceholder || '添加描述',
        extra: JSON.stringify(options.extra || {}),
        response: options.response || function () {},
        openWrap: options.openWrap || function () {},
        uploadSuccess: options.uploadSuccess || function () {},
        uploadFail: options.uploadFail || function () {},
        url: location.href,
        urlPrefix: urlPrefix,
        source: 'polyv-upload',
    };
    this.uploadButton = document.getElementById(options.uploadButtton);

    // 默认使用HTML5方式上传
    // this.url = location.protocol + '//localhost:9090';
    this.url = urlPrefix + '/upload-html5/build/index.html';

    // 测试flash版
    // this.url = urlPrefix + '/upload-flash/index.html';

    this._init();
}
PolyvUpload.prototype = {
    constructor: PolyvUpload,
    _addHander: function (ele, type, handler) {
        if (ele.addEventListener) {
            ele.addEventListener(type, handler, false);
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + type, handler);
        } else {
            ele['on' + type] = handler;
        }
    },
    _checkH5Support: function () {
        var input = document.createElement('input');
        var fileSupport = !!(window.File && window.FileList);
        var xhr = new XMLHttpRequest();
        var fd = !!window.FormData;
        return 'multiple' in input && fileSupport && 'onprogress' in xhr && 'upload' in xhr && fd;
    },

    _init: function () {
        var self = this;

        if (!this._checkH5Support()) { // 不支持HTML5新特性时使用flash上传
            this.url = this.options.urlPrefix + '/upload-flash/index.html';
            // 需要带网络协议
        }

        // create iframe
        var iframe = this._createIframe();

        var loadIframe = function () {
            if (this.readyState && this.readyState !== 'complete') {

            } else {
                self.update();
            }
        };

        //
        this.frameMsg = iframe.contentWindow;
        if (iframe.attachEvent) {
            iframe.attachEvent('onload', loadIframe);
        } else {
            iframe.onload = loadIframe;
        }

        // Controls whether to display iframe
        this._addHander(this.uploadButton, 'click', function () {
            self.openWrap();
        });

        this._handleMsgReceive();
    },
    _createIframe: function () {
        let wrapAll = document.createElement('div');
        let wrap = document.createElement('div');
        let frameWrap = document.createElement('div');
        let cancle = document.createElement('span');
        let iframe = document.createElement('iframe');
        wrapAll.setAttribute('id', 'polyv-wrapAll');
        wrapAll.style.display = 'none';
        wrap.style.cssText = 'display: block;position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 1001;background-color: #000;-moz-opacity: 0.5;opacity: .50;filter: alpha(opacity=50);';
        frameWrap.style.cssText = 'display: block;position: fixed;left: 50%;top: 50%;width: 1000px;height: 600px;margin-top: -300px;margin-left: -500px;z-index: 1002;box-shadow: 0 0 25px rgba(0,0,0,0.7);border-radius: 10px;';
        cancle.innerHTML = '&times;';
        cancle.style.cssText = 'width: 26px;height: 26px;position: absolute;top: 0px;right: 0px;cursor: pointer;background: #eee;text-align: center;line-height: 26px;color: #666;font-size: 16px;font-family: microsoft yahei;border-radius: 0 10px 0 0;';
        cancle.onclick = function () {
            wrapAll.style.display = 'none';
        };
        iframe.setAttribute('src', this.url);
        iframe.setAttribute('id', 'polyv-iframe');
        iframe.setAttribute('width', '1000');
        iframe.setAttribute('height', '600');
        iframe.style.cssText = 'width: 100%;height: 100%;z-index: 1002;border:none;border-radius: 10px;background-color: #fff;';
        frameWrap.appendChild(iframe);
        frameWrap.appendChild(cancle);
        wrapAll.appendChild(wrap);
        wrapAll.appendChild(frameWrap);
        document.getElementsByTagName('body')[0].appendChild(wrapAll);
        return iframe;
    },

    _handleMsgReceive: function () {
        var self = this;
        this._addHander(window, 'message', function (event) {
            if (typeof (event.data) === 'string' && event.data.startsWith('{') && event.data.endsWith('}')) {
                var msgData = JSON.parse(event.data);
                switch (msgData.type) {
                    case 'VIDEO_INFO':
                        if (typeof self.options.response === 'function') {
                            self.options.response(msgData.data);
                        }
                        break;
                    case 'FILE_COMPLETE':
                        if (typeof self.options.uploadSuccess === 'function') {
                            self.options.uploadSuccess(msgData.data);
                        }
                        break;
                    case 'FILE_FAIL':
                        if (typeof self.options.uploadFail === 'function') {
                            self.options.uploadFail(msgData.data);
                        }
                        break;
                    default:
                        break;
                }
            }
        });
    },

    update: function () {
        // Update user information regularly
        if (typeof arguments[0] === 'object') {
            for (var i in arguments[0]) {
                if (arguments[0].hasOwnProperty(i)) {
                    this.options[i] = arguments[0][i];
                }
            }
            if (arguments[0].ts) {
                this.options.ptime = arguments[0].ts;
            }
        }
        this.frameMsg.postMessage(JSON.stringify(this.options), this.url);
    },

    openWrap: function () {
        this.frameMsg.postMessage(JSON.stringify({
            openWrap: true
        }), this.url);
        this.options.openWrap && this.options.openWrap();
        document.getElementById('polyv-wrapAll').style.display = 'block';
    },
    closeWrap: function () {
        document.getElementById('polyv-wrapAll').style.display = 'none';
    },
};
