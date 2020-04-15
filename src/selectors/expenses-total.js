//Get Total of all amounts

export default (expenses = 0) => {
  if(expenses.length === 0){
    return 0;
  } else if (expenses.length !== 0) {
    const amounts = expenses.map(expense => expense.amount);
    const reducer = (a, b) => a + b;
   return amounts.reduce(reducer);
  } 
}