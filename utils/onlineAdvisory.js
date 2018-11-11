/**
 * Created dongyu at 2018/7/18
 */

/* 百度商桥在线咨询*/
export function onlineAdvisory() {
    // 百度商桥
    // var _hmt = _hmt || [];
    let hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?4dc9346fba99668d8072f54ecc98e14e';
    let s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
    // (function () {
    //     var hm = document.createElement('script');
    //     hm.src = 'https://hm.baidu.com/hm.js?4dc9346fba99668d8072f54ecc98e14e';
    //     var s = document.getElementsByTagName('script')[0];
    //     s.parentNode.insertBefore(hm, s);
    // })();
};
