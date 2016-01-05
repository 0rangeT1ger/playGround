/**
 * Created by wujianbo on 15/12/4.
 */
import React from 'react';
const RaisedButton = require('material-ui/lib/raised-button');
import SelectField from 'material-ui/lib/select-field';
import AutoComplete from 'material-ui/lib/auto-complete';
require('./formPages.css');
const FormPage = React.createClass({
    getDefaultProps (){
        return{
            isCurrent: false,
            isBehind: false,
            isBefore: false,
            answerHandler(){},
            exitHandler(){},
            selfDesc: ''
        }
    },
    getInitialState (){
        return {
            selfDesc: ''
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
                    <h1 className="text-center">请输入你的爱好(们), 用空格隔开~!</h1>
                    <div className="text-center">
                        <AutoComplete
                            style={{width: '400px'}}
                            dataSource= {this.state.selfDesc}
                            onUpdateInput={(t) => {this.setState({selfDesc: t});}}/>
                    </div>
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
                                      onTouchTap={this.answerHandler(this.state.selfDesc.split(/\s+/).join(','))}
                                      label="完成!"
                                      primary={true} />
                    </div>
                </div>
            </div>
        )
    }
});

export default FormPage;