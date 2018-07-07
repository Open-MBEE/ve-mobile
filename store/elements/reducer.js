import * as types from './actionTypes';

const initialState = {
  exampleElement: {},
  element: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.EXAMPLE_ELEMENT_FETCHED:
      return {
        ...state,
        exampleElement: action.element
      }
    case types.ELEMENT_FETCHED:
    case types.ELEMENT_WITH_CHILD_VIEWS_FETCHED: {
      return {
        ...state,
        element: action.element
      }
    }
    default:
      return state;
  }
}
