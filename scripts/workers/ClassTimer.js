class Timer {
    constructor(wrapper, name, position) {
        this.wrapper = document.getElementById(wrapper);
        this.name = name;
        this.newTimer = document.createElement('div');
        this.newTimer.id = "timer" + this.name;
        this.newTimer.classList = 'timers';
        this.position = position;
    }

    addTimer() {
        if (this.position !== undefined && !is_touch_device) {
            this.newTimer.style.cssText = 'position:' + this.position[2] + ';top:' + (this.position[0] - 10) + 'px;left:' + this.position[1] + 'px';
        }
        this.newTimer.innerHTML = '<button class="delete" id = "delete' + this.name + '">&#215</button><h4 id="process' + this.name + '">defult process</h4><div class="timerpanel"><span id="numbers' + this.name + '" >00:00:00</span><p id="notes' + this.name + '">Note: </p><button id = "pause' +
            this.name + '" class="icon2">&#xe904</button><button id = "start' + this.name +
            '" class="icon2">&#xe906</button><button id = "set' + this.name + '" class="icon2">&#xe908;</button></div><div class="settimerpanel_hidden">' +
            'Select process<select id="select' + this.name + '"><option>film developer</option><option>developer</option><option>fix bath</option><option>stop bath</option><option>washing</option><option>drying</option><option>stabilised</option><option>exposure</option></select><br>Other process<input type="text" id="other_process' + this.name +
            '" name="process" size="4" value=""/><div><input type="text" id="min' +
            this.name + '" name="min" size="1" value="00"/>:<input type="text" id="sec' + this.name + '" name="sec" size="1" value="00"/>:<input type="text" id="ms' +
            this.name + '" name="ms" size="1" value="00"/></div><textarea class="timerinputs"  maxlength="100" placeholder="Note" id="notesinput' + this.name + '"></textarea><div><button id = "loadfilmpreset' + this.name + '" data-tooltip="Load film preset time" class="filmbutton">&#xe902</button></div></div><button class="storkUp" id="stork' + this.name + '">&#9660</button>';

        this.wrapper.appendChild(this.newTimer);
    }

    setTimer(process, value, notes) {
        document.getElementById("numbers" + this.name).innerHTML = value;
        document.getElementById("process" + this.name).innerHTML = process;
        document.getElementById("notes" + this.name).innerHTML = notes;
    }

    static loadFilmPreset(e) {
        if (!document.getElementById('filmform' + e.target.id.substring(14))) {
            post('backend/filmform.php', '', e.target).then(value => {
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

                    post('backend/filmform2.php', 'film=' + encodeURIComponent(film) + '&dev=' + encodeURIComponent(dev) + '&type=' + type, event.target).then(value => {
                        div.appendChild(message);
                        if (JSON.parse(value) === "false") {
                            message.innerHTML = 'Selected film and developer can\'t use together';
                        }
                        else {
                            message.innerHTML = 'Select parameters<p><span>ISO/ASA</span><span>diluton</span><span>temperature</span></p>';
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

                                post('backend/filmformset.php', 'film=' + film_req + '&dev=' + dev_req + '&type=' + type_req + '&dilution=' + dilution_req + '&ASAISO=' + ASAISO_req + '&temp=' + temp_req, event.target).then(value => {
                                    let m, s, request = '';
                                    request = value.toString();
                                    if (request === 'false') {
                                        if(document.getElementById('message')) document.getElementById('message').remove();
                                        let message = document.createElement('p');
                                        message.id='message';
                                        message.innerHTML = 'Time not found, select other parameters';
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

        }
    }

    goTimer(value) {
        let timer = document.getElementById("numbers" + this.name);
        let name = this.name;
        let set;
        let time = 0;
        document.getElementById("start" + name).addEventListener('click', goStart);
        document.getElementById("pause" + name).addEventListener('click', goPause);
        document.getElementById("stork" + name).addEventListener('click', storkAction);
        if (!is_touch_device) {
            document.getElementById("process" + name).addEventListener('mousedown', dragable);
        }
        let del = document.getElementById("delete" + name);
        del.addEventListener('click', deleteTimer);

        function deleteTimer() {
            document.getElementById("start" + name).removeEventListener('click', goStart);
            document.getElementById("pause" + name).removeEventListener('click', goPause);
            document.getElementById("set" + name).removeEventListener('click', setForm);
            document.getElementById("delete" + name).removeEventListener('click', deleteTimer);
            document.getElementById("stork" + name).removeEventListener('click', storkAction);
            document.getElementById("process" + name).removeEventListener('mousedown', dragable);
            document.getElementById("timer" + name).remove();
            cancelAnimationFrame(set);
        }

        function dragable(e) {
            if (e.target.id === 'process' + name) {
                let startX = document.getElementById("timer" + name).offsetLeft;
                let startY = document.getElementById("timer" + name).offsetTop - 10;
                document.getElementById("timer" + name).style.cssText = document.getElementById("timer" + name).style.cssText + 'position:absolute;left:' + startX + 'px;top:' + startY + 'px;';
                dragElement(document.getElementById("timer" + name));

                function dragElement(elmnt) {
                    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                    if (document.getElementById(elmnt.id)) {
                        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
                    } else {
                        elmnt.onmousedown = dragMouseDown;
                    }

                    function dragMouseDown(e) {
                        if (e.target.tagName === 'H4') {
                            e = e || window.event;
                            pos3 = e.clientX;
                            pos4 = e.clientY;
                            document.onmouseup = closeDragElement;
                            document.onmousemove = elementDrag;
                        }
                    }

                    function elementDrag(e) {
                        e = e || window.event;
                        pos1 = pos3 - e.clientX;
                        pos2 = pos4 - e.clientY;
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        elmnt.style.top = (e.clientY - 15) + "px";
                        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                    }

                    function closeDragElement() {
                        document.onmouseup = null;
                        document.onmousemove = null;
                    }

                }
            }


        }

        function storkAction() {
            let inner = document.getElementById("stork" + name).classList[0];
            if (inner === 'storkUp') {
                document.getElementById("stork" + name).innerHTML = '&#9650';
                document.getElementById("stork" + name).classList.remove('storkUp');
                document.getElementById("stork" + name).classList.toggle("storkDown");
                let el = document.getElementById('timer' + name).querySelectorAll('.settimerpanel_hidden')[0];
                el.classList.remove('settimerpanel_hidden');
                el.classList.add('settimerpanel');
            }
            else {
                document.getElementById("stork" + name).innerHTML = '&#9660';
                document.getElementById("stork" + name).classList.remove('storkDown');
                document.getElementById("stork" + name).classList.toggle("storkUp");
                let el = document.getElementById('timer' + name).querySelectorAll('.settimerpanel')[0];
                el.classList.remove('settimerpanel');
                el.classList.add('settimerpanel_hidden');
            }
        }
        function goPause() {
            cancelAnimationFrame(set);
        }

        function goStart() {
            let min = document.getElementById("min" + name).value || valueArr[0];
            let sec = document.getElementById("sec" + name).value || valueArr[1];
            let ms = document.getElementById("ms" + name).value || valueArr[2];
            if (value) {
                let valueArr = value.split(':');
                min = valueArr[0];
                sec = valueArr[1];
                ms = valueArr[2];
            }
            cancelAnimationFrame(set);

            if (!(min === '00' && sec === '00' && ms === '00')) startTimer();
        }

        let setButton = document.getElementById("set" + name);
        setButton.addEventListener('click', setForm);
        let persetButton = document.getElementById("loadfilmpreset" + name);
        persetButton.addEventListener('click', Timer.loadFilmPreset);

        function setForm(event) {
            event.preventDefault();
            document.getElementById("timer" + name).classList.remove('finished');
            let min = document.getElementById("min" + name).value;
            let sec = document.getElementById("sec" + name).value;
            let ms = document.getElementById("ms" + name).value;
            document.getElementById('notes' + name).innerHTML = 'Note: ' + document.getElementById("notesinput" + name).value;

            function check(value) {
                let reg = /^[0-5][0-9]$/;
                return reg.test(value);
            }

            function check2(value) {
                let reg = /^[0-9][0-9]$/;
                return reg.test(value);
            }

            if (check(min) && check(sec) && check2(ms)) {
                if (document.getElementById("errorselect" + name)) document.getElementById("errorselect" + name).remove();
                document.getElementById("numbers" + name).innerHTML = `${min}:${sec}:${ms}`;
                let process = document.getElementById("process" + name);
                let select = document.getElementById("select" + name).value;
                let other_process = document.getElementById("other_process" + name).value;
                if (other_process.length < 20) {
                    process.innerHTML = other_process ? other_process : select;
                }
            }
            else {
                if (document.getElementById("errorselect" + name)) document.getElementById("errorselect" + name).remove();
                let ms = document.getElementById("ms" + name);
                let message = document.createElement('p');
                message.id = 'errorselect' + name;
                message.innerHTML = 'Uncorrected time';
                document.getElementById("timer" + name).insertBefore(message, ms.nextElementSibling);
            }
        }


        function startTimer() {
            let time = timer.innerHTML;
            let arr = time.split(":");
            let min = arr[0], sec = arr[1], ms = arr[2];
            time = min * 60 + parseInt(sec) + parseInt(ms) / 100;
            let countdown = new Date(),
                responseTime = new Date(Date.now() + (1000 * time));

            function goTimer() {
                if (timer.innerHTML !== "00:00:00") {
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
                        audio.src = '../../sounds/duck.mp3';
                        audio.autoplay = true;
                        timer.parentNode.parentNode.classList.add('finished')
                    }
                    timer.innerHTML = m + ":" + s + ":" + ms;

                    if (countdown.getUTCHours() > 0 || countdown.getUTCMinutes() > 0 || countdown.getUTCSeconds() > 0 || countdown.getUTCSeconds() > 0)
                        set = requestAnimationFrame(goTimer);
                }
            }

            set = requestAnimationFrame(goTimer);
        }
    }
}

window.Timer = Timer;

