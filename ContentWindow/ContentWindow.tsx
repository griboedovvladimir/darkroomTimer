import React, { Component } from 'react';

export class ContentWindow extends Component <any> {
    public render(): React.ReactNode {
        return (
            <div id="winContent">
                <button id="closeContentWin">×</button>
                <div id="ContentWinHead">
                    <div id="content">
                        <form name="form1" action="" method="get">
                            <p className="mixer-labels">
                                Dilution:&nbsp;&nbsp;
                                <input type="text" name="units1" defaultValue="1" maxLength={4}
                                       className="mixer-field"/> + <input
                                type="text" name="units2" defaultValue="9" maxLength={4} className="mixer-field"/> + <input
                                type="text" name="units3" defaultValue="0" maxLength={4} className="mixer-field"/></p>
                            <p className="mixer-labels">Final Volume&nbsp;(ml):&nbsp;&nbsp;<input
                                type="text" name="vol" defaultValue="500" maxLength={4} className="mixer-field"/></p>
                            <p className="mixer-labels">Total&nbsp;=&nbsp;&nbsp;<span
                                id="Total1"/><span id="Total2"/><span id="Total3"/><span
                                id="Water"/></p>
                            <p className="mixer-labels">
                                <input id="volumeCalc" type="button" name="button" defaultValue="Calculate"/>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Component;