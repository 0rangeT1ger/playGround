/**
 * Created by wujianbo on 15/12/4.
 */
import React from 'react';
const DatePicker = require('material-ui/lib/date-picker/date-picker');
import Dialog from 'material-ui/lib/dialog';
const DatePickerDialog = require('material-ui/lib/date-picker/date-picker-dialog');

import tidyDate from '../../../utils/tidyDate';

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const RaisedButton = require('material-ui/lib/raised-button');
import AvatarURL from './AvatarUrlList';
require('./formPages.css');
const FormPage = React.createClass({
    getDefaultProps (){
        return{
            isCurrent: false,
            isBehind: false,
            isBefore: false,
            answerHandler(){},
            exitHandler(){}
        }
    },
    getInitialState (){
        return{
            skip: false,
            inputed: false
        }
    },
    answerHandler (answer){
        return  (ev) => {
            this.props.answerHandler(answer);
        }
    },
    selectAnswerHandler (){
        console.log(arguments);
    },
    exitHandler (ev){
        this.props.exitHandler();
    },
    changeListener (ev){
        if(ev.target.value){
            this.setState({
                inputed: true,
                selfDesc: ev.target.value
            })
        }
        else {
            this.setState({
                inputed: false
            })
        }
    },
    skipOrSubmit (){
        if(!this.state.inputed){
            this.setState({
                skip: !this.state.skip
            })
        }
        else {
            console.log('submit!');
            this.props.answerHandler(this.state.selfDesc);
        }

    },
    skip (){
        this.props.answerHandler();
    },
    previous (){
        this.props.exitHandler();
    },
    render (){
        return(
            <div className={ 'form-page '
                        + (this.props.isCurrent ? 'form-page-current ' : ' ')
                        + (this.props.isBefore ? 'form-page-before ' : ' ')
                        + (this.props.isBehind ? 'form-page-behind ' : ' ')}>
                <div className="title-container text-center" style={{background: 'url(http://msstest.vip.sankuai.com/v1' +
                                     '/mss_5xqVe-+=Nn60OQfp3DYtPIkw==/xmxt/banner/%E6%9C%AA%E6%A0%87%E9%A2%98-1.png?temp' +
                                      '_url_sig=d59dd76cb79dabeed6d2ad9bf882d21a6f3c7cc8&temp_url_expires=36001449300056)'}}>
                </div>
                <div className="question-container">
                    <h4 className="text-center">刚才说了这么多, 如果一句话概括自己想跟大家说什么? </h4>
                    <div style={{marginTop: '10px'}} className="answer-container">
                        <i onClick={this.previous}
                           style={{top: '50px'}}
                           className={"fa fa-angle-right next-button previous"}> </i>
                        <input className="input" id="selfDesc" cols="30" maxLength="113" onChange={this.changeListener}/>
                        <i onClick={this.skipOrSubmit}
                           style={{top: '0!important'}}
                           className={"fa fa-angle-right next-button "
                                            + ((this.state.inputed) ? '' : 'drop-button')}> </i>
                        <div style={{top: '40px'}}
                             onClick={this.skip}
                             className={"skip-button " + (!this.state.skip ? 'transparent' : 'skip')}> 不想填, 下一项</div>
                    </div>
                </div>
                <div className="progress-container">
                    <div className="progress-avatar" style={{background: 'url(' + AvatarURL.color[0] + ')'}}></div>
                    <div className="progress-avatar" style={{background: 'url(' + AvatarURL.color[1] + ')'}}></div>
                    <div className="progress-avatar" style={{background: 'url(' + AvatarURL.black[2] + ')'}}></div>
                    <div className="progress-avatar" style={{background: 'url(' + AvatarURL.black[3] + ')'}}></div>
                </div>
            </div>
        )
    }
});

export default FormPage;