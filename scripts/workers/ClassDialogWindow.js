class DialogWindow{
    constructor(){

    }
    static saveWindow(e,map,token){
if(!document.getElementById('dialogWin')) {
    let win = document.createElement('div');
    win.id = 'dialogWin';
    win.style.cssText = `position:absolute;top:${e.y}px;left:${e.x}px`;
    let form = document.createElement('form');
    document.body.append(form);
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    let saveButton = document.createElement('button');
    saveButton.id='saveButton';
    saveButton.classList.add('dialogButtons');
    saveButton.innerHTML = 'SAVE';
    let close = document.createElement('button');
    close.innerHTML = '&#215';
    close.id='close';
    win.appendChild(close);
/////////////////////// delete table from DB in develop process, realisation at 1.1 version ///////////////////////////////
    // post('backend/save.php','token='+token).then(value=>{
    //     let requestarr=JSON.parse(value).split('$');
    //     requestarr.forEach(i=>{
    //         let p=document.createElement('p');
    //         let check=document.createElement('input');
    //         check.setAttribute('value',JSON.parse(i).tableName);
    //         check.setAttribute('type','checkbox');
    //         p.appendChild(check);
    //         p.innerHTML=p.innerHTML+JSON.parse(i).tableName;
    //         win.appendChild(p);
    //         console.log(p);
    //     })
    // });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    win.innerHTML = win.innerHTML + 'Save table as';
    form.appendChild(input);
    form.appendChild(saveButton);
    win.appendChild(form);
    document.body.appendChild(win);
    window.addEventListener('click',eventer);
    function eventer(event) {
        function check(value){
            let reg=/^[A-zА-я0-9]([A-zА-я0-9][ ]?){1,20}$/;
            return reg.test(value);
        }
        event.preventDefault();
        if(event.target.id==='close'||(event.target.id!=='dialogWin'&&event.target.parentNode.id!=='dialogWin'&&event.target.id!=='saveTable'&&event.target.parentNode.tagName!=='FORM')){
            window.removeEventListener('click',eventer);
            document.getElementById('dialogWin').remove();
        }
        if(event.target.id==='saveButton'&&input.value!=='') {
            if (check(input.value)) {
            let name = input.value.trim();
            let table = encodeURIComponent(JSON.stringify({tableName: name, timers: map.get('name')}));
            token = encodeURIComponent(token);
            post('backend/save.php', 'token=' + token + '&table=' + table).then(value => {
            });
            window.removeEventListener('click', eventer);
            document.getElementById('dialogWin').remove();
        }
        }

    }
}
    }
    static loadWindow(e,wrap,token){
        if(!document.getElementById('dialogWin')) {
            let win = document.createElement('div');
            win.id = 'dialogWin';
            win.style.cssText = `position:absolute;top:${e.y}px;left:${e.x}px`;
            let form = document.createElement('form');
            let close = document.createElement('button');
            close.innerHTML = '&#215';
            close.id='close';
            win.appendChild(close);
            let select=document.createElement('select');
            let data=[];
            post('backend/save.php','token='+token).then(value=>{
                if(value!=='false') {
                    let requestarr = JSON.parse(value).split('$');
                    requestarr.forEach(i => {
                        let option = document.createElement('option');
                        option.innerHTML = JSON.parse(i).tableName;
                        select.appendChild(option);
                        data.push(JSON.parse(i));

                    })
                }
            });
            form.appendChild(select);
            win.appendChild(form);
            let button=document.createElement('button');
            button.id='clearLoad';
            button.innerHTML="CLEAR CURRENT TABLE AND LOAD";
            let button2=document.createElement('button');
            button.classList.add('dialogButtons');
            button2.classList.add('dialogButtons');
            button2.id='load';
            button2.innerHTML="ADD TO CURRENT TABLE";
            win.appendChild(button);
            win.appendChild(button2);
            document.body.appendChild(win);
            window.addEventListener('click',eventer);

            function eventer(event) {
                event.preventDefault();
                if(event.target.id==='close'||(event.target.id!=='dialogWin'&&event.target.parentNode.id!=='dialogWin'&&event.target.id!=='loadTable'&&event.target.parentNode.tagName!=='FORM')){
                    window.removeEventListener('click',eventer);
                    document.getElementById('dialogWin').remove();
                }
                if(event.target.id==='clearLoad'){
                wrap.innerHTML='';
                    window.removeEventListener('click',eventer);
                    document.getElementById('dialogWin').remove();
                    data.forEach(i=>{
                        if(i.tableName===select.value){
                            i.timers.forEach(i => {
                                    let timer = new Timer(i['wrapper'], i['name'],i['position']);
                                    timer.addTimer();
                                    timer.setTimer(i['process'], i['value'], i['notes']);
                                    timer.goTimer( i['value']);
                                })
                        }
                    });
                }
                if(event.target.id==='load'){
                    data.forEach(i=>{
                        if(i.tableName===select.value){
                            i.timers.forEach(i => {
                                let timer = new Timer(i['wrapper'], i['name']);
                                timer.addTimer();
                                timer.setTimer(i['process'], i['value'], i['notes']);
                                timer.goTimer();
                            })
                        }
                    });
                    window.removeEventListener('click',eventer);
                    document.getElementById('dialogWin').remove();
                }
            }
        }
    }
}
window.DialogWindow=DialogWindow;
window.post=function post(url, requestuestBody) {
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
};