import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseSummary} from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';

test('should render ExpenseSummary', () => {
  const wrapper = shallow(<ExpenseSummary expenses={expenses}/>)

  expect(wrapper).toMatchSnapshot();
})

test('should render expense summary with no expenses', () => {
  const wrapper = shallow(<ExpenseSummary expenses={[]}/>)

  expect(wrapper).toMatchSnapshot();
})