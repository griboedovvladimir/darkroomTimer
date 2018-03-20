class Login{
    constructor(){

    }
    static  goLogin(wrapper) {
        if (localStorage.getItem('darkroomtimer')) {
            document.location.href = "#main";
        }
        else {
            if (document.querySelector('link[rel="import"]')) {
                document.querySelector('link[rel="import"]').remove()
            }
            let link = document.createElement('link');

            function login() {
                return new Promise((resolve, reject) => {
                    link.rel = 'import';
                    link.href = 'scripts/pages/login.html';
                    link.onload = () => resolve();
                })
            }

            login().then(() => {
                let htmlImport = document.querySelector('link[rel="import"]');
                let htmlDoc = htmlImport.import;
                let htmlMessage = htmlDoc.querySelector('#loginForm');
                wrapper.appendChild(htmlMessage.cloneNode(true));
            });
            document.head.appendChild(link);
            document.addEventListener('click', e => {
                return new Promise(function (resolve, reject) {
                    if (e.target.type === 'submit' && e.target.id==='signin') {
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
                                localStorage.setItem('darkroomtimer', value);
                                wrapper.innerHTML = '';
                                document.location.href = "#main";
                            }
                            else {
                                let errMessage = document.createElement('p');
                                errMessage.innerHTML = 'Такой email и пороль не найдены';
                                errMessage.style.color = 'red';
                                form.appendChild(errMessage);
                            }
                        });

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
window.Login=Login;
