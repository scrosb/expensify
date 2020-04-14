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

import {addExpense, removeExpense, editExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

const store = configureStore();

// store.subscribe(() => {
//   const state = store.getState();
//   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
//   console.log(visibleExpenses);
// })


//addExpense -> Water Bill
store.dispatch(addExpense({description: 'Water Bill', amount: 4500, createdAt: 4500}));
//addExpense -> Gas Bill
store.dispatch(addExpense({description: 'Gas Bill', amount: 600000, createdAt: 1000}));
store.dispatch(addExpense({description: 'Rent', amount: 109500}));

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
