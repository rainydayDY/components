/**
 * 公用函数
 * @author dy
 * @createDate 2018/04/23
 * @updateDate
 */

// 生成socket请求的唯一的uuid
export function generateUuid() {
    let s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '';
    return s.join('');
}


const chinese = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const units = ['', '十', '百', '千', '万'];

export function generateStr(i) {
    let num = String(i).split('').reverse();
    let result = '';
    let len = num.length;
    num.forEach((item, index) => {
        if (item === '1' && index === 1 && len < 3) {
            result += `${units[index]}&`;
        } else if (item === '0' && index === 0) {
            result += '';
        } else if (item === '0' && index !== 0) {
            if (num[index - 1] === '0') {
                result += '';
            } else {
                result += `${chinese[item]}&`;
            }
        } else {
            result += `${chinese[item]}${units[index]}&`;
        }
    });
    return result.split('&').reverse().join('');
}

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000;
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return time_str;
}

//  将特殊字符转换成正常字符

export function translateStr(str) {
    let arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"', 'middot': '·', 'mdash': '—'};
    return str.replace(/&(lt|gt|nbsp|amp|quot|middot|mdash);/ig, (all, t) => {
        return arrEntities[t];
    });
}

export function debounce(fun, delay = 1500) {
    let timer;
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fun.apply(context, args);
        }, delay);
        alert(timer);
    };
}
