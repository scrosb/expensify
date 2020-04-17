//install -> import -> use
import React from 'react';
import ReactDOM from 'react-dom';
//Provider will allow us to provide the store to all our components that make up our application
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter'
//import redux store
import configureStore from './store/configureStore';

//import styles to load, we import normalize css to allow for same styles on IE, firefox, and Chrome
import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import './firebase/firebase';

const store = configureStore();

// store.subscribe(() => {
//   const state = store.getState();
//   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
//   console.log(visibleExpenses);
// })


//setTextFilter -> bill
// store.dispatch(setTextFilter('bill'));
//getVisibleExpenses

// setTimeout(() => {
//   store.dispatch(setTextFilter('bill'));
// }, 3000)

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));
