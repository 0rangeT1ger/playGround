/**
 * Created by wujianbo on 15/12/2.
 */
import React from 'react';

import Checkbox from 'material-ui/lib/checkbox';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import Toggle from 'material-ui/lib/toggle';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

const _todoItemStyle = {
    minHeight: '60px',
    lineHeight: '60px',
    textAlign: 'left',
    paddingTop: '15px',
    paddingLeft: '20px',
    borderBottom: '1px solid #dddddd'
};
const _finishButtonStyle = {
    marginTop: '30px'
};

require('./Main.css');
const Main = React.createClass({
    getInitialState (){
        return {
            todos: JSON.parse(window.localStorage.getItem('todos' + this.props.params.userName)) || [],
            selectedIndexes: []
        }
    },
    componentDidMount (){

    },
    componentWillUnmount (){
        //存储数据对象
    },
    checkTodoHandler (event, checked){
        console.log(event.target.value, checked);
        let selectedIndex = parseInt(event.target.value);
        let selectedIndexes = this.state.selectedIndexes;
        if(!checked){
            selectedIndexes.splice(selectedIndexes.indexOf(selectedIndex), 1);
            this.setState({
                selectedIndexes
            })
        }
        else {
            selectedIndexes.push(selectedIndex);
            this.setState({
                selectedIndexes
            })
        }
    },
    displayTodos (list, selectedIndexes){
        if(list.length && list.length !== 0){
            return list.map(
                (item, index) => {
                    return (
                        <Checkbox
                            name="checkboxName1"
                            label={item}
                            style={_todoItemStyle}
                            labelStyle={{
                            fontSize: '30px'
                        }}
                            value={index}
                            defaultChecked={selectedIndexes.indexOf(index) !== -1}
                            onCheck={this.checkTodoHandler}
                        />
                    )
                }
            )
        }
        else {
            return (
                <h2 style={{marginTop: 'calc(25%)'}} className="text-center">当前没有未完成任务</h2>
            )
        }
    },
    finishTodoHandler (){
        console.log('clicked');
        let todos = this.state.todos,
            selectedIndexes = this.state.selectedIndexes,
            newTodos = [];
        todos.map(
            (todo, index) => {
                if(selectedIndexes.indexOf(index) === -1){
                    newTodos.push(todo);
                }
                else {
                    //Do Nothing
                }
            }
        );
        window.localStorage.setItem('todos', JSON.stringify(newTodos));
        this.setState({
            todos: newTodos,
            selectedIndexes: []
        });

    },
    displayFinishButton (list){
        if(list.length !== 0){
            return (
                <RaisedButton
                    onTouchTap={this.finishTodoHandler}
                    style={_finishButtonStyle}
                    label="完成任务"
                    secondary={true}
                />
            )
        }
        else {
            return void(0)
        }
    },
    render: function(){
        return (
            <div className="container-fluid text-center">
                <h1>追踪任务</h1>
                <div className="todo-hunter-container">
                    {this.displayTodos(this.state.todos, this.state.selectedIndexes)}
                </div>
                {
                    this.displayFinishButton(this.state.selectedIndexes)
                }
            </div>
        );
    }
});

export default Main;