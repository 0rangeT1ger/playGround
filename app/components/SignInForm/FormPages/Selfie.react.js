/**
 * Created by wujianbo on 15/12/4.
 */
import React from 'react';
const RaisedButton = require('material-ui/lib/raised-button');
import SelectField from 'material-ui/lib/select-field';
import UploadDialog from '../../UploadDialog.react.jsx';
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
        if(!this.state.uploaded){
            this.setState({
                skip: !this.state.skip
            })
        }
        else {
            this.props.answerHandler(this.state.images);
        }
    },
    complete (){
        this.props.answerHandler(this.state.images);
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
                <div  className="question-container">
                    <h1 className="text-center">快, 上传自拍的时候到了!</h1>
                    <div className="answer-container" style={{
                        marginTop: '-10px'
                    }}>
                        <i onClick={this.previous}
                           style={{position: 'relative', left: 'calc(50% - 150px)', top: '37px'}}
                           className={"fa fa-angle-right next-button previous"}> </i>
                        <RaisedButton style={{position: 'relative', left: 'calc(50% - 40px)', zIndex: '9',  transform: 'scale(1.5)'}}
                                      onTouchTap={() => {this.setState({upload: true})}}
                                      label="上传!"/>
                        <i onClick={this.skipOrSubmit}
                           style={{position: 'relative', left: 'calc(50% - 10px)', top: '0 !important'}}
                           className={"fa fa-angle-right next-button "
                                            + ((this.state.uploaded) ? '' : 'drop-button')}> </i>
                        <div style={{position: 'relative', left: 'calc(50% - 10px)', top: '47px'}}
                             onClick={this.complete}
                             className={"skip-button " + (!this.state.skip ? 'transparent' : 'skip')}> 不想填写, 下一项!</div>
                    </div>
                    <div className="text-center" style={{marginTop: '20px'}}>
                        {
                            this.state.uploaded &&
                            <img src={this.state.images} style={{width: '170px', maxHeight: "170px"}} alt="美丽的头像"/>
                        }
                    </div>
                    <div className="progress-container">
                        <div className="progress-avatar" style={{background: 'url(' + AvatarURL.color[0] + ')'}}></div>
                        <div className="progress-avatar" style={{background: 'url(' + AvatarURL.color[1] + ')'}}></div>
                        <div className="progress-avatar" style={{background: 'url(' + AvatarURL.color[2] + ')'}}></div>
                        <div className="progress-avatar" style={{background: 'url(' + AvatarURL.black[3] + ')'}}></div>
                    </div>
                </div>
                <UploadDialog style={{zIndex: '103'}} confirmUploadCallback={this.confirmUpload} upload={this.state.upload}/>
            </div>
        )
    }
});

export default FormPage;