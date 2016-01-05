/**
 * Created by wujianbo on 15/12/4.
 */
import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import backEndURL from '../utils/backEndURL';
let injectTapEventPlugin = require("react-tap-event-plugin");
import {ajax} from 'jquery'
injectTapEventPlugin();
const UploadDialog = React.createClass({
    getDefaultProps (){
        return {
            upload: false,
            confirmUploadCallback (){}
        }
    },
    getInitialState (){
        return{
            fileList: [],
            upload: this.props.upload
        }
    },
    componentWillReceiveProps (_nextProps){
        this.setState({
            upload: _nextProps.upload
        })
    },
    confirmUpload (){
        this.setState({
            upload: false
        },() => {
            setTimeout(
                () => {
                    this.props.confirmUploadCallback(this.state.previewImgURL)
                }, 100
            )
        });
    },
    uploadBtnHandler (){
        const upload = document.getElementById('upload');
        upload.click();
    },
    uploadHandler (ev){
        let File = ev.target.files[0];
        var formData = new FormData();
        console.log('file', File);
        const $this = this;
        formData.append('image', File);
        ajax({
            url: backEndURL + '/api/image.json',
            data: formData,
            method: 'POST',
            xhrFields: {
                withCredentials: true
            },
            success (resData){
                $this.setState({
                    previewImgURL: resData.data,
                    uploaded: true
                })
            },
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false   // 告诉jQuery不要去设置Content-Type请求头
        })
    },
    render (){
        return (
            <div>
                <Dialog
                    title="图片上传"
                    actions={[{text: '确认上传', onTouchTap: this.confirmUpload}]}
                    open={this.state.upload}>
                    <div className="text-center">
                        <RaisedButton onTouchTap={this.uploadBtnHandler} label="上传图片"/>
                        <input onChange={this.uploadHandler} type="file" id="upload" style={{display: 'none'}}/>
                    </div>
                    <div className="text-center" style={{marginTop: '20px'}}>
                        {
                            this.state.uploaded &&
                            <img src={this.state.previewImgURL} style={{width: '200px', maxHeight: '200px'}} alt="上传失败"/>
                            }
                    </div>
                </Dialog>
            </div>
        )
    }
});

export default UploadDialog;