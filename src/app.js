//install -> import -> use
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter'
import configureStore from './store/configureStore';
import {startSetExpenses} from './actions/expenses';
import {login, logout} from './actions/auth';
import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import {firebase} from './firebase/firebase';
import LoadingPage from './components/LoadingPage'

const store = configureStore();

let hasRendered = false;
const renderApp = () => {
  if(!hasRendered){
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
}

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);



//loading message
ReactDOM.render(<LoadingPage />, document.getElementById('app'));




//firebase authentication onAuth State Changed fires 
//when logout and login runs in auth.js actions
firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    console.log('uid', user.uid);
    store.dispatch(login(user.uid));
    //fetch the users expenses
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if(history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    //they will be on the loading screen indefinitely
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
})