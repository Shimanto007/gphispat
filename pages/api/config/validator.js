import validator from 'validator'


export const emailValidation = (email) => {
    return validator.isEmail(email)
};

export const emptyValidation = (str) => {
    return validator.isEmpty(str)
};

let isNum = char => {
    if(char >= '0' && char <= '9') {
        return true
    } else return false
}
export const emptyNumber = (phone) => {
    if(phone.length) {
        for(let i = 0; i < phone.length; i++) {
            if(isNum(phone[i]) === false) return false;
        }
        if(phone[0] === '0') {
            if(phone[1] === '1') {
                if(phone.length === 11) return true
                else return false
            } else return false
        } else return false
    } else return false
};

// export const emptyNumber = (num) => {
//     return validator.isLength(num, {min: 11, max: 11})
// };