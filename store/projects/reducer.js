import * as types from './actionTypes';

const initialState = {
  projects: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.ALL_PROJECTS_FETCHED:
      return {
        ...state,
        projects: action.projects
      }
    default:
      return state;
  }
}
