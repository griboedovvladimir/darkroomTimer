class LoginCheck {
    constructor() {

    }

    static checkEmail(email, password) {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) === false) {
            return "Email entered is not correct";
        }
        else {
            return 'sucess';
        }
    }

    static checkPassword(email, password) {
        let reg = /^[a-zA-Z0-9]+$/;
        if (reg.test(password) === false && ( password.length > 6 || password.length < 20)) {
            return "Invalid characters are used in the password";
        }
        else if (password.length < 6 || password.length > 20) {
            return "Password must be at least 6 characters and no more than 20";
        }
        else {
            return 'sucess';
        }
    }
}


window.LoginCheck = LoginCheck;
