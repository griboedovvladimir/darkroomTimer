

(function () {
'use strict';
let placeholder=document.querySelector('#wrapper');
    window.addEventListener('hashchange', rout, false);
    window.addEventListener('load', ()=>{
        placeholder.innerHTML='';
        rout();
    }, false);

function rout() {
    placeholder.innerHTML='';
    switch (location.hash) {
        case '':
            if (localStorage.getItem('darkroomtimer')) {
                document.location.href = "#main";
            }
            else{
                document.location.href = "#login";
            }
            break;
        case '#main':
            Main.goMain(placeholder);
            break;
        case '#login':
            Login.goLogin(placeholder);
            break;
        case '#registration':
            Registration.goRegistration(placeholder);
            break;

    }
}

})();