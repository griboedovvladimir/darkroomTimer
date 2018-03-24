class Timer {
    constructor(wrapper, name) {
        this.wrapper = document.getElementById(wrapper);
        this.name = name;
        this.newTimer = document.createElement('div');
        this.newTimer.id = "timer" + this.name;
        this.newTimer.classList='timers';
    }

    addTimer() {
        this.newTimer.innerHTML = '<button class="delete" id = "delete' + this.name + '">&#215</button><h4 id="process' + this.name + '">process</h4><span id="numbers' + this.name + '" style="color: #f00; font-size: 300%; font-weight: bold; font-family: Cabin Sketch, cursive;">00:00:00</span><p id="notes'+this.name+'"></p><br><button id = "pause' +
            this.name + '">pause</button><button id = "start' + this.name +
            '">start</button><button id = "set' + this.name + '">set</button><button id = "loadfilmpreset' + this.name + '" >load film develop time</button>' +
            'Select process<select id="select' + this.name + '"><option>film developer</option><option>developer</option><option>fix bath</option><option>stop bath</option><option>washing</option><option>drying</option><option>stabilised</option><option>exposure</option></select><br>Other process<input type="text" id="other_process' + this.name +
            '" name="min" size="4" value=""/><br><input type="text" id="min' +
            this.name + '" name="min" size="1" value="00"/>:<input type="text" id="sec' + this.name + '" name="sec" size="1" value="00"/>:<input type="text" id="ms' +
            this.name + '" name="ms" size="1" value="00"/><input type="text" id="notesinput' + this.name + '">';

        this.wrapper.appendChild(this.newTimer);
    }

    setTimer(process,value,notes) {
        document.getElementById("numbers" + this.name).innerHTML = value;
        document.getElementById("process" + this.name).innerHTML = process;
        document.getElementById("notes" + this.name).innerHTML = notes;
    }

    static loadFilmPreset(e) {
        if (!document.getElementById('filmform' + e.target.id.substring(14))) {
            post('backend/filmform.php', '').then(value => {
                let arr = JSON.parse(value);
                let name = e.target.id.substring(14);
                let form = document.createElement('form');
                form.id = 'filmform' + name;
                form.innerHTML = '<p>Select film, film type and developer</p>';
                e.target.parentNode.appendChild(form);
                let filmselect = document.createElement('select');
                filmselect.id = 'film' + name;
                arr[0].forEach((i, item) => {
                    let option = document.createElement('option');
                    option.innerHTML = i;
                    filmselect.appendChild(option);
                });
                form.appendChild(filmselect);
                form.innerHTML = form.innerHTML + '<select id="filmtype' + name + '"><option>35mm</option><option>120</option><option>sheet</option></select>';
                let devselect = document.createElement('select');
                devselect.id = 'dev' + name;
                arr[1].forEach((i, item) => {
                    let option = document.createElement('option');
                    option.innerHTML = i;
                    devselect.appendChild(option);
                });
                form.appendChild(devselect);
                form.innerHTML = form.innerHTML + '<button id="selectbutton' + name + '">Select</button>';
                document.getElementById('selectbutton' + name).addEventListener('click', addform2);

                function addform2(event) {
                    event.preventDefault();
                    if (document.getElementById('formparameters' + name)) document.getElementById('formparameters' + name).remove();
                    let div = document.createElement('div');
                    div.id = 'formparameters' + name;
                    form.appendChild(div);
                    let message = document.createElement('p');
                    let film = document.getElementById('film' + name).value,
                        type = document.getElementById('filmtype' + name).value,
                        dev = document.getElementById('dev' + name).value;

                    post('backend/filmform2.php', 'film=' + encodeURIComponent(film) + '&dev=' + encodeURIComponent(dev) + '&type=' + type).then(value => {
                        div.appendChild(message);
                        if (JSON.parse(value) === "false") {
                            message.innerHTML = 'Selected film and developer can\'t use together';
                        }
                        else {
                            message.innerHTML = 'Selected parameters';
                            let arr = JSON.parse(value);
                            let dilution = document.createElement('select');
                            dilution.id = 'dilution' + name;
                            arr[0].forEach(i => {
                                let option = document.createElement('option');
                                option.innerHTML = i;
                                dilution.appendChild(option);
                            });
                            div.appendChild(dilution);
                            let ASAISO = document.createElement('select');
                            ASAISO.id = 'ASA/ISO' + name;
                            arr[1].forEach(i => {
                                let option = document.createElement('option');
                                option.innerHTML = i;
                                ASAISO.appendChild(option);
                            });
                            div.appendChild(ASAISO);
                            div.appendChild(dilution);
                            let temp = document.createElement('select');
                            temp.id = 'temp' + name;
                            arr[2].forEach(i => {
                                let option = document.createElement('option');
                                option.innerHTML = i;
                                temp.appendChild(option);
                            });
                            div.appendChild(temp);
                            let buttonSet = document.createElement('button');
                            buttonSet.innerHTML = 'To set form';
                            div.appendChild(buttonSet);
                            buttonSet.addEventListener('click', setFilmTime);

                            function setFilmTime(event) {
                                event.preventDefault();
                                let film_req = encodeURIComponent(document.getElementById('film' + name).value),
                                    type_req = encodeURIComponent(document.getElementById('filmtype' + name).value),
                                    dev_req = encodeURIComponent(document.getElementById('dev' + name).value),
                                    dilution_req = encodeURIComponent(dilution.value),
                                    ASAISO_req = encodeURIComponent(ASAISO.value),
                                    temp_req = encodeURIComponent(temp.value);

                                post('backend/filmformset.php', 'film=' + film_req + '&dev=' + dev_req + '&type=' + type_req + '&dilution=' + dilution_req + '&ASAISO=' + ASAISO_req + '&temp=' + temp_req).then(value => {
                                    let m, s, request = '';
                                    request = value.toString();
                                    if (request === 'false') {
                                    let message=document.createElement('p');
                                    message.innerHTML='Time not found, select other parameters';
                                    form.appendChild(message);
                                    }
                                    else {
                                        if (request < 10) {
                                            request = "0" + request
                                        }
                                        request = request.split(".");
                                        m = request[0];
                                        s = request[1] ? request[1] + '0' : '00';
                                        document.getElementById("min" + name).value = m;
                                        document.getElementById("sec" + name).value = s;
                                        form.remove();
                                    }
                                });

                            }

                        }
                        film = document.getElementById('film' + name).value;
                        type = document.getElementById('filmtype' + name).value;
                        dev = document.getElementById('dev' + name).value;
                    })

                }
            });

            // function post(url, requestuestBody) {
            //     return new Promise(function (succeed, fail) {
            //         let request = new XMLHttpRequest();
            //         request.open("POST", url, true);
            //         request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
            //         request.addEventListener("load", function () {
            //             if (request.status < 400)
            //                 succeed(this.responseText);
            //             else
            //                 fail(new Error("Request failed: " + request.statusText));
            //         });
            //         request.addEventListener("error", function () {
            //             fail(new Error("Network error"));
            //         });
            //         request.send(requestuestBody);
            //     });
            // }
        }
    }

    goTimer() {
        let timer = document.getElementById("numbers" + this.name);
        let name = this.name;
        let set;
        let time = 0;
        document.getElementById("start" + name).addEventListener('click', goStart);
        document.getElementById("pause" + name).addEventListener('click', goPause);
        let del = document.getElementById("delete" + name);
        del.addEventListener('click', deleteTimer);

        function deleteTimer() {
            document.getElementById("start" + name).removeEventListener('click', goStart);
            document.getElementById("pause" + name).removeEventListener('click', goPause);
            document.getElementById("timer" + name).remove();
            cancelAnimationFrame(set);
        }

        function goPause() {
            cancelAnimationFrame(set);
        }

        function goStart() {
            cancelAnimationFrame(set);
            let min = document.getElementById("min" + name).value;
            let sec = document.getElementById("sec" + name).value;
            let ms = document.getElementById("ms" + name).value;
            if(!(min==='00'&& sec==='00'&& ms==='00')) startTimer();
        }

        let setButton = document.getElementById("set" + name);
        setButton.addEventListener('click', setForm);
        let persetButton = document.getElementById("loadfilmpreset" + name);
        persetButton.addEventListener('click', Timer.loadFilmPreset);

        function setForm(event) {
            event.preventDefault();
            let min = document.getElementById("min" + name).value;
            let sec = document.getElementById("sec" + name).value;
            let ms = document.getElementById("ms" + name).value;
            document.getElementById('notes'+name).innerHTML=document.getElementById("notesinput" + name).value;
            function check(value){
                let reg=/^[0-5][0-9]$/;
                return reg.test(value);
            }
            function check2(value){
                let reg=/^[0-9][0-9]$/;
                return reg.test(value);
            }
            if(check(min) && check(sec) && check2(ms)) {
                if(document.getElementById("errorselect" + name))document.getElementById("errorselect" + name).remove();
                document.getElementById("numbers" + name).innerHTML = `${min}:${sec}:${ms}`;
                let process = document.getElementById("process" + name);
                let select = document.getElementById("select" + name).value;
                let other_process = document.getElementById("other_process" + name).value;
                process.innerHTML = other_process ? other_process : select;
            }
            else{
                if(document.getElementById("errorselect" + name))document.getElementById("errorselect" + name).remove();
                let ms = document.getElementById("ms" + name);
                let message=document.createElement('p');
                message.id='errorselect'+name;
                message.innerHTML='Uncorrected time';
                document.getElementById("timer" + name).insertBefore(message, ms.nextElementSibling);
            }
        }


        function startTimer() {
            let time = timer.innerHTML;
            let arr = time.split(":");
            let min=arr[0], sec=arr[1], ms=arr[2];
            time = min * 60 + parseInt(sec)+ parseInt(ms) / 100;
            let countdown = new Date(),
                responseTime = new Date(Date.now() + (1000 * time));

            function goTimer() {
                if(timer.innerHTML!=="00:00:00") {
                    countdown.setTime(responseTime - Date.now());
                    let m = countdown.getUTCMinutes().toString(),
                        s = countdown.getUTCSeconds().toString(),
                        ms = parseInt(countdown.getUTCMilliseconds() / 10).toString();

                    if (m < 10) m = "0" + m;
                    if (s < 10) s = "0" + s;
                    if (ms < 10) ms = "0" + ms;
                    if (m == 0 && s == 0) {
                        ms = "00";
                        let audio = new Audio();
                        audio.src = '../../sounds/duck.wav';
                        audio.autoplay = true;
                    }
                    timer.innerHTML = m + ":" + s + ":" + ms;

                    if (countdown.getUTCHours() > 0 || countdown.getUTCMinutes() > 0 || countdown.getUTCSeconds() > 0 || countdown.getUTCSeconds() > 0)
                        set = requestAnimationFrame(goTimer);
                }
            }

           set= requestAnimationFrame(goTimer);
        }
    }
}

window.Timer = Timer;
