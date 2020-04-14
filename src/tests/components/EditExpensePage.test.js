import React from 'react';
import {shallow} from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';


let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = {push: jest.fn()};
  wrapper = shallow(<EditExpensePage 
    editExpense={editExpense} 
    removeExpense={removeExpense} 
    history={history}
    expense={expenses[2]}
    />);
});

test('should render and edit expense page correctly', () => {
  expect(wrapper).toMatchSnapshot(); 
});

test('should edit expense on Submit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id,expenses[2]);
});


test('should remove an expense', () => {
  //simulate click on the remove button
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith({id:expenses[2].id});
});

