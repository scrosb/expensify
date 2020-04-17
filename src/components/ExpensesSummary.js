import React from 'react';
import {connect} from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';


// numeral(amount / 100).format('$0,0.00')
export class ExpensesSummary extends React.Component {
  //expense count
  //expenses total
  render(){
    return (
      <div>
        {this.props.expenses.length=== 0 ? 'No Expenses Found':
        <p>Viewing {this.props.expenses.length} expense(s) totaling &nbsp;
         { numeral(selectExpensesTotal(this.props.expenses)/100).format('$0,0.00')}</p>}
      </div>
    );
    }
}

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
}

export default connect(mapStateToProps)(ExpensesSummary);
