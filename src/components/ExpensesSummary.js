import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';


// numeral(amount / 100).format('$0,0.00')
export class ExpensesSummary extends React.Component {
  //expense count
  //expenses total
  render(){
    return (
      <div className="page-header">
        <div className="content-container">
        {this.props.expenses.length=== 0 ? 'No Expenses Found':
        <h1 className="page-header__title">Viewing <span>{this.props.expenses.length}</span> expense(s) totaling &nbsp;
        <span>{numeral(selectExpensesTotal(this.props.expenses)/100).format('$0,0.00')}</span></h1>}
        <div className="page-header__actions">
          <Link className="button" to='/create'>Add Expense</Link>
        </div>
        </div>
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
