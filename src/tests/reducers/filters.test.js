import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('Should Setup default filter values', () => {
  const state = filtersReducer(undefined, {type:'@@INIT'});

  //returns default state
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('Should set Sortby to amount', () => {
  const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'})

  expect(state.sortBy).toBe('amount');

})

test('Should set sortBy to date', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  };

  const action = {type: 'SORT_BY_DATE'};
  const state = filtersReducer(currentState, action);

  expect(state.sortBy).toBe('date');

})

test('Should set text filter', () => {

  const action = {type: 'SET_TEXT_FILTER', text:'test'}
  const state = filtersReducer(undefined, action);

  expect(state.text).toBe('test');
})

test('Should set Start date', () => {

  const action = {type: 'SET_START_DATE', startDate:moment(0).startOf('day')}
  const state = filtersReducer(undefined, action);

  expect(state.startDate).toEqual(moment(0).startOf('day'));
})


test('Should set End date', () => {

  const action = {type: 'SET_END_DATE', endDate:moment(0).startOf('day')}
  const state = filtersReducer(undefined, action);

  expect(state.endDate).toEqual(moment(0).startOf('day'));
})
