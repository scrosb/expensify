//Testing Actions
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, editExpense, removeExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([
  thunk
])
test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc'});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id:'123abc'
  })
});

test('should setup edit expense action object', () => {
  const editAction = editExpense('123abc', {note: 'New Note Value'})

  expect(editAction).toEqual({
    type:'EDIT_EXPENSE',
    id:'123abc',
    updates:{note:'New Note Value'}
  });
});

//default and given value tests for add Expense

test('should setup add expense action object with provided values', () =>{
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  })
});

test('should add expense to database and store', (done) => {
    const store = createMockStore();
    const expenseData = {
      description:'Mouse',
      amount:3000,
      note:'this one is better',
      createdAt:1000
    }

    //use fake store to dispatch async action
    store.dispatch(startAddExpense(expenseData)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type:'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      })

      //make an assertion about the value returned from the expense
      //return a promise to addon promise chaining
      return database.ref(`expenses/${actions[0].expense.id}`).once('value')
      
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    })
})


test('should add expense with defaults to database and store', () => {
  const store = createMockStore();
    const expenseDefaults = {
      description:'',
      amount:0,
      note:'',
      createdAt:0
    }

    //use fake store to dispatch async action
    store.dispatch(startAddExpense({})).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type:'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseDefaults
        }
      })

      //make an assertion about the value returned from the expense
      //return a promise to addon promise chaining
      return database.ref(`expenses/${actions[0].expense.id}`).once('value')
      
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    }).catch(e => {
      console.log(e);
    })
})


// test('should setup add expense action object with default values', () => {
//     const action = addExpense();

//     expect(action).toEqual({
//       type:'ADD_EXPENSE',
//       expense:{
//         description: '',
//         note:'',
//         amount:0,
//         createdAt:0,
//         id:expect.any(String)
//       }
//     });
// });


