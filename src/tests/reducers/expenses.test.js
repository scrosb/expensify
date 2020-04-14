import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should set default state', () => {
  const state = expensesReducer(undefined, {type:'@@INIT'});
  expect(state).toEqual([]);
});

test('should remove expense by Id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }

  const state = expensesReducer(expenses,action);
  expect(state).toEqual([expenses[0],expenses[2]]);
})

test('should not remove expenses if Id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }

  const state = expensesReducer(expenses,action);
  expect(state).toEqual(expenses);
})

test('should add an expense', () => {
  const expense = expenses[1];

  const action = {
    type: 'ADD_EXPENSE',
    expense
  }

  const state = expensesReducer(undefined, action);

  expect(state).toEqual([expense])
})

test('should edit an expense', () => {

  const action = {
    type: 'EDIT_EXPENSE',
    id:'1',
    updates: {amount: 1950000}
  };

  const updatedState = expensesReducer(expenses, action);

  expect(updatedState[0].amount).toBe(1950000);

});

test('should not edit expense if expense not found', () => {

  const action = {
    type: 'EDIT_EXPENSE',
    id:'3500000',
    updates: {amount: 1950000}
  };

  let state = expensesReducer(expenses, action)

  expect(state).toEqual(expenses);

});










