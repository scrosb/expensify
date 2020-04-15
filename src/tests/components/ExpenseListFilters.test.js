import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
  <ExpenseListFilters
    filters={filters}
    setTextFilter={setTextFilter}
    sortByDate={sortByDate} 
    sortByAmount={sortByAmount}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
  />)
})


test('should render expense list filters correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should render expense list filters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  })
  expect(wrapper).toMatchSnapshot()
})

test('should handle a text change', () => {
  const value = 'Rent'
  wrapper.find('input').at(0).simulate('change', {
    target:{value}
  });
  
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort By date' ,() => {
  const value = 'date'
  wrapper.find('select').at(0).simulate('change', {
    target:{value}
  });

  expect(sortByDate).toHaveBeenCalled();
})

test('should handle sort by amount', () => {
  const value = 'amount'
  wrapper.find('select').at(0).simulate('change', {
    target:{value}
  });

  expect(sortByAmount).toHaveBeenCalled();
})

test('should handle date changes', () => {

  const startDate = moment(0).add(4, 'years');
  const endDate = moment(0).add(8, 'years');
  wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate})
  expect(setStartDate).toHaveBeenCalledWith(startDate);
  expect(setEndDate).toHaveBeenCalledWith(endDate);
})  

test('should handle focus changes', () =>{
  const calendarFocused= 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);

  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
})