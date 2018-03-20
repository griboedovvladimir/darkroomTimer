class Main{
    constructor(){

    }
static goMain(wrapper){
        let userData=new Map();
    if (!localStorage.getItem('darkroomtimer')) {
        document.location.href = "#login";
    }
    if (document.querySelector('link[rel="import"]')) {
        document.querySelector('link[rel="import"]').remove()
    }
    let link = document.createElement('link');

    function main() {
        return new Promise((resolve, reject) => {
            link.rel = 'import';
            link.href = 'scripts/pages/main.html';
            link.onload = () => resolve();
        })
    }
    main().then(() => {
        let htmlImport = document.querySelector('link[rel="import"]');
        let htmlDoc = htmlImport.import;
        let htmlMessage = htmlDoc.querySelector('#main');
        wrapper.appendChild(htmlMessage.cloneNode(true));

        clock();

        document.getElementById('logout').addEventListener('click',()=>{
        localStorage.removeItem('darkroomtimer');
            document.location.href = "";
        },{once:true});
        let control=document.getElementById('controlpanel');
        control.addEventListener('click',(e)=>{
            if (e.target.id==='addTimer') {
                let timer = new Timer(document.getElementById('table'), Date.now());
                timer.addTimer();
                timer.goTimer();
            }
            if(e.target.id==='clearTable'){
                    document.getElementById('table').innerHTML='';
            }
            if(e.target.id==='saveTable'){
                let data=[];
let allTimers=document.querySelectorAll('.timers');

for(let i=0;i<allTimers.length;i++){
    let value = allTimers[i].querySelectorAll('span')[0].innerHTML;
    let process = allTimers[i].querySelectorAll('h4')[0].innerHTML;
    let name=allTimers[i].querySelectorAll('span')[0].id.substring(7);
    let wrapper=document.getElementById('table');
    let position=allTimers[i].getBoundingClientRect();
    let notes=allTimers[i].querySelectorAll('#notes'+name)[0].innerHTML;
    let timer={name:name,value:value,process:process,notes:notes,wrapper:wrapper,position:position};
    data.push(timer)
}
                userData.set('name',data);
            }
            if(e.target.id==='loadTable'){
                document.getElementById('table').innerHTML='';
                if( userData.get('name')) {
                    userData.get('name').forEach(i => {
                        let timer = new Timer(i['wrapper'], i['name']);
                        timer.addTimer();
                        timer.setTimer(i['process'], i['value'],i['notes']);
                        timer.goTimer();
                    });
                }
            }
        });


    });
    document.head.appendChild(link);

    function clock() {
        let d = new Date();
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let seconds = d.getSeconds();
        if (hours <= 9) hours = "0" + hours;
        if (minutes <= 9) minutes = "0" + minutes;
        if (seconds <= 9) seconds = "0" + seconds;
       let date_time = hours + ":" + minutes + ":" + seconds;
        if (document.layers) {
            document.layers.doc_time.document.write(date_time);
            document.layers.doc_time.document.close();
        }
        else document.getElementById("time").innerHTML = date_time;
        setTimeout(clock, 1000);
    }


}

}
window.Main=Main;