import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startEditExpense, startRemoveExpense} from '../actions/expenses';

//refactor edit expense to be a class based component
//setup mapDispatchToProps, Editexpense and remove expense

//should render editexpense page
//snapshot

//should handle editExpense
//spies

//should handle startRemoveExpense
//spies
export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/')
  }

  onRemove = () => {
    this.props.startRemoveExpense({id: this.props.expense.id});
    this.props.history.push('/')
  }

  render(){
    return (
      <div>
        <div className="page-header">
            <div className="content-container">
              <h1 className="page-header__title">Edit Expense</h1>
            </div>
        </div>
          <div class="content-container">
            <ExpenseForm
              expense={this.props.expense}
              onSubmit={this.onSubmit}
            />
            <button className="button--secondary" onClick={this.onRemove}>Remove Expense</button>
          </div>
      </div>
    )
  }
}

//Remove expense via dispatch then redirect to dashboard pae

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id,expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
})



export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);