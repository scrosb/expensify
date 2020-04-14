//Get Visible Expenses
import moment from 'moment'

export default (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt);
    //true if not a number, only if start date is a number do we want to filter
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day'): true ;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day'):true
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    //figure out if expenses.description as the text variable string inside of it
    //includes
    //convert both strings to lowercase

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b) => {
    if(sortBy === 'date'){
      //sort by created At
      return a.createdAt < b.createdAt ? 1 : -1
    }

    if(sortBy === 'amount'){
      return a.amount < b.amount ? 1:-1;
    }
  })
}
//Store Creatio