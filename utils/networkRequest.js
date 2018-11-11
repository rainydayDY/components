/* !
 * networkRequest
 *
 * request网络请求
 *
 * @author dongyu
 * @version 1.0.0 2017/12/25
 * @version 1.0.1 2018/4/17
 */
import request from '@/utils/request';
import router from '@/router';
import store from '@/store';

/**
 * 带缓存的request请求
 *
 * @param cacheName 缓存名称(必传)
 * @param cacheTime 缓存时间(单位: 毫秒)(必传)
 * @param settings 请求参数(必传){method: "get" | "post" | "put" | "delete" | "patch", url: string, params?: Object, data?: Object}
 * @param isNow 是否立即请求(true: 立即请求)(必传)
 * @param successCallback 成功回调函数(非必传)
 * @param failedCallback 失败回调函数(非必传)
 */

const NetworkRequest = new class {
    handleRequest(settings, successCallback, cacheParams, flag) {
        request(settings).then(response => {
            if (response.data.result === '100') {
                if (flag) {
                    if (cacheParams.cacheTime < 0) cacheParams.cacheTime = 3600000;
                    var result = { data: response.data, expiration: new Date().getTime() + cacheParams.cacheTime };
                    localStorage.setItem(cacheParams.cacheName, JSON.stringify(result));
                }
                if (successCallback) {
                    if (response.data.data || response.data.data === null) {
                        return successCallback(response.data.data);
                    } else {
                        return successCallback(response.data);
                    }
                }
            } else if (response.data.result === '7878') {
                Vue.prototype.$confirm(response.data.msg, '提示', {
                    confirmButtonText: '去支付',
                    cancelButtonText: '取消',
                    type: 'warning'}).then(() => {
                    router.push({
                        path: 'payment',
                        query: {
                            orderId: response.data.data
                        }
                    });
                    return true;
                });
            } else if (response.data.result === '-1') {
                if (!store.state.user.isInvalid) {
                    Vue.prototype.$alert(response.data.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            localStorage.removeItem('TokenKey');
                            router.push('/course');
                            store.commit('SET_TOAST', 1);
                        }
                    });
                }
                store.commit('SET_NOW', true);
            } else {
                Vue.prototype.$alert(response.data.msg, '提示', {
                    confirmButtonText: '确定'
                });
                if (router.currentRoute.name === 'person-enter') {
                    return successCallback(response.data);
                }
            }
        });
    }

    requestAndCache(settings, successCallback, cacheParams) {
        let cacheName = cacheParams.cacheName;
        let cacheTime = cacheParams.cacheTime;
        let isNow = cacheParams.isNow;
        if (typeof (cacheName) !== 'string' || typeof (cacheTime) !== 'number' || typeof (isNow) !== 'boolean') throw new Error('传入缓存参数类型错误');
        let data = localStorage.getItem(cacheName);
        if (data && !isNow) {
            data = JSON.parse(data);
            if (parseInt(data.expiration) - new Date().getTime() > 3000) {
                if (successCallback) successCallback(data.data.data);
                return;
            }
        }
        // 当前请求为请求缓存，但是缓存中没有，需要去请求服务器
        this.handleRequest(settings, successCallback, cacheParams, true);
    }

    streamRequest(settings, successCallback, cacheParams) {
        if (typeof (settings) !== 'object' || typeof (successCallback) !== 'function' || (cacheParams && typeof (cacheParams) !== 'object')) throw new Error('参数错误');
        if (!settings.url) throw new Error('缺少url参数');
        if (settings.method === 'get') {
            // 解决IE不刷新则不请求的BUG;
            settings.params = {
                ...settings.params,
                time: new Date().getTime()
            };
            if (cacheParams) {
                this.requestAndCache(settings, successCallback, cacheParams);
                return;
            }
        } else if (!settings.method) {
            throw new Error('缺少method参数');
        }

        this.handleRequest(settings, successCallback, null, false);
    }
}();

export default NetworkRequest;
