/**
 * Created by wujianbo on 15/12/4.
 */
import React from 'react';
const Heart = React.createClass({
    render (){
        return(
            <i  onClick={this.props.onClick || function(){}} style={{color: 'red'}} className="fa fa-heart pointer"> </i>
        )
    }
});
export default Heart;