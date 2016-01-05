/**
 * Created by wujianbo on 15/12/3.
 */
import React from 'react';
const RaisedButton = require('material-ui/lib/raised-button');
import SelectField from 'material-ui/lib/select-field';
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
                    <h2 className="text-center">和小伙伴介绍下自己吧! </h2>
                    <div className="answer-container">
                        <textarea id="selfDesc" cols="30" maxLength="113" onChange={this.changeListener}> </textarea>
                        <i onClick={this.skipOrSubmit} className={"fa fa-angle-right next-button "
                                            + ((this.state.inputed) ? '' : 'drop-button')}> </i>
                        <div onClick={this.skip} className={"skip-button " + (!this.state.skip ? 'transparent' : 'skip')}> 不想填, 下一项</div>
                    </div>
                </div>
                <div className="progress-container">
                    <div className="progress-avatar" style={{background: 'url(' + AvatarURL.color[0] + ')'}}></div>
                    <div className="progress-avatar" style={{background: 'url(' + AvatarURL.black[1] + ')'}}></div>
                    <div className="progress-avatar" style={{background: 'url(' + AvatarURL.black[2] + ')'}}></div>
                    <div className="progress-avatar" style={{background: 'url(' + AvatarURL.black[3] + ')'}}></div>
                </div>
            </div>
        )
    }
});

export default FormPage;