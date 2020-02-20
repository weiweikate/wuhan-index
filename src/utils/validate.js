// 校验手机号格式
export function validatePhone(val) {
    if (/^1[3456789]\d{9}$/.test(val)) {
        return true;
    } else {
        return false;
    }
}

export function required(val) {
    if (val !== undefined && val !== null && val !== '') {
        return '';
    } else {
        return '请输入数据';
    }
}

// 姓名 输入限制：1-18位，不可输入特殊符号，报错提示文案：“请输入真实姓名，不可输入特殊符号”
export function validateRealname(val) {
    // 是否含有中文（也包含日文和韩文）
    if (/^[\u4E00-\u9FA5\uF900-\uFA2D·]{1,18}$/.test(val)) {
        return true;
    } else {
        return false;
    }
}
// 去掉首尾的空格
export function trim(val = '') {
    return val.replace(/(^\s*)|(\s*$)/g, '');
}

export function validateEmail(val) {
    if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val)) {
        return true;
    } else {
        return false;
    }
}
// 身份证 输入限制：18位，数值+字母，不可输入汉字，特殊符号
export function validateIdentity(val) {
    if (/^[0-9a-zA-Z]{15,18}$/.test(val)) {
        return true;
    } else {
        return false;
    }
}

export function validate(rules, data) {
    const result = rules
        .map(rule => {
            const name = rule.name;
            const validator = rule.validator;
            const val = data[name];
            return validator(val);
        })
        .filter(item => item);

    return result[0];
}
