import * as services from '../../services/projects';
import * as types from './actionTypes';

export function getAllProjects() {
    return dispatch => {
        services.getAllProjects()
            .then(res => res.json())
            .then(json => {
              dispatch({ type: types.ALL_PROJECTS_FETCHED, projects: json.projects });
            });
    }
}
