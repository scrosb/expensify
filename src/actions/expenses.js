import uuid from 'uuid';

//YOU MUST PASS IN A OBJECT TO A FUNCTION THAT TAKES AN OBJECT, YOU WON'T GET ANY ERRORS OTHERWISE


//ADD_EXPENSE
export const addExpense = ({ 
  description = '', 
  note = '', 
  amount=0, 
  createdAt = 0 
  } = {}
  ) => ({
  type: 'ADD_EXPENSE',
  expense:{
    id:uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

//REMOVE_EXPENSE takes an OBJECT!!!!!!

export const removeExpense = ({id} = {}) => ({
  type:'REMOVE_EXPENSE',
  id
})
//EDIT_EXPENSE

export const editExpense = (id, updates) => ({
  type:'EDIT_EXPENSE',
  id,
  updates
})