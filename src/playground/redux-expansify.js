import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

//ADD_EXPENSE

const addExpense = ({ 
  description = '', 
  note = '', 
  amount=0, 
  createdAt = 0 
  } = {}
  ) => ({
  type: 'ADD_EXPENSE',
  expense:{
    id:uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

//REMOVE_EXPENSE

const removeExpense = ({id} = {}) => ({
  type:'REMOVE_EXPENSE',
  id
})
//EDIT_EXPENSE

const editExpense = (id, updates) => ({
  type:'EDIT_EXPENSE',
  id,
  updates
})
//SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})
//SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})
//SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})

//SET_START_DATE

const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate
})
//SET_END_DATE
const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate
})
//Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch(action.type){
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({id}) => id !== action.id)
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if(expense.id === action.id){
          return {
            ...expense,
            //override the previous expense object with the object spread operator
            ...action.updates
          }
        } else {
          return expense
        }
      })
    default:
      return state
  }
}

//FiltersReducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date', //date or amount
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state=filtersReducerDefaultState, action) => {
  switch(action.type){
    case 'SET_TEXT_FILTER':
      return {
        ...state, 
        text: action.text
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy:'date'
      }
    case 'SORT_BY_AMOUNT':
      return {  
        ...state,
        sortBy:'amount'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state
    }
} 

//timestamps (milliseconds)
//January 1st, 1970 (unix epoch)
//33400, 10, -203


//Get Visible Expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((expense) => {
    //true if not a number, only if start date is a number do we want to filter
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    //figure out if expenses.description as the text variable string inside of it
    //includes
    //convert both strings to lowercase

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b) => {
    if(sortBy === 'date'){
      //sort by created At
      return a.createdAt < b.createdAt ? 1 : -1
    }

    if(sortBy === 'amount'){
      return a.amount < b.amount ? 1:-1;
    }
  })
}
//Store Creation

const store = createStore(
  //use combine reducers to combine 2 reducers
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses);
})

//get the id from returned state
const expense1 = store.dispatch(addExpense({description: 'Rent', amount: 100, createdAt: -21000}));
const expense2 = store.dispatch(addExpense({description: 'Coffee', amount: 300, createdAt:-1000}));


// store.dispatch(setTextFilter('Rent'));
// store.dispatch(removeExpense({id:expense1.expense.id}));
// store.dispatch(editExpense(expense2.expense.id, {amount: 500}))
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount()); //amount
// store.dispatch(sortByDate());  //date

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));
// store.dispatch(setEndDate());



const demoState = {
  expenses: [{
    id: 'asdfasdfasdf',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', //date or amount
    startDate: undefined,
    endDate: undefined
  }
};

const user = {
  name: 'Silas',
  age: 24
}

// console.log({...user, age:27});