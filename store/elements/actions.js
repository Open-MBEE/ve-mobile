import * as services from '../../services/elements';
import * as types from './actionTypes';
import eachSeries from 'async/eachSeries';

export function getExampleElement() {
  return dispatch => {
    services.getExampleElement()
      .then(res => res.json())
      .then(element => {
        dispatch({ type: types.EXAMPLE_ELEMENT_FETCHED, element });
      });
  }
}

export function getElement(projectId, elementId) {
  return dispatch => {
    services.getElement(projectId, elementId)
      .then(res => res.json())
      .then(json => {
        dispatch({ type: types.ELEMENT_FETCHED, element: json.elements[0] });
      });
  }
}

export function getElementWithChildViews(projectId, elementId) {
  return dispatch => {
    return services.getElement(projectId, elementId)
      .then(res => res.json())
      .then(json => {
        let element = json.elements[0];
        let childViewStubs = element._childViews;

        // Prepare array to hold full childView objects
        element._childViewsWith = [];

        // Get full childView objects in series (one after another, in order)
        eachSeries(childViewStubs, function(childViewStub, cb) {
          let childViewId = childViewStub.id;

          services.getElement(projectId, childViewId)
            .then(res => res.json())
            .then(json => {
              let childView = json.elements[0];
              element._childViewsWith.push(childView);
              cb();
            });
        }, function (err, results) {
          dispatch({ type: types.ELEMENT_WITH_CHILD_VIEWS_FETCHED, element })
        });
      });
  }
}
