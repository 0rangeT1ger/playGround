/**
 * Created by wujianbo on 15/12/2.
 */
import React from 'react';
import { Router, Route, Redirect } from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import Main from './components/Main/Main.react.jsx';
import PersonFlow from './components/PersonFlow/PersonFlow.react.jsx';
import SignInForm from './components/SignInForm/SignInForm.react';
import PersonIndex from './components/PersonPage/PersonPage.react';

const history = createHistory({
    queryKey: false
});
const AppRouter = React.createClass({
    render () {
        return (
            <Router history={history}>
                <Redirect from='/' to='/main' />
                <Route path='/main' component={Main}> </Route>
                <Route path='/personFlow' component={PersonFlow}> </Route>
                <Route path='/signIn' component={SignInForm}> </Route>
                <Route path='/form' userInfo={this.props.userInfo} component={SignInForm}> </Route>
                <Route path='/personIndexPage(/:reportId)' component={PersonIndex}> </Route>
            </Router>
        )
    }
});

export default AppRouter;