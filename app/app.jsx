import React from 'react';
import Navbar from './components/Navbar.react.jsx';
import navItems from './constants/navConstants.js';
import TipBar from 'material-ui/lib/snackbar';
import AppRouter from './AppRouter.react.jsx';
import {ajax} from 'jquery';
import backEndURL from './utils/backEndURL';
require('./assets/styles/overall.css');
require('./assets/styles/bootStrap.css');

var App = React.createClass({
    getInitialState (){
        return {
            isNewbee: false,
            userName: '用户名',
            reportId: 0
        }
    },
    goEditForm (){
        window.location.href = '/#/form'
    },
    componentDidMount (){
        this.getNewbeeStatus();
    },
    getNewbeeStatus (){
        var $this = this;
        ajax({
            url: backEndURL + '/api/login.json',
            method: 'GET',
            dataType: 'json',
            success (responseData){
                $this.setState({
                    isNewbee: !responseData.data.reported,
                    userName: responseData.data.name,
                    reportId: responseData.data.reportId,
                    userInfo: responseData.data
                })
            },
            error (err){
                console.log(err);
            },
            xhrFields: {
                withCredentials: true
            }
        })
    },
    render: function(){
        return (
            <div>
                <Navbar reportId={this.state.reportId} userName={this.state.userName} navItems={navItems}/>
                <div id="container">
                    <AppRouter userInfo={this.state.userInfo} />
                    {
                        this.state.isNewbee &&
                        <TipBar
                            openOnMount={true}
                            autoHideDuration={3000}
                            message="您还是新人哦~ 快去注册!"
                            onActionTouchTap={this.goEditForm}
                            action="这就去填写!"/>
                        }
                </div>
            </div>
        );
    }
});

React.render(
    <App />,
    document.body
);