class Registration{
    constructor(){

    }
    static  goRegistration(wrapper){
        if (localStorage.getItem('darkroomtimer')) {
            document.location.href = "#main";
        }
        else {
            if (document.querySelector('link[rel="import"]')) {
                document.querySelector('link[rel="import"]').remove()
            }
            let link = document.createElement('link');

            function registration() {
                return new Promise((resolve, reject) => {
                    link.rel = 'import';
                    link.href = 'scripts/pages/registration.html';
                    link.onload = () => resolve();
                })
            }

            registration().then(() => {
                let htmlImport = document.querySelector('link[rel="import"]');
                let htmlDoc = htmlImport.import;
                let htmlMessage = htmlDoc.querySelector('#registrationForm');
                wrapper.appendChild(htmlMessage.cloneNode(true));
            });
            document.head.appendChild(link);
            document.addEventListener('click', e => {
                return new Promise(function (resolve, reject) {
                    if (e.target.type === 'submit' && e.target.id==='register') {
                        e.preventDefault();
                        resolve()
                    }
                }).then(function () {
                    let pass = document.getElementById('passwordreg').value.trim();
                    let email = document.getElementById('emailreg').value.trim();
                    if (LoginCheck.checkEmail(email, pass) === "sucess" && LoginCheck.checkPassword(email, pass) === 'sucess') {
                        post('backend/register.php', 'email=' + email + '&password=' + pass).then(value => {
                            let form = document.getElementById('registrationForm');
                            if (value!== "false")
                            {
                                localStorage.setItem('darkroomtimer', value);
                                wrapper.innerHTML = '';
                                document.location.href = "#main";
                            }
                            else {
                                if (document.getElementById('registerErrMessage'))document.getElementById('registerErrMessage').remove();
                                let errMessage = document.createElement('p');
                                errMessage.id='registerErrMessage';
                                errMessage.innerHTML = 'This email address already exists';
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
window.Registration=Registration;