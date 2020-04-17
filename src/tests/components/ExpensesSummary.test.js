import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render ExpensesSummary', () => {
  const wrapper = shallow(<ExpensesSummary expenses={expenses}/>)

  expect(wrapper).toMatchSnapshot();
})

test('should render expense summary with no expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenses={[]}/>)

  expect(wrapper).toMatchSnapshot();
})

test('should render expense summary with 1 expense', () => {
  const wrapper = shallow(<ExpensesSummary expenses={[expenses[1]]}/>)

  expect(wrapper).toMatchSnapshot();
})