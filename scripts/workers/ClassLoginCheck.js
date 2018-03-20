
    class LoginCheck {
        constructor(){

        }
        static checkEmail(email, password) {
            let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(email) === false) {
                return "Email введен не корректно";
            }
            else {
                return 'sucess';
            }
        }
        static checkPassword(email, password) {
            let reg = /^[a-zA-Z0-9]+$/;
            if (reg.test(password) === false && ( password.length>6 || password.length<20)) {
                return "В пороле использованы недопустимые символы";
            }
            else if (password.length<6 || password.length>20){
                return "Пороль должен быть не менее 6 символов и не более 20";
            }
            else {
                return 'sucess';
            }
        }
    }


    window.LoginCheck=LoginCheck;
