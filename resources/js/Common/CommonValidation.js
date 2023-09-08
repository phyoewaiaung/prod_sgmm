/**
 * Check Number Between Two Value
 *
 * @param number, check value1, check value2
 * @reutrn True (valid) | False (not valid)
 */
export const validateEmail = (email) => {
    var re =
        /^(([^<>()[\]{}\\.,;:\s@$%#!*&*"^_]+(\.[^<>()[\]{}\\.,;:\s@$%#&!*"^_]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

/**
 * Check null or blank
 *
 * @param num
 * @reutrn True (has value) | False (null or blank)
 */
export function checkNullOrBlank(value) {
    if (value == "" || value == null) {
        return true;
    }
    return false;
}

/**
 * Test empty or not
 *
 * @param value
 * @reutrn boolean
 * @author
 * @date 2021-02-10
 */
export const isEmpty = (val) => {
    return val === undefined || val == null || val.length <= 0 ? true : false;
};

/**
 * Validate Integer Only
 *
 * @param num
 * @reutrn True (valid) | False (not valid)
 */
export const validateIntegerOnly = (num) => {
    var re = /^(\s*|\d+)$/;
    return re.test(num);
};

/**
 * Explanation or Description of this method
 *
 * @author
 * @create date
 * @param name
 * @return true(valid) || false(invalid)
 *
 */
export const validateName = (name) => {
    let namechk = /^[a-z ,.'-]+$/i;
    if (name.match(namechk)) {
        return true;
    } else return false;
};

/**
 * Explanation or Description of this method
 *
 * @author
 * @create date
 * @param string
 * @return true(not null) || false(null)
 *
 */
export const nullChk = (i) => {
    if (i === null || i === "" || i.length <= 0) {
        return false;
    } else return true;
};

/**
 * Explanation or Description of this method
 *
 * @author
 * @create date
 * @param email
 * @return true(valid) || false(invalid)
 *
 */
let emailFormat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const emailChk = (email) => {
    if (email.match(emailFormat)) {
        return true;
    } else return false;
};

/**
 * Explanation or Description of this method
 *
 * @author
 * @create date
 * @param num
 * @return true(valid) || false(invalid)
 *
 */
let numberFormat = /^\d+$/;
export const numberChk = (num) => {
    if (num.match(numberFormat)) {
        return true;
    } else return false;
};

let numFormat = /^-{0,1}\d*\.{0,1}\d+$/;
export const numberChkDecimal = (num) => {
    if (num.match(numFormat)) {
        return true;
    } else return false;
};

let numberFormatspace = /(\d)(?=(\d{0})+$)/g;
export const numberSpaceChk = (num) => {
    if (num.match(numberFormatspace)) {
        return true;
    } else return false;
};
export const validatePwd = (pwd) => {
    // const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,1000}$/;
    const reg =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^~])([a-zA-Z0-9@$!%*#?&^~]{8,1000})$/;
    if (reg.test(pwd)) {
        return true;
    } else {
        return false;
    }
};

export const validateNRC = (nrc) => {
    var re =
        /^[0-9\u1040-\u1049]{0,2}\/[a-zA-Z\u101E\u1000-\u1021]{0,9}\([a-zA-Z\u1014][\u102D]{0,1}[\u102F]{0,1}[\u1004]{0,1}[\u103A]{0,1}\)[0-9\u1040-\u1049]{0,6}/g;
    return re.test(nrc);
};

/**
 * Validation white space
 *
 * @param value
 * @reutrn
 */
export const validationWhiteSpace = (str) => {
    if (!str) return str;
    return str.replace(/^\s+/g, "");
};

/**
 * Validation URL
 *
 * @param string
 * @reutrn
 */
export const isValidURL = (string) => {
    var res = string.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
};

/**
 * Validation URL
 *
 * @param string
 * @reutrn
 */
export const containsSpecialChars = (str) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
};

/**
 * Validation URL
 *
 * @param string
 * @reutrn
 */
export const containsSpecialBrackets = (str) => {
    const specialChars = /[`!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
};

/**
 * Validate Formart (8 Digit and 2 Decimal Point)
 *
 * @param value
 * @reutrn True (valid) | False (not valid)
 */
export const is2Decimal = (value) => {
    var decimalOnly = /^\s*-?(\d{1,9})(\.\d{0,2})?\s*$/;
    if (decimalOnly.test(value)) {
        return true;
    }
    return false;
};

/**
 * Validate Formart (8 Digit and 2 Decimal Point)
 *
 * @param value
 * @reutrn True (valid) | False (not valid)
 */
export const languageCheck = (language_value) => {
    let hasMyanmar = false;
    let hasJapanese = false;
    let hasBothLanguage = false;
    const myanmarRegEx = /[\u1000-\u109f\uaa60-\uaa7f]/; // Myanmar Unicode range
    const japaneseRegEx =
        /[\u3040-\u309f\u30a0-\u30ff\u31f0-\u31ff\u4e00-\u9faf]/;

    for (let i = 0; i < language_value.length; i++) {
        const element = language_value[i];
        if (myanmarRegEx.test(element)) {
            hasMyanmar = true;
        } else if (japaneseRegEx.test(element)) {
            hasJapanese = true;
        }
        if (myanmarRegEx.test(element) && japaneseRegEx.test(element)) {
            //If both Myanmar and Japanese characters are present in the element, show an error message
            hasMyanmar = true;
            hasJapanese = true;
        }
        if (hasMyanmar && hasJapanese) {
            hasBothLanguage = true;
        }
    }
    return hasBothLanguage;
};

/**
 * Validate Formart (8 Digit and 2 Decimal Point)
 *
 * @param value
 * @reutrn True (valid) | False (not valid)
 */
export const isdigit = (value) => {
    var digit = /^0$|^[0-9]\d*$|^\.\d+$|^0\.\d*$|^[0-9]\d*\.\d*$/;
    if (digit.test(value)) {
        return true;
    }
    return false;
};
