/**
 * Created by wujianbo on 15/12/4.
 */
import React from 'react';
require('./personPage.css');
import {ajax} from 'jquery';
import backEndURL from '../../utils/backEndURL';
import Heart from './Heart';
import HeartClicked from './HeartClicked';
import _backgroundURL from './backgroundURL';
import RaisedButton from 'material-ui/lib/raised-button'
import Tag from './Tag';
require('./icons.css');
import CNTable from '../../utils/CNTable';
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import AutoComplete from 'material-ui/lib/auto-complete'
const PersonPage  = React.createClass({
    getInitialState (){
        return {
            rendering: true,
            liked: false,
            likeTotal: 0,
            tagName: '',
            tags: [],
            reportId: this.props.params.reportId || '1'
        }
    },
    sexualTrendTable: {
        0: '取向是啥好吃么',
        1: '直得不能再直了',
        2: '放荡不羁爱搞基',
        3: '百合大法好',
        4: '心怀天下帅哥美女'
    },
    componentDidMount (){
        const $this = this;
        ajax({
            url: backEndURL + '/api/report/' + this.state.reportId + '.json',
            success (resData){
                if(resData.success){
                    console.log(resData.data[0]);
                    $this.setState(Object.assign({}, resData.data[0],
                        {
                            rendering: false,
                            sexualTrendCN: $this.sexualTrendTable[resData.data[0].sexualTrend]}));
                }
                else {
                    //Do Nothing
                }
            },
            xhrFields: {
                withCredentials: true
            }
        })
    },
    likeHandler (){
        console.log('liked~!');
        this.setState({
            liked: !this.state.liked,
            likeTotal: !this.state.liked ? (this.state.likeTotal + 1) :   (this.state.likeTotal - 1)
        })
    },
    clickedTag (id, reportId){
        return (ev) => {
            //TODO: 等着写
        }
    },
    simDisplayTags (){
        let list = [
            {
                id: '1',
                reportId: '1',
                name: '长得帅!',
                total: 3
            },
            {
                id: '1',
                reportId: '1',
                name: '好看!',
                total: 3
            },
            {
                id: '1',
                reportId: '1',
                name: '懒癌晚期',
                total: 3
            }
        ];
        return list.map(
            (item, index) => {
                return <Tag onClick={this.clickedTag(item.id, item.reportId)} text={item.name} number={item.total} />
            }
        )
    },
    displayTags (list){
        if(list.length == 0){
            return <h2 className="text-center">你当前没有标签耶!</h2>
        }
        else {
            return list.map(
                (item, index) => {
                    return <Tag onClick={this.clickedTag(item.id, item.reportId)} text={item.name} number={item.total} />
                }
            )
        }
    },
    addTag (){
        //AJAX here
        var tags = this.state.tags;
        tags.push({id: 'temp', reportId: 'temp', name: this.state.tagName, total: 1});
        this.setState({
            tags: tags
        })
    },
    render (){
        return (
            <div className="person-page-wrapper">
                {
                    this.state.rendering &&
                    <div className={"background-image-container  rendering"}>
                    </div>
                }
                {
                    !this.state.rendering &&
                        <div className="background-image-container">
                            <div className="background-image-container rendered"
                                 style={{background: 'url('+ _backgroundURL +')'}}></div>
                        </div>
                }

                <div className="clearfix bottom-border">
                    <div className="detail-col col-md-8 clearfix">
                        {
                            this.state.rendering &&
                            <div>
                                <div className="info-big rendering">
                                </div>
                                <div className="info rendering">
                                </div>
                                <div className="info rendering">
                                </div>
                                <div className="info rendering">
                                </div>
                                <div className="info rendering">
                                </div>
                            </div>
                        }
                        {
                            !this.state.rendering &&
                            <div>
                                <div className="info-big">
                                    {this.state.summary}
                                </div>
                                <div style={{height: 'auto !important;'}} className="info">
                                    {this.state.description}
                                </div>
                                <p className="person-desc">恋爱状况: <span className="answer">{CNTable.loveStatus[this.state.loveStatus]}</span></p>
                                <p className="person-desc">性取向: <span className="answer">{CNTable['sexualTrendCN'][this.state.sexualTrend]}</span></p>
                                <p className="person-desc">星座: <span className="answer">{this.state.constellation}</span></p>
                                <p className="person-desc">生肖: <span className="answer">{this.state.zodiac}</span></p>
                            </div>
                        }
                    </div>
                    <div className="info-col col-md-4">
                        {
                            this.state.rendering &&
                            <div>
                                <div className="avatar-container rendering-dark">
                                    <div className="avatar"></div>
                                </div>
                                <div className="name-container rendering">

                                </div>
                                <div className="sex-intension-container rendering">

                                </div>
                                <div className="text-center">
                                    {this.state.liked ?
                                        <HeartClicked onClick={this.likeHandler} />
                                        : <Heart onClick={this.likeHandler} />
                                    }
                                <span className="liked-times">
                                    {this.state.likeTotal}
                                </span>
                                </div>
                            </div>
                        }
                        {
                            !this.state.rendering &&
                            <div>
                                <div className="avatar-container">
                                    <div className="avatar"
                                         style={{background: 'url('+ this.state.backImage +')'}}></div>
                                </div>
                                <div className="name-container">
                                    {this.state.name}
                                    {this.state.sex == 1 ?
                                        (<i className="fa fa-mars"
                                            style={{fontSize: '30px', marginLeft: '5px', color: '#49c0d5', fontWeight: '500'}}> </i>)
                                    :   (<i className="fa fa-venus"
                                            style={{fontSize: '30px', marginLeft: '5px', color: '#f5a3c7', fontWeight: '500'}}> </i>)}
                                </div>
                                <div className="sex-intension-container">
                                    {this.state.sexualTrendCN}
                                </div>
                                <div className="text-center">
                                    {this.state.liked ?
                                        <HeartClicked onClick={this.likeHandler} />
                                        : <Heart onClick={this.likeHandler} />
                                    }
                                    <span style={{marginLeft: '5px'}}>{this.state.likeTotal}</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {
                    this.state.rendering &&
                    <div className="tags-container rendering">
                        {__DEV__ && this.simDisplayTags()}
                        <div>
                            <AutoComplete
                                dataSource= {this.state.tagName}
                                style={{width: '80%', transform: 'scale(1.1)', marginLeft: '40px'}}
                                hintText="打标签~"
                                onUpdateInput={(t) => {this.setState({tagName: t});}}/>
                            <RaisedButton style={{transform: 'scale(1.3)'}}
                                          onTouchTap={this.addTag}
                                          label="打上!"/>
                        </div>
                    </div>
                }
                {
                    !this.state.rendering &&
                    <div className="tags-container">
                        {this.displayTags(this.state.tags)}
                        <div>
                            <AutoComplete
                                dataSource= {this.state.tagName}
                                style={{width: '80%', transform: 'scale(1.1)', marginLeft: '40px'}}
                                hintText="打标签~"
                                onUpdateInput={(t) => {this.setState({tagName: t});}}/>
                            <RaisedButton style={{margin: '12px 40px', transform: 'scale(1.5)'}}
                                          onTouchTap={this.addTag}
                                          label="打上!"/>
                        </div>
                    </div>
                }

            </div>
        )
    }
});
export default PersonPage;