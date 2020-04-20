import uuid from 'uuid';
import database from '../firebase/firebase';

//component calls action generator
//action generator returns object
//component dispatches object
//redux store changes.

//component calls action generator
//action generator returns function
//component dispatches function
//function runs

//YOU MUST PASS IN A OBJECT TO A FUNCTION THAT TAKES AN OBJECT, YOU WON'T GET ANY ERRORS OTHERWISE


//ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {

    const uid = getState().auth.uid;
    const {
      description = '', 
      note = '', 
      amount=0, 
      createdAt = 0 
    } = expenseData;

    const expense = {
      description,
      note, 
      amount,
      createdAt
    }

    //save expense to the database then dispatch the action causing a redirect
    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
      dispatch(addExpense({
        id:ref.key,
        ...expense
      }))
    })
  };
}


//REMOVE_EXPENSE takes an OBJECT!!!!!!

export const removeExpense = ({id} = {}) => ({
  type:'REMOVE_EXPENSE',
  id
});

//Remove from state and database

export const startRemoveExpense = ({id} = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }));
    });
  }
}



//EDIT_EXPENSE

export const editExpense = (id, updates) => ({
  type:'EDIT_EXPENSE',
  id,
  updates
});


//startEditExpense

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates));
    })
    // database.ref().update({
    //   'job/company':'Amazon',
    //   stressLevel:9,
    //   'location/city':'Seattle'
    // }).then(() => {
    //   console.log('company, city, stress updated')
    // }).catch((e) => {
    //   console.log('Errors: ', e);
    // })
  }
}

//SET_EXPENSES

export const setExpenses = (expenses) => ({
  type:'SET_EXPENSES',
  expenses
})

//this will fetch the data, then call setExpenses

export const startSetExpenses = () => {
  return (dispatch, getState) => {

    const uid = getState().auth.uid;

    //return a promise
    return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
          const expenses = [];
          snapshot.forEach((childSnapshot) => {
            expenses.push({
              id:childSnapshot.key,
              ...childSnapshot.val()
            })
          })
          //add expenses to the state
          dispatch(setExpenses(expenses));
    });
  };
};
