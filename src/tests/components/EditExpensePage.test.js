import React from 'react';
import {shallow} from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';


let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = {push: jest.fn()};
  wrapper = shallow(<EditExpensePage 
    startEditExpense={startEditExpense} 
    startRemoveExpense={startRemoveExpense} 
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
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id,expenses[2]);
});


test('should remove an expense', () => {
  //simulate click on the remove button
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenCalledWith('/');
  expect(startRemoveExpense).toHaveBeenLastCalledWith({id:expenses[2].id});
});

