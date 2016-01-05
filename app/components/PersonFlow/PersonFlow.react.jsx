/**
 * Created by wujianbo on 15/12/2.
 */
import React from 'react';
import Person from './Person.react.jsx';
import Dialog from 'material-ui/lib/dialog';
import backEndURL from '../../utils/backEndURL';
import AutoComplete from 'material-ui/lib/auto-complete';
import {ajax} from 'jquery';
import __simPersonList from '../../constants/simData/personFlow.js';
require('./PersonFlow.css');


function getScrollTop(){
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if(document.body){
        bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

//文档的总高度

function getScrollHeight(){
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if(document.body){
        bodyScrollHeight = document.body.scrollHeight;
    }
    if(document.documentElement){
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

//浏览器视口的高度

function getWindowHeight(){
    var windowHeight = 0;
    if(document.compatMode == "CSS1Compat"){
        windowHeight = document.documentElement.clientHeight;
    }else{
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

let __latestId = '';
let __offset= 0;
let _q = '';
const PersonFlow = React.createClass({
    getInitialState (){
        return{
            personList: [],
            alert: false,
            message: '',
            q: ''
        }
    },
    displayFlow (list){
        var col1 = [],
            col2 = [];
        list.map((item, index) => {
            if(index % 2 == 0){
                col1.push(<Person col="1" personInfo={item}/>)
            }
            else {
                col2.push(<Person col="2" personInfo={item}/>)
            }
        });
        return (
            <div>
                <div className="col1 col-md-6">{col1}</div>
                <div className="col2 col-md-6">{col2}</div>
            </div>
        )

    },
    componentWillUnmount (){
        __latestId = '';
    },
    searchHandler (q, offset, add){
        const $this = this;
        this.setState({
            searching: true
        });
        __offset = offset || 0;
        ajax({
            url: backEndURL + '/api/search.json',
            data: {
                q: q,
                offset: __offset
            },
            success (resData){
                if(resData && resData.data.length == 0 && add){
                    $this.setState({
                        alert: true,
                        message: '没有新东西了喵!'
                    })
                }
                __offset = resData.paging.offset + resData.data.length;
                console.log('offset:   ', __offset);
                if(add){
                    let personListNew = $this.state.personList;
                    personListNew.concat(resData.data);
                    $this.setState({
                        personList: personListNew
                    })
                }
                else {
                    $this.setState({
                        personList: resData.data
                    })
                }
            },
            xhrFields: {
                withCredentials: true
            }
        })
    },
    autoSearch (q){
        if(q){
            this.searchHandler(q);
            _q = q;
        }
        else {
            __latestId = '';
            this.setState({
                searching: false
            }, () => {
                this.getPersonList().then(
                    (resData) => {
                        if(resData.length === 0){
                            this.setState({
                                alert: true,
                                message: '没有新东西了喵!'
                            })
                        }
                        else {
                            __latestId = resData[resData.length - 1].id;
                            this.setState({
                                personList: resData
                            })
                        }
                    }
                );
            })
        }
    },
    componentDidMount (){
        window.onscroll = this.scrollHandler;
        this.getPersonList().then(
            (resData) => {
                if(resData.length === 0){
                    this.setState({
                        alert: true,
                        message: '没有新东西了喵!'
                    })
                }
                else {
                    __latestId = resData[resData.length - 1].id;
                    this.setState({
                        personList: resData
                    })
                }
            }
        );
    },
    getPersonList (){
        return new Promise((resolve, reject) => {
            ajax({
                url: backEndURL + '/api/reports.json',
                data: {
                    latestId: __latestId,
                    limit: 20
                },
                success (resData){
                    if(resData.success){
                        resolve(resData.data);
                    }
                    else {
                        reject(false);
                    }
                },
                xhrFields: {
                    withCredentials: true
                }
            })
        })
    },
    scrollHandler (ev){
        if(getScrollTop() + getWindowHeight() == getScrollHeight()){ //滚动到了底部
            if(this.state.searching){
                this.searchHandler(_q, __offset, true)
            }
            else {
                if(this.state.personList.length > 8){
                    this.getPersonList().then(
                        (resData) => {
                            console.log('scrolled!');
                            if(resData.length == 0){
                                this.setState({
                                    alert: true,
                                    message: '没有新东西了喵!'
                                })
                            }
                            else {
                                __latestId = resData[resData.length - 1].id;
                                let newFlow = this.state.personList;
                                resData.map((item) => {
                                    newFlow.push(item)
                                });
                                console.log('latestID:  ', __latestId);
                                this.setState({
                                    alert: false,
                                    personList: newFlow
                                })
                            }
                        }
                    )
                }
                else{
                    //Do Nothing
                }
            }
        }
    },
    render (){
        return(
            <div className="personFlow-container clearfix">
                <AutoComplete fullWidth = {true}
                              hintText = "搜索任何你想搜的东西!"
                              dataSource= {this.state.q}
                              onUpdateInput={this.autoSearch}/>
                {this.displayFlow(this.state.personList)}
                <Dialog title="提示"
                        actions={[{text: '好波', onTouchTap: () => {this.setState({
                            alert:false
                        })}}]}
                        open={this.state.alert}>
                    {this.state.message}
                </Dialog>
            </div>
        )
    }
});

export default PersonFlow;