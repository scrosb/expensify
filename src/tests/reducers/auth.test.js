import authReducer from '../../reducers/auth';


test('should set default state', () => {
  const state = authReducer(undefined, {type:'@@INIT'});
  expect(state).toEqual({});
});

test('should set uid on login', () => {

  const action ={
    type:'LOGIN',
    uid: '2342346234k6jb23k4'
  }

  const state = authReducer({}, action)
  expect(state).toEqual({uid: action.uid});
});

test('should clear uid on logout', () => {
  const logoutAction = {
    type: 'LOGOUT'
  }

  //set a fake state
  const updatedState = authReducer({uid:'2346234643'}, logoutAction);
  expect(updatedState).toEqual({});
})

