/* !
 * randomStringUtil
 *
 * 随机字符串工具
 *
 * @author dongyu
 * @version 1.0.0 2018/03/20
 */

/**
 * 获取随机字符串
 *
 * @param len 字符串长度
 */
const randomString = function getRandomString(len) {
    const _CHARS = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';

    len = len || 32;
    var result = '';
    for (var i = 0; i < len; ++i) {
        result += _CHARS.charAt(Math.floor(Math.random() * _CHARS.length));
    }

    return result;
};

export default randomString;
