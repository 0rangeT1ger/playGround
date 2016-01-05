/**
 * Created by wujianbo on 15/12/2.
 */
import React from 'react';
require('./Person.css');
import {ajax} from 'jquery';
import backEndURL from '../../utils/backEndURL';
import Heart from '../PersonPage/Heart';
import HeartClicked from '../PersonPage/HeartClicked';
import CNTable from '../../utils/CNTable';
const __defaultAvatarURL = 'http://msstest.vip.sankuai.com/v1/mss_5xqVe-+=Nn60OQfp3DYtPIkw==/xmxt/3.png?temp_url_sig=d' +
    '0d74264fb6b3c3d309ee530017a82d0c5470305&temp_url_expires=1452640606';
const Person = React.createClass({
    getInitialState (){
        return{
            isCurrent: false,
            fading: false,
            liked: this.props.personInfo.liked,
            likeTotal: parseInt(this.props.personInfo.likeTotal)
        }
    },
    personClickHandler (){
        this.setState({
            isCurrent: true,
            fading: false
        })
    },
    closeDialogHandler (ev){
        if(__DEV__){
            console.log(ev.target);
        }
        if(ev.target.id == 'person-stage'){
            this.setState({
                fading: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        isCurrent: false
                    })
                }, 198)
            })
        }
    },
    displayTags (list){
        return list.map((item, index) => {
            return(
                <div className="tag">{item}</div>
            )
        })
    },
    likeHandler (ev){
        ev.preventDefault();
        ev.stopPropagation();
        const $this = this;
        ajax({
            url: backEndURL + '/api/like.json',
            method: 'POST',
            data: {
                reportId: this.props.personInfo.id,
                action: this.state.liked ? '1' : '0'
            },
            success (resData){
                let likeTotal_ = $this.state.likeTotal;
                $this.setState({
                    liked: !$this.state.liked,
                    likeTotal: parseInt($this.state.liked ? (likeTotal_ - 1) : (likeTotal_ + 1))
                })
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },
    render (){
        return (
            <div>
                <div onClick={this.personClickHandler}
                     className={ 'person-container ' + (this.state.isCurrent ? 'transparent ' : '')}>

                    <div className="person-avatar-container">
                        <div style={{background: 'url(' + (this.props.personInfo.backImage || __defaultAvatarURL) + ')'}} className="person-avatar"></div>
                    </div>
                    <div className="person-detail">
                        <p className="person-name">
                            {this.props.personInfo.name}
                            <span className="pull-right" style={{marginTop: '-5px', marginRight: '10px'}}>
                                {this.state.liked ?
                                <HeartClicked onClick={this.likeHandler} />
                                    : <Heart onClick={this.likeHandler} />
                                    }
                                <span> {this.state.likeTotal} </span>
                            </span>
                        </p>
                        <p className="person-brief">
                            {this.props.personInfo.summary}
                        </p>
                        <p className="person-desc">
                            {this.props.personInfo.description}
                        </p>
                    </div>
                </div>
                {this.state.isCurrent &&
                    (
                        <div>
                            <div className="overlay-mask"></div>
                        </div>
                        )
                    }
                {this.state.isCurrent &&
                    (
                    <div  onClick={this.closeDialogHandler}
                          id="person-stage"
                        style={{
                            position: 'fixed',
                            perspective: '150px',
                            'WebkitPerspective': '150px',
                            height: '100%',
                            width: '100%',
                            top: '0',
                            left: '0',
                            zIndex: 101
                        }}>
                        <div className={ 'person-container-current ' +
                                           ((this.state.fading) ? 'person-container-fading ' : ' ')}>

                            <div className="person-avatar-container">
                                <div style={{backgroundImage: 'url(' + (this.props.personInfo.backImage || __defaultAvatarURL) + ')'}} className="person-avatar"></div>
                            </div>
                            <div className="person-detail" style={{overflow: 'auto'}}>
                                <p className="person-name">
                                    {this.props.personInfo.name}
                                    <span className="pull-right" style={{marginTop: '-5px', marginRight: '10px'}}>
                                        {this.state.liked ?
                                        <HeartClicked onClick={this.likeHandler} />
                                            : <Heart onClick={this.likeHandler} />}
                                        <span> {this.state.likeTotal} </span>
                            </span>

                                </p>
                                <p className="person-brief">
                                    {this.props.personInfo.summary}
                                </p>
                                <p className="person-desc">
                                    {this.props.personInfo.description}
                                </p>
                                <p className="person-desc">恋爱状况: <span className="answer">{CNTable.loveStatus[this.props.personInfo.loveStatus]}</span></p>
                                <p className="person-desc">性取向: <span className="answer">{CNTable['sexualTrendCN'][this.props.personInfo.sexualTrend]}</span></p>
                                <p className="person-desc">星座: <span className="answer">{this.props.personInfo.constellation}</span></p>
                                <p className="person-desc">生肖: <span className="answer">{this.props.personInfo.zodiac}</span></p>
                                <div>
                                    {this.displayTags(this.props.personInfo.tags || [])}
                                </div>
                            </div>
                        </div>
                    </div>
                        )}
            </div>
        )
    }
});

export default Person;