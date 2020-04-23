import React from 'react';
//connect imports the store to you component
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

//add export here for snapshot testing
export const ExpenseList = (props) => {
  return (
    <div className="content-container">
      <div className="list-header">
        <div className="show-for-mobile">Expenses</div>
        <div className="show-for-desktop">Expense</div>
        <div className="show-for-desktop">Amount</div>
      </div>
      <div className="list-body">
      {
        props.expenses.length === 0 ? (

          <div className="list-item list-item--message">
             <span>No Expenses</span>
          </div>
          
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


