import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOT_PENDING,
  REQUEST_ROBOT_SUCCESS,
  REQUEST_ROBOT_FAILED
} from './constants';

const initialState = {
  searchField: ''
};

export const searchRobots = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      return Object.assign({}, state, { searchField: action.payload });
    default:
      return state;
  }
};

const initialStateRobots = {
  isPending: false,
  robots: [],
  error: ''
};
export const requestRobots = (state = initialStateRobots, action = {}) => {
  switch (action.type) {
    case REQUEST_ROBOT_PENDING:
      return { ...state, isPending: true };
    case REQUEST_ROBOT_SUCCESS:
      return { ...state, isPending: false, robots: action.payload };
    case REQUEST_ROBOT_FAILED:
      return { ...state, isPending: false, error: action.payload };
    default:
      return state;
  }
};
