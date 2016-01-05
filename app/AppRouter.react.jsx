/**
 * Created by wujianbo on 15/12/2.
 */
import React from 'react';
import { Router, Route, Redirect } from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import Main from './components/Main/Main.react.jsx';

const history = createHistory({
    queryKey: false
});
const AppRouter = React.createClass({
    render () {
        return (
            <Router history={history}>
                <Redirect from='/' to='/main' />
                <Route path='/main' component={Main}> </Route>
            </Router>
        )
    }
});

export default AppRouter;