/**
* 处理对象：对比值相等（包含基本类型和引用类型）、对象的深拷贝
* @author dongyu
* @createDate 2018/07/25
*/
function HandleObj() {
    this.checkType = Object.prototype.toString;
}

HandleObj.prototype = {
    constructor: HandleObj,
    isFunction(obj) {
        return this.checkType.call(obj) === '[object Function]';
    },
    deepEq(a, b, aStack, bStack) {
        // a 和 b 的内部属性 [[class]] 相同时 返回 true
        let className = this.checkType.call(a);
        if (className !== this.checkType.call(b)) return false;

        switch (className) {
            case '[object RegExp]':
            case '[object String]':
                return '' + a === '' + b;
            case '[object Number]':
                if (+a !== +a) return +b !== +b;
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                return +a === +b;
        }

        let areArrays = className === '[object Array]';
        // console.log('是否为数组' + areArrays);
        // 不是数组
        if (!areArrays) {
        // 过滤掉两个函数的情况
            if (typeof a !== 'object' || typeof b !== 'object') return false;

            let aCtor = a.constructor;


            let bCtor = b.constructor;
            // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
            if (aCtor === bCtor && !(this.isFunction(aCtor) && aCtor instanceof aCtor && this.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
                return false;
            }
        }
        aStack = aStack || [];
        bStack = bStack || [];
        let length = aStack.length;
        // 检查是否有循环引用的部分
        while (length--) {
            if (aStack[length] === a) {
                return bStack[length] === b;
            }
        }

        aStack.push(a);
        bStack.push(b);
        // 数组判断
        if (areArrays) {
            let len = a.length;
            if (len !== b.length) return false;

            while (len--) {
                if (!this.eq(a[len], b[len], aStack, bStack)) return false;
            }
        } else {
            let keys = Object.keys(a);
            let len = keys.length;
            if (Object.keys(b).length !== len) return false;
            while (len--) {
                let key = keys[len];
                if (!(b.hasOwnProperty(key) && this.eq(a[key], b[key], aStack, bStack))) return false;
            }
        }

        aStack.pop();
        bStack.pop();
        return true;
    },
    eq(a, b, aStack, bStack) {
        // === 结果为 true 的区别出 +0 和 -0
        if (a === b) return a !== 0 || 1 / a === 1 / b;
        // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
        if (a == null || b == null) return false;
        // 判断 NaN
        if (a !== a) return b !== b;

        // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
        let type = typeof a;
        if (type !== 'function' && type !== 'object' && typeof b !== 'object') return false;

        // 更复杂的对象使用 deepEq 函数进行深度比较
        return this.deepEq(a, b, aStack, bStack);
    },
    copyObj(oriObj, aimObj) {
        for (let i in oriObj) {
            if (this.checkType.call(oriObj[i]) === '[object Object]') {
                aimObj[i] = this.copyObj(oriObj[i], {});
            } else if (this.checkType.call(oriObj[i]) === '[object Array]') {
                aimObj[i] = this.copyObj(oriObj[i], []);
            } else {
                aimObj[i] = oriObj[i];
            }
        }
        return aimObj;
    }
};

const handleObj = new HandleObj();
export {
    handleObj
};
