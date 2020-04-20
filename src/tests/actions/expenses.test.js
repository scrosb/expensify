//Testing Actions
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, 
  addExpense, 
  editExpense,
  startEditExpense,
  removeExpense, 
  setExpenses, 
  startSetExpenses, 
  startRemoveExpense

} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';

const defaultAuthState = { auth: {uid }}

const createMockStore = configureMockStore([
  thunk
])

beforeEach((done) => {
  const expensesData = {};

  expenses.forEach(({id, description, note, amount, createdAt}) => {
    //format for firebase using es6 object
    expensesData[id] = {description, note, amount, createdAt};
  })

  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
})


test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc'});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id:'123abc'
  })
});



test('should remove expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;

  store.dispatch(startRemoveExpense({id})).then(() => {
    const actions = store.getActions();
    //make sure data was deleted in state
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    })
    //make sure data was deleted in firebase
    return database.ref(`users/${uid}/expenses/${id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
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

test('should edit expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const updatedExpense = {
    description:'Not Rent',
    note:'',
    amount:'1908884325.00',
    createdAt: 0
  }

  const id = expenses[0].id
  const updates = updatedExpense;

  store.dispatch(startEditExpense(id,updates)).then(() => {
    const actions = store.getActions();
    //make sure data was edited in state
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    })
    //make sure data was edited in firebase
    return database.ref(`users/${uid}/expenses/${id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(updatedExpense);
    done();
  })
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
    const store = createMockStore(defaultAuthState);
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
      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
      
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    }).catch(e => console.log(e));
})


test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
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
      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
      
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      //make sure to pass in done
      done();
    }).catch(e => {
      console.log(e);
    })
})


test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    })
    done();
  });
});



// test('should set expenses', (done) => {
//   //dispatch an action, create a mock store
//   //expect all expenses to be inside of the state, you should expect 
//   //any that might exist to be gone
//   //initial expenses.
//   const store = createMockStore({});
//   const initialExpense = {
//     description:'Initial Expense',
//     amount:1000,
//     note:'Init Expense',
//     createdAt:6000
//   }

//     //use fake store to dispatch async action and add expenses to database
//     store.dispatch(startAddExpense({})).then(() => {
//       const actions = store.getActions();
//       expect(actions[0]).toEqual({
//         type:'ADD_EXPENSE',
//         expense: {
//           id: expect.any(String),
//           ...initialExpense
//         }
//       });
//     })

//     store.dispatch(setExpenses({})).then(() => {
//       const actions = store.getActions();
//       expect(actions[0]).toEqual({
//         type:'SET_EXPENSES',
//         expenses: {
//           id: expect.any(String),
//           ...initialExpense
//         }
//       })
//       //make an assertion about the value returned from the expense
//       //return a promise to addon promise chaining
//       return database.ref(`expenses/${actions[0].expense.id}`).once('value')
      
//     })
// })

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


