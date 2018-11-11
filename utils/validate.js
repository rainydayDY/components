/**
 * Created dongyu at 2018/3/16.
 */

export function validatePhone(str) {
    const reg = /^1[3|4|5|6|7|8][0-9]{9}$/;
    return reg.test(str);
}

export function isvalidUsername(str) {
    const valid_map = ['admin', 'editor'];
    return valid_map.indexOf(str.trim()) >= 0;
}

/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/;
    return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/;
    return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/* 身份证号*/
export function validateIdentity(str) {
    const reg = /^[1-9]\d{5}[1|2]\d{3}[0|1]\d{1}[0|1|2|3]\d{4}([0-9|X])$/;
    return reg.test(str);
}

/* 验证密码*/
export function validatePassword(str) {
    const reg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
    return reg.test(str);
}

/* 验证中文字符，并返回中文字符的个数*/
export function validateChineseCode(str) {
    const reg = /[\u4E00-\u9FA5]/g;
    return reg.test(str) ? str.match(reg).length : 0;
}

/* 验证大写字母，并返回大写字母的个数*/
export function checkUpperCode(str) {
    const reg = /[A-Z]/g;
    return reg.test(str) ? str.match(reg).length : 0;
}

/* 验证input框的价格，只能输入数字和小数点，并且只能保留小数点后两位*/
export function checkPriceNum(str, num) {
    // 只能输入数字
    if (num === 1) {
        const reg = /[^0-9.]/g;
        return reg.test(str);
    } else if (num === 2) {
        // 小数点后只能有两位小数,有且只有一个有效小数点
        const reg = /^\d+(\.\d{1,2})?$/;
        return reg.test(str);
    }
}

/* 折扣0-100正整数*/
export function checkDiscount(str) {
    const reg = /^(?:0|[1-9][0-9]?|100)$/;
    return reg.test(str);
}
