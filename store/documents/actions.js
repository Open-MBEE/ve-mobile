import * as services from '../../services/documents';
import * as types from './actionTypes';

export function getViewDocumentationRecursively(projectId, documentId) {
    return dispatch => {
      services.getViewDocumentationRecursively(projectId, documentId)
        .then(content => {
          console.log(JSON.stringify(content))
          dispatch({ type: types.VIEW_DOCUMENTATION_RECURSIVELY_FETCHED, content  });
        })
    }
}

export function getDocuments(projectId) {
  return dispatch => {
      services.getDocuments(projectId)
          .then(res => res.json())
          .then(json => {
            dispatch({ type: types.DOCUMENTS_FETCHED, documents: json.documents });
          });
  }
}