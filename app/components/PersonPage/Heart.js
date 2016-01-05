/**
 * Created by wujianbo on 15/12/4.
 */
import React from 'react';
const Heart = React.createClass({
    render (){
        return(
            <i onClick={this.props.onClick || function(){}} className="fa fa-heart-o pointer"> </i>
        )

    }
});
export default Heart;