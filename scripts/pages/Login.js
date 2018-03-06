class Login{
    constructor(){

    }
    static  goLogin(wrapper){
        let htmlImport = document.querySelector('link[rel="import"]');
        let htmlDoc = htmlImport.import;
        let htmlMessage = htmlDoc.querySelector('#loginForm');
         wrapper.appendChild(htmlMessage.cloneNode(true));
    }

}
window.Login=Login;
