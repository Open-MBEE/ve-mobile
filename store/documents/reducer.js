import * as types from './actionTypes';

const initialState = {
  content: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.VIEW_DOCUMENTATION_RECURSIVELY_FETCHED:
      return {
        ...state,
        content: action.content
      }
    case types.DOCUMENTS_FETCHED:
      return {
        ...state,
        documents: action.documents
      }
    default:
      return state;
  }
}
