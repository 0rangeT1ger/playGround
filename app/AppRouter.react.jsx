/**
 * Created by wujianbo on 15/12/2.
 */
import React from 'react';
import { Router, Route, Redirect } from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import Main from './components/Main/Main.react.jsx';
import AddTodo from './components/AddTodo/AddTodo.react.jsx';

const history = createHistory({
    queryKey: false
});
const AppRouter = React.createClass({
    render () {
        return (
            <Router history={history}>
                <Redirect from='/' to='/main' />
                <Route path='/main' component={Main}> </Route>
                <Route path="/add-todo" component={AddTodo}> </Route>
            </Router>
        )
    }
});

export default AppRouter;