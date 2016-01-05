/**
 * Created by wujianbo on 15/12/4.
 */
import React from 'react';
const Tag = React.createClass({
    getDefaultProps (){
        return {
            text: '',
            number: 0,
            onClick: function(){}
        }
    },
    getInitialState (){
        return{
            number: parseInt(this.props.number),
            clicked: false
        }
    },
    componentWillReceiveProps (_nextProps){
        this.setState({
            number: _nextProps.number
        })
    },
    onClick (ev){
        this.setState({
            number:  this.state.clicked ? this.state.number - 1 : this.state.number + 1,
            clicked: !this.state.clicked
        });
        this.props.onClick();
    },
    render (){
        return (
            <div className={"tag " + (this.state.clicked ? 'clicked' : '')} onClick={this.onClick}>{this.props.text} <span className="totalNumber">{this.state.number}</span></div>
        )
    }
});
export default Tag;