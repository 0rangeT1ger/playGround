/**
 * Created by wujianbo on 15/12/3.
 */
import React from 'react';
const RaisedButton = require('material-ui/lib/raised-button');
import SelectField from 'material-ui/lib/select-field';

import backEndURL from '../../../utils/backEndURL';

import {ajax} from 'jquery';

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
    answerHandler (answer){
        return  (ev) => {
            this.props.answerHandler(answer);
        }
    },
    componentDidMount (){
        this.getProvinceList();
    },
    getProvinceList (){
        const $this = this;
        console.log('ajax!');
        ajax({
            url: backEndURL + '/api/provinces.json',
            method: 'GET',
            success (responseJSON){
                let responseData = {};
                try{
                    responseData = JSON.parse(responseJSON);
                }
                catch (err){
                    responseData = responseJSON;
                }
                if(responseData.success){
                    let provinceList = responseData.data;
                    provinceList.map((item, index) => {
                        item.text = item.name
                    });
                    $this.setState({
                        _menuItems: JSON.parse(JSON.stringify(provinceList))
                    })
                }
            },
            error (err){
                console.log(err);
                //DoNothing
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },
    getInitialState (){
        return {
            selectValue: '',
            _menuItems: [
                {
                    text: '请选择',
                    locationId: 'NULL'
                }
            ],
            selectedLocationId: '',
            _cityMenuItems: []
        }
    },
    selectAnswerHandler (){
        console.log(arguments);
    },
    exitHandler (ev){
        this.props.exitHandler();
    },
    _handleSelectProvinceChange (ev){
        const selectedLocationId = ev.target.value;
        console.log('locatonId: ', selectedLocationId);
        const $this = this;
        ajax({
            url: backEndURL + '/api/province/' + selectedLocationId + '/cities.json',
            success (resData){
                $this.setState({
                    _cityMenuItems: resData.data
                })
            },
            xhrFields: {
                withCredentials: true
            }
        });
        let selectedLocation = '';
        this.state._menuItems.map((item, index) => {
            if(item.id == selectedLocationId){
                selectedLocation = item.name
            }
        });
        this.setState({
            selectedLocationId: selectedLocationId,
            selectedLocation: selectedLocation
        })
    },
    _handleSelectCityChange (ev){
        const selectedCity = ev.target.value;
        this.setState({
            selectedCity: selectedCity
        })
    },
    displayProvinceOptions (list){
        return list.map((item, index) => {
            return <option value={item.id}>{item.name}</option>
        })
    },
    displayCityOptions (list){
        return list.map((item, index) => {
            return <option value={item.name}>{item.name}</option>
        })
    },
    render (){
        return(
            <div className={ 'form-page '
                        + (this.props.isCurrent ? 'form-page-current ' : ' ')
                        + (this.props.isBefore ? 'form-page-before ' : ' ')
                        + (this.props.isBehind ? 'form-page-behind ' : ' ')}>
                <div className="question-container">
                    <h1 className="text-center">你的家乡在哪里?</h1>
                    <div className="text-center">
                        <select onChange={this._handleSelectProvinceChange}>
                            {this.displayProvinceOptions(this.state._menuItems)}
                        </select>
                        <select onChange={this._handleSelectCityChange}>
                            {this.displayCityOptions(this.state._cityMenuItems)}
                        </select>
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
                                      onTouchTap={this.answerHandler('nope')}
                                      label="这不重要"/>
                        <RaisedButton style={{margin: '12px 40px', transform: 'scale(1.5)'}}
                                      onTouchTap={this.answerHandler(this.state.selectedLocation + ' ' + this.state.selectedCity)}
                                      label="当然是啦!"
                                      primary={true} />
                    </div>
                </div>
            </div>
        )
    }
});

export default FormPage;
