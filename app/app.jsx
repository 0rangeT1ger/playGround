import React from 'react';
import Navbar from './components/Navbar.react.jsx';
import navItems from './constants/navConstants.js';
import AppRouter from './AppRouter.react.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
require('./assets/styles/overall.css');
require('./assets/styles/bootStrap.css');
injectTapEventPlugin();
var App = React.createClass({
    getInitialState (){
        return {
            userName: window.location.href.split('/')[window.location.href.split('/').length - 1],
            reportId: 0
        }
    },
    render: function(){
        return (
            <div>
                <Navbar reportId={this.state.reportId} userName={this.state.userName} navItems={navItems}/>
                <div id="container">
                    <AppRouter userInfo={this.state.userInfo} />
                </div>
            </div>
        );
    }
});

React.render(
    <App />,
    document.getElementById('container')
);