/**
 * Created by wujianbo on 16/1/5.
 */
import React from 'react';
import TextField from 'material-ui/lib/text-field';

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

import Dialog from 'material-ui/lib/dialog';

require('./AddTodo.css');
const AddTodo = React.createClass({
    getInitialState () {
        return {
            modified: false,
            dialogOpen: false,
            todo: '',
            errorMessage: '',
            error: false
        }
    },
    _handleInputChange (ev){
        let inputValue = ev.target.value;
        if(inputValue.length === 0){
            this.setState({
                modified: false,
                todo: ""
            })
        }
        else {
            this.setState({
                modified: true,
                todo: inputValue
            })
        }
    },
    actions (){
        return [
            <FlatButton
                label="取消"
                secondary={true}
                onTouchTap={this.handleClose} />,
            <FlatButton
                label="提交"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.submitTodo} />
        ]
    },
    errorActions (){
        return [
            <FlatButton
                label="知道了"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleErrorClose} />
        ]
    },

    submitTodo (){
        let todos = JSON.parse(window.localStorage.getItem('todos'));
        todos.push(this.state.todo);
        this.setState({
            todo: '',
            dialogOpen: false
        });
        window.localStorage.setItem('todos', JSON.stringify(todos));
        //window.location.reload();
    },

    handleOpen () {
        this.setState({dialogOpen: true});
    },

    handleClose (){
        this.setState({dialogOpen: false});
    },
    handleEnterSubmit (event){
        console.log(event.keyCode);
        if(event.keyCode == 13){
            if(this.state.todo.length === 0){
                this.setState({
                    error: !this.state.error
                })
            }
            else {
                if(this.state.dialogOpen){
                    this.submitTodo();
                }
                else {
                    this.submitHandler();
                }
            }
        }
        else {
            //Do Nothing
        }
    },

    submitHandler (){
        this.handleOpen();
    },
    handleErrorClose (){
        this.setState({
            error: false
        })
    },
    render (){
        return (
            <div onKeyDown={this.handleEnterSubmit} className="addTodo-container">
                <h1 className="addTodo-title text-center">添加任务</h1>
                {
                    <div className={"input-container" + (this.state.modified ? '-modified' : '')}>
                        <TextField
                            value={this.state.todo}
                            hintText="请输入任务内容"
                            onChange={this._handleInputChange}
                            style={{width: '500px'}}
                        />
                        {
                            this.state.modified &&
                            <div className="addTodo-submit-container">
                                <RaisedButton
                                    onTouchTap={this.submitHandler}
                                    label="提交任务"
                                    secondary={true}
                                />
                            </div>
                        }
                    </div>
                }
                <Dialog
                    title="确认提交"
                    actions={this.actions()}
                    modal={true}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleClose}
                >
                    确认提交任务吗?
                </Dialog>
                <Dialog
                    title="错误信息"
                    actions={this.errorActions()}
                    modal={true}
                    open={this.state.error}
                    onRequestClose={this.handleErrorClose}
                >
                    任务信息不可以为空!
                </Dialog>
            </div>
        )
    }
});

export default AddTodo;