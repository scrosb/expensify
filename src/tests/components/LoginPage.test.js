import React from 'react'
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import {LoginPage} from '../../components/LoginPage';

let wrapper, startLogin;

beforeEach(() => {
  startLogin = jest.fn();
  wrapper = shallow(<LoginPage/>)
});

test('should correctly render login page', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should start login on button click', () => {
  wrapper = shallow(<LoginPage startLogin={startLogin}/>)
  wrapper.find('button').simulate('click');
  expect(startLogin).toHaveBeenCalled();
})

//should call start logout on button click

//logi




