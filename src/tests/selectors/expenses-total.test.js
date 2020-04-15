import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

//Test Driven development

test('should get multiple expenses total', ()=> {
  const total = selectExpensesTotal(expenses);
  expect(total).toBe(114195);
})

test('should correctly add up a single expense', () => {
  const total = selectExpensesTotal([expenses[1]]);
  expect(total).toBe(expenses[1].amount);
})


test('should return 0 if expenses not provided', ()=> {
  const total = selectExpensesTotal([]);
  expect(total).toBe(0);
})



