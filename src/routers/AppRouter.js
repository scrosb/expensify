import React from 'react';
import { Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
//Link allows client side routing not server side routing

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
      <div>
            <Switch>
            <PublicRoute path='/' component={LoginPage} exact={true} />
            <PrivateRoute path='/dashboard' component={ExpenseDashboardPage} exact={true}/>
            <PrivateRoute path='/create' component={AddExpensePage} />
            <PrivateRoute path='/edit/:id' component={EditExpensePage} />
            <Route component={NotFoundPage} />
            </Switch>
      </div>
  </Router>
);

// We have to make a tweak to our dev server and send back index.html for all routes in webpack config
//Use Switch to setup a 404 not found page
export default AppRouter;

