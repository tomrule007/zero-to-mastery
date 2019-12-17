import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOT_PENDING,
  REQUEST_ROBOT_SUCCESS,
  REQUEST_ROBOT_FAILED
} from './constants.js';
export const setSearchField = text => {
  console.log(text);
  return {
    type: CHANGE_SEARCH_FIELD,
    payload: text
  };
};

export const requestRobots = () => dispatch => {
  dispatch({ type: REQUEST_ROBOT_PENDING });
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      //throw new Error('test');
      setTimeout(() => {
        dispatch({ type: REQUEST_ROBOT_SUCCESS, payload: users });
      }, 2000);
    })
    .catch(error => dispatch({ type: REQUEST_ROBOT_FAILED, payload: error }));
};
