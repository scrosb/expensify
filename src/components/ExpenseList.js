import React from 'react';
//connect imports the store to you component
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

//add export here for snapshot testing
export const ExpenseList = (props) => {
  return (
    <div>
      {
        props.expenses.length === 0 ? (
          <p>No Expenses</p>
        ) : (
          props.expenses.map((expense) => 
          (
          <ExpenseListItem
          key={expense.id}
          {...expense}
          />
          )
        )
        )
      }
    </div>
)};


//passing application state to props using connect
//as the store changes this will automatically rerender
const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
}


export default connect(mapStateToProps)(ExpenseList);


