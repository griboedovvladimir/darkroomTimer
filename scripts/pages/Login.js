class Login {
    constructor() {

    }

    static goLogin(wrapper) {
        if (localStorage.getItem('darkroomtimer') || sessionStorage.getItem('darkroomtimer')) {
            document.location.href = "#main";
        }
        else {
            get('../../scripts/pages/login.html', '').then(resp => {
                wrapper.innerHTML = resp.response;

            });

            document.addEventListener('click', e => {
                return new Promise(function (resolve, reject) {
                    if (e.target.type === 'submit' && e.target.id === 'signin') {
                        e.preventDefault();
                        resolve()
                    }
                }).then(function () {
                    let pass = document.getElementById('password').value.trim();
                    let email = document.getElementById('email').value.trim();
                    if (LoginCheck.checkEmail(email, pass) === "sucess" && LoginCheck.checkPassword(email, pass) === 'sucess') {
                        post('backend/login.php', 'email=' + email + '&password=' + pass).then(value => {
                            let form = document.getElementById('loginForm');
                            if (value !== 'false') {
                                if (document.getElementById('rememberme')) {
                                    if (document.getElementById('rememberme').checked) {
                                        localStorage.setItem('darkroomtimer', value);
                                    }
                                    else sessionStorage.setItem('darkroomtimer', value);
                                    wrapper.innerHTML = '';
                                    document.location.href = "#main";
                                }
                            }
                            else {
                                if (document.getElementById('errMessage')) document.getElementById('errMessage').remove();
                                let errMessage = document.createElement('p');
                                errMessage.innerHTML = 'This email and password are not found';
                                errMessage.id = 'errMessage';
                                errMessage.style.color = 'red';
                                form.appendChild(errMessage);
                            }
                        });

                    }
                    else{
                        if (document.getElementById('errMessage')) document.getElementById('errMessage').remove();
                        let form = document.getElementById('loginForm');
                        let errMessage = document.createElement('p');
                        if(LoginCheck.checkEmail(email, pass)!=='sucess') {
                            errMessage.innerHTML = LoginCheck.checkEmail(email, pass);
                        }
                        else {
                            errMessage.innerHTML = LoginCheck.checkPassword(email, pass);
                        }
                        errMessage.id = 'errMessage';
                        errMessage.style.color = 'red';
                        form.appendChild(errMessage);
                    }
                })

            });

            function post(url, requestuestBody) {
                return new Promise(function (succeed, fail) {
                    let request = new XMLHttpRequest();
                    request.open("POST", url, true);
                    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
                    request.addEventListener("load", function () {
                        if (request.status < 400)
                            succeed(this.responseText);
                        else
                            fail(new Error("Request failed: " + request.statusText));
                    });
                    request.addEventListener("error", function () {
                        fail(new Error("Network error"));
                    });
                    request.send(requestuestBody);
                });
            }

        }
    }
}

window.Login = Login;
