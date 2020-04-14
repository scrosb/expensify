import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense, removeExpense} from '../actions/expenses';

//refactor edit expense to be a class based component
//setup mapDispatchToProps, Editexpense and remove expense

//should render editexpense page
//snapshot

//should handle editExpense
//spies

//should handle removeexpense
//spies
export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/')
  }

  onRemove = () => {
    this.props.removeExpense({id: this.props.expense.id});
    this.props.history.push('/')
  }

  render(){
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    )
  }
}

//Remove expense via dispatch then redirect to dashboard pae

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(editExpense(id,expense)),
  removeExpense: (data) => dispatch(removeExpense(data))
})



export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);