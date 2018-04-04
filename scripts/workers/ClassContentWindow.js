class ContentWindow {
    constructor(buttonId) {
        this.el = buttonId;
        this.buildwindow()
    }

    buildwindow() {
        document.getElementById('effectWrapper').style.cssText = 'filter: blur(4px);pointer-events:none';
        let id = this.el;
        let win = document.createElement('div');
        win.id = 'winContent';
        let close = document.createElement('button');
        close.innerHTML = '&#215';
        close.id = 'closeContentWin';
        win.appendChild(close);
        let header = document.createElement('div');
        header.id="ContentWinHead";
        header.innerHTML = document.getElementById(this.el).getAttribute('data-tooltip') ? document.getElementById(this.el).getAttribute('data-tooltip').toUpperCase() : this.el.toUpperCase();
        win.appendChild(header);
        let content = document.createElement('div');
        content.id = 'content';
        win.appendChild(content);
        document.body.appendChild(win);
        document.body.addEventListener('click', toClose);

        function toClose(e) {
            if (e.target.id === 'closeContentWin' || (e.target.parentNode !== win && e.target.id !== id) && e.target !== win && e.target.id !== 'content' && e.target.parentNode.parentNode.tagName !== 'FORM' && e.target.parentNode.tagName !== 'FORM' && e.target.parentNode.id !== 'content') {
                document.getElementById('effectWrapper').style.cssText = '';
                win.remove();
                document.body.removeEventListener('click', toClose);
            }
        }

        if (id === 'about') {
            get('../../scripts/pages/about.html', '').then(resp => {
                content.innerHTML = resp.response;
            });
        }
        if (id === 'volumeMixer') {
            get('../../scripts/pages/volumeMixer.html', '').then(resp => {
                content.innerHTML = resp.response;
                document.getElementById('volumeCalc').addEventListener('click', () => {
                    calc_vol();

                    function calc_vol(form) {

                        if (document.form1.units1.value.length === 0) {
                            document.form1.units1.value = 0;
                        }
                        if (document.form1.units2.value.length === 0) {
                            document.form1.units2.value = 0;
                        }
                        if (document.form1.units3.value.length === 0) {
                            document.form1.units3.value = 0;
                        }


                        let FinalVol = parseFloat(document.form1.vol.value, 10);
                        let Units1 = parseFloat(document.form1.units1.value, 10);
                        let Units2 = parseFloat(document.form1.units2.value, 10);
                        let Units3 = parseFloat(document.form1.units3.value, 10);

                        if(!isNaN(FinalVol)&&!isNaN(Units1)&&!isNaN(Units2)&&!isNaN(Units3)) {
                            let TotalUnits = Units1 + Units2 + Units3;
                            let TotalMix = FinalVol / TotalUnits;

                            Total1.innerHTML = Math.round(TotalMix * Units1) + "&nbsp;ml";
                            Total2.innerHTML = "&nbsp;+&nbsp;" + Math.round(TotalMix * Units2) + "&nbsp;ml";

                            if (Units3 > 0) {
                                Total3.innerHTML = "&nbsp;+&nbsp;" + Math.round(TotalMix * Units3) + "&nbsp;ml";
                            } else {
                                Total3.innerHTML = "";
                            }

                            Water.innerHTML = "&nbsp;water";
                        }
                    }
                })
            });
        }
        if (id === 'tempConverter') {
            get('../../scripts/pages/tempConverter.html', '').then(resp => {
                content.innerHTML = resp.response;
                document.getElementById('buttonSubmit').addEventListener('click', (e) => {
                    e.preventDefault();
                    let form = document.querySelector('#convertForm');
                    post("../backend/todigitaltruth.php", `nominal_temp=${form.nominal_temp.value}&amp;nominal_time=${form.nominal_time.value}&amp;actual_temp=${form.actual_temp.value}&amp;units=${form.units.value}&amp;agitate=${form.agitate.value}&amp;Submit=Submit`).then(req => {
                        document.querySelector('#convertResult').innerHTML = req;
                    })
                })
            });
        }
        if (id === 'PushProcessing') {
            get('../../scripts/pages/pushProcessing.html', '').then(resp => {
                content.innerHTML = resp.response;
            });
        }
    }
}

window.get = function get (url, requestuestBody) {
    return new Promise(function (succeed, fail) {
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.setRequestHeader("document", "application/x-www-form-urlencoded; charset=utf-8");
        request.addEventListener("load", function () {
            if (request.status < 400)
                succeed(this);
            else
                fail(new Error("Request failed: " + request.statusText));
        });
        request.addEventListener("error", function () {
            fail(new Error("Network error"));
        });
        request.send(requestuestBody);
    });
};
window.ContentWindow = ContentWindow;