(function () {
'use strict';
let placeholder=document.querySelector('#wrapper');
    window.addEventListener('hashchange', rout, false);
    window.addEventListener('load', ()=>{
        placeholder.innerHTML='';
        rout();
    }, false);

function rout() {
    switch (location.hash) {
        case '':
            document.location.href = "#login";
            break;
        case '#login':
            Login.goLogin(placeholder);
            break;
        case '#registration':
            placeholder.innerHTML='';
            break;

    }
}

})();