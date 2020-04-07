const validateEmail = (email = '') => {
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    return(regEmail.test(email))
};

const validatePassword = (password = '') => {
    let regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8})/ ;
    return (regPassword.test(password))
};

const validateMobile = (password = '') => {
    let regPassword = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/ ;
    return (regPassword.test(password))
};

const validatePasswordConfirmPassword = (password = '', confirmPassword = '') => {
    return (password === confirmPassword);

};

const validateName = (name = '') => {
    let regName = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/ ;
    return (regName.test(name))
};

export {
    validateEmail,
    validatePassword,
    validatePasswordConfirmPassword,
    validateName,
    validateMobile
}
