/**
 * Created by wujianbo on 15/12/2.
 */
import React from 'react';
require('./Main.css');
const Main = React.createClass({
    componentDidMount (){

    },
    render: function(){
        return (
            <div className="container-fluid text-center">
                <h1>你的任务猎手</h1>
                <div className="todo-hunter-container">

                </div>
            </div>
        );
    }
});

export default Main;