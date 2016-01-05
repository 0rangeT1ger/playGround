/**
 * Created by wujianbo on 15/12/3.
 */
import React from 'react';
const RaisedButton = require('material-ui/lib/raised-button');
import SelectField from 'material-ui/lib/select-field';
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
    render (){
        return(
            <div className={ 'form-page '
                        + (this.props.isCurrent ? 'form-page-current ' : ' ')
                        + (this.props.isBefore ? 'form-page-before ' : ' ')
                        + (this.props.isBehind ? 'form-page-behind ' : ' ')}>
                <div className="question-container">
                    <h1 className="text-center">你是不是单身(狗)?</h1>
                </div>
                <div className="btn-group-container">
                    <div className="button-left-container">
                        <RaisedButton style={{margin: '12px 40px', transform: 'scale(1.5)'}}
                                      onTouchTap={this.exitHandler}
                                      label="上一题"
                                      secondary={true} />
                    </div>
                    <div className="button-right-container">
                        <RaisedButton style={{margin: '12px 40px', transform: 'scale(1.5)'}}
                                      onTouchTap={this.answerHandler('0')}
                                      label="这不重要"/>
                        <RaisedButton style={{margin: '12px 40px', transform: 'scale(1.5)'}}
                                      onTouchTap={this.answerHandler('1')}
                                      label="当然是啦!"
                                      primary={true} />
                    </div>
                </div>
            </div>
        )
    }
});

export default FormPage;