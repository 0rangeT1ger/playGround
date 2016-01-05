/**
 * Created by wujianbo on 15/12/5.
 */
import React from 'react';
const RaisedButton = require('material-ui/lib/raised-button');
import SelectField from 'material-ui/lib/select-field';
import UploadDialog from '../../UploadDialog.react.jsx';
import AvatarURL from './AvatarUrlList';
import tidyDate from '../../../utils/tidyDate';

const DatePicker = require('material-ui/lib/date-picker/date-picker');
const DatePickerDialog = require('material-ui/lib/date-picker/date-picker-dialog');

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

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
        return {
            upload: false
        }
    },
    answerHandler (answer){
        return  (ev) => {
            this.props.answerHandler(answer);
        }
    },
    confirmUpload (url){
        this.setState({
            images: url,
            upload: false,
            uploaded: true
        })
    },
    exitHandler (ev){
        this.props.exitHandler();
    },
    skipOrSubmit (){
        this.props.answerHandler(this.state.images);

    },
    selectSex (NULL, value){
        this.setState({
            sex: value
        })
    },
    selectSexualTrend (NULL, value){
        this.setState({
            sexualTrend: value
        })
    },
    selectLoveStatus (NULL, value){
        this.setState({
            loveStatus: value
        })
    },
    complete (){
        this.props.answerHandler(this.state);
    },
    selectBirthday (NULL, value){
        this.setState({
            birthDay: tidyDate(value)
        })
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
                    <h1 className="text-center">设置更多!</h1>
                    <div className="answer-container">
                        <i onClick={this.previous}
                           style={{position: 'relative', left: 'calc(50% - 280px)', top: '83px'}}
                           className={"fa fa-angle-right next-button previous"}> </i>
                        <div style={{position: 'relative', left: 'calc(50% - 200px)'}}
                             className="questions-container text-center">
                            <DatePicker hintText="你的生日"
                                        isSelectedDateDisabled={() => {}}
                                        onChange={this.selectBirthday}/>
                            <SelectField
                                onChange={this.selectSex}
                                hintText="你的性别"
                                menuItems={[{text: '请选择', payload: '0'}, {text: '男', payload: '1'}, {text: '女', payload: '0'}]}/>
                            <SelectField
                                onChange={this.selectSexualTrend}
                                hintText="交友取向"
                                menuItems={[
                                    {text: '取向是啥好吃么', payload: '0'},
                                    {text: '直得不能再直了', payload: '1'},
                                    {text: '放荡不羁爱搞基', payload: '2'},
                                    {text: '百合大法好', payload: '3'},
                                    {text: '心怀天下帅哥美女', payload: '4'}]}/>
                            <SelectField
                                onChange={this.selectLoveStatus}
                                hintText="恋爱状况"
                                menuItems={[
                                    {text: '保密', payload: '0'},
                                    {text: '单身狗', payload: '1'},
                                    {text: '热恋中', payload: '2'},
                                    {text: '已结婚', payload: '3'},
                                    {text: '孩子都会打酱油了', payload: '4'}]}/>
                        </div>
                        <i onClick={this.complete}
                           style={{position: 'relative', left: 'calc(50% + 210px)', top: '-150px !important'}}
                           className={"fa fa-angle-right next-button "}> </i>
                    </div>
                    <div className="progress-container">
                        <div className="progress-avatar" style={{background: 'url(' + AvatarURL.color[0] + ')'}}></div>
                        <div className="progress-avatar" style={{background: 'url(' + AvatarURL.color[1] + ')'}}></div>
                        <div className="progress-avatar" style={{background: 'url(' + AvatarURL.color[2] + ')'}}></div>
                        <div className="progress-avatar" style={{background: 'url(' + AvatarURL.color[3] + ')'}}></div>
                    </div>
                </div>
                <UploadDialog confirmUploadCallback={this.confirmUpload} upload={this.state.upload}/>
            </div>
        )
    }
});

export default FormPage;