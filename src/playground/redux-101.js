import {createStore} from 'redux';

//Action Generators are functions that return action objects


//first argument is the current state
//increment By is the first object destructuring from the payload, 
// =1 is the default value and {} is the default object value
const incrementCount = ({incrementBy = 1} = {}) => ({
  type: 'INCREMENT',
  incrementBy: incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
  type: 'DECREMENT',
  decrementBy
})

const setCount = ({count} = {}) => ({
  type:'SET',
  count
})

const resetCount = () => ({
  type:'RESET'
})

//Reducers
//1. Reducers are Pure functions - the output is only determined by the input
//2. Never change state or action


let result;
const add = (a,b) => {
  result = a+b;
}


const countReducer = (state = {count: 0}, action) => {
  switch(action.type){
    case 'INCREMENT':
      //increment by a certain number if given
      return{
        count: state.count + action.incrementBy
      }
    case 'DECREMENT':
      return{
        count: state.count - action.decrementBy
      }
    case 'RESET':
      return{
        count: 0
      }
    case 'SET':
      return{
        count: action.count
      }
    default: 
      return state
  }
}


//the reducer is how we want to change the state based on an action

const store = createStore(countReducer);


//Actions - Object that gets sent to the store

//walk, stop_walking, sit, work, stop_working

//increment, decrement, reset

//I'd like to increment the count
//I'd like to reset the count to 0

//dispatchcalls the create store function

const unsuscribe =store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({incrementBy:30}))
store.dispatch(incrementCount({payload:30}))


//  store.dispatch({
//   type: 'INCREMENT',
//   incrementBy:5
// });

//unsuscribe by getting the return value from store.subscribe
// unsuscribe();

store.dispatch({
  type: 'RESET'
})

store.dispatch(decrementCount({decrementBy:10}));

 store.dispatch(incrementCount({ incrementBy: 30}));
 

store.dispatch({
  type: 'DECREMENT',
  decrementBy: 10
});


store.dispatch(setCount({count: 101}));
store.dispatch(resetCount());

//decrementBY

//this get called everytime the store changes.

