
import {login, logout} from '../../actions/auth.js';

test('should setup login action object', () => {
  let uid = '2346jbiyb2i236jhv26j'
  const action = login(uid);

  expect(action).toEqual({
    type:'LOGIN',
    uid:uid
  });
});

test('should setup logout for an action object', () => {
  const action = logout();

  expect(action).toEqual({
    type:'LOGOUT'
  });
})