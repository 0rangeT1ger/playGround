/**
 * Created by wujianbo on 15/12/3.
 */
import React from 'react';
import Page from './FormPages/FormPage.react.jsx';
import Dialog from 'material-ui/lib/dialog';
import PersonSummary from './FormPages/PersonSummary.jsx';
import HomeLocationFormPage from './FormPages/HomeLocationForm.react.jsx';
import Favourites from './FormPages/FavouritesForm.react.jsx';
import LoveStatus from './FormPages/LoveStatus.react';
import Selfile from './FormPages/Selfie.react';
import AddTags from './FormPages/AddTags';
import backEndURL from '../../utils/backEndURL';

import {ajax} from 'jquery';

require('./signInForm.css');
let _ANSWER_FORM = {};
const Form = React.createClass({
    getInitialState (){
        return{
            currentPageIndex: 0
        }
    },
    componentDidMount (){

    },
    handleAnswer (questionType, pageIndex){
        return  (answer) => {
            _ANSWER_FORM[questionType] = answer;
            this.setState({
                currentPageIndex: pageIndex + 1
            });
            console.log('_ANSWER_FORM', _ANSWER_FORM);
        }
    },
    handleExit (pageIndex){
        return  () => {
            this.setState({
                currentPageIndex: pageIndex - 1
            });
        }
    },
    submitForm (data){
        var formData = Object.assign({}, data, _ANSWER_FORM);
        const $this = this;
        console.log('formData: ', formData);
        ajax({
            url : backEndURL + '/api/report.json',
            method: 'POST',
            data: formData,
            success (resData){
                if(resData.success){
                    $this.setState({
                        success: true
                    })
                }
            },
            xhrFields: {
                withCredentials: true
            }
        })
    },
    render (){

        return(
            <div className="form-page-stage">

                <Page isCurrent={this.state.currentPageIndex === 0}
                      isBehind={this.state.currentPageIndex > 0}
                      isBefore={this.state.currentPageIndex < 0}
                      answerHandler={this.handleAnswer('description', 0)}
                      exitHandler={this.handleExit(0)}
                />
                <PersonSummary isCurrent={this.state.currentPageIndex === 1}
                      isBehind={this.state.currentPageIndex > 1}
                      isBefore={this.state.currentPageIndex < 1}
                      answerHandler={this.handleAnswer('summary', 1)}
                      userInfo={this.props.userInfo}
                      exitHandler={this.handleExit(1)}
                />

                <Selfile isCurrent={this.state.currentPageIndex === 2}
                         isBehind={this.state.currentPageIndex > 2}
                         isBefore={this.state.currentPageIndex < 2}
                         answerHandler={this.handleAnswer('backImage', 2)}
                         exitHandler={this.handleExit(2)}
                />

                <AddTags isCurrent={this.state.currentPageIndex === 3}
                      isBehind={this.state.currentPageIndex > 3}
                      isBefore={this.state.currentPageIndex < 3}
                      answerHandler={this.submitForm}
                      exitHandler={this.handleExit(3)}
                />
                <Dialog
                    actions={[{text: '去首页看看!', onTouchTap: function(){window.location.href = '/#/personFlow'}}]}
                    open={this.state.success}
                    title="提示">
                    提交完成啦!  您现在有了自己的页面!
                </Dialog>

            </div>
        )
    }
});

export default Form;