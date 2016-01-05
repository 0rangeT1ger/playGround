/**
 * Created by wujianbo on 15/12/2.
 */
import React from 'react';
import backEndURL from '../utils/backEndURL';
var Navbar = React.createClass({
    getInitialState (){
        return{
            activeIndex: this.props.activeIndex || (window.sessionStorage.getItem('navIndex') || 0),
            navItems: this.props.navItems
        }
    },
    getDefaultProps (){
        return{
            navItems: [

            ],
            reportId: 0
        }
    },
    clickNavHandler (ev){
        this.setState({
            activeIndex: ev.target.id.split('-')[1]
        });
        window.sessionStorage.setItem('navIndex', ev.target.id.split('-')[1]);
    },
    renderNavItems (itemList, activeIndex){
        return itemList.map( (item, index) => {
            if(index == activeIndex){
                return(
                    <li className="active"><a onClick={this.clickNavHandler} id={'nav-' + index} href={item.href}>{item.text}</a></li>
                )
            }
            else {
                return(
                    <li><a onClick={this.clickNavHandler} id={'nav-' + index} href={item.href}>{item.text}</a></li>
                )
            }
        })
    },
    render (){
        return(
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="javascript:;">TodoList</a>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            {this.renderNavItems(this.state.navItems, this.state.activeIndex)}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href={this.props.reportId !== 0 ? ('/#/personIndexPage/' + this.props.reportId)
                                                                   : ('/#/form')}>{this.props.userName}</a></li>
                            <li><a href={backEndURL + "/logout"}>登出</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
});

export default Navbar;