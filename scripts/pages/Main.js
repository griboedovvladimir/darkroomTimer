class Main {
    constructor() {

    }

    static goMain(wrapper) {

        if (!sessionStorage.getItem('darkroomtimer') && !localStorage.getItem('darkroomtimer')) {
            document.location.href = "#login";
        }

        get('../../scripts/pages/main.html', '').then(resp => {
            wrapper.innerHTML = resp.response;

            document.getElementById('checkbox1').addEventListener('change', () => {
                if (document.querySelector('#checkbox1').checked) {
                    let link = document.createElement("link");
                    link.id = "darkroom";
                    link.type = "text/css";
                    link.rel = "stylesheet";
                    link.href = '../../css/styleDark.css';
                    document.getElementsByTagName("head")[0].appendChild(link)
                }
                else {
                    document.querySelector('#darkroom').remove();
                }
            });


            clock();

            document.getElementById('logout').addEventListener('click', () => {
                localStorage.removeItem('darkroomtimer');
                sessionStorage.removeItem('darkroomtimer');
                document.location.href = "";
            }, {once: true});
            let control = document.getElementById('controlpanel');
            control.addEventListener('click', e => {
                if (e.target.id === 'addTimer') {
                    let timer = new Timer('table', Date.now());
                    timer.addTimer();
                    timer.goTimer();
                }
                if (e.target.id === 'clearTable') {
                    document.getElementById('table').innerHTML = '';
                }
                if (e.target.id === 'saveTable') {
                    let userData = new Map();
                    let data = [];
                    let allTimers = document.querySelectorAll('.timers');

                    for (let i = 0; i < allTimers.length; i++) {
                        let value = allTimers[i].querySelectorAll('span')[0].innerHTML;
                        let process = allTimers[i].querySelectorAll('h4')[0].innerHTML;
                        let name = allTimers[i].querySelectorAll('span')[0].id.substring(7);
                        let absolute = allTimers[i].style.position;
                        let wrapper = 'table';
                        let position = [allTimers[i].getBoundingClientRect().top, allTimers[i].getBoundingClientRect().left, absolute];
                        let notes = allTimers[i].querySelectorAll('#notes' + name)[0].innerHTML;
                        let timer = {
                            name: name,
                            value: value,
                            process: process,
                            notes: notes,
                            wrapper: wrapper,
                            position: position
                        };
                        data.push(timer)
                    }

                    userData.set('name', data);
                    let token = sessionStorage.getItem('darkroomtimer') ? sessionStorage.getItem('darkroomtimer') : localStorage.getItem('darkroomtimer');
                    DialogWindow.saveWindow(e, userData, token);

                }
                if (e.target.id === 'loadTable') {
                    let wrap = document.getElementById('table');
                    let token = sessionStorage.getItem('darkroomtimer') ? sessionStorage.getItem('darkroomtimer') : localStorage.getItem('darkroomtimer');
                    DialogWindow.loadWindow(e, wrap, token);

                }
            });

            let rightpanel = document.getElementById('rightpanel');
            rightpanel.addEventListener('click', e => {
                if (e.target.id !== 'rightpanel') {
                    new ContentWindow(e.target.id);
                }


            })

        });

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

window.Main = Main;

