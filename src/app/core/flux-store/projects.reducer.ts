import {createReducer, on} from '@ngrx/store';
import {IProjects} from './model';
import {projectsLoaded, selectBranch, selectProject, toggleInactiveProjectsVisible} from './projects.actions';

export const INITIAL_PROJECTS: IProjects = {
  projects: [],
  projectBranches: {},
  labelKeys: [],
  inactiveIncluded: false,
}

export const _projectsReducer = createReducer(
  INITIAL_PROJECTS,
  on(projectsLoaded, (state: IProjects, {projectsResponse}) => {
    return {
      ...state,
      projects: projectsResponse.projects,
      projectBranches: projectsResponse.projectBranches,
      labelKeys: projectsResponse.labelKeys
    }
  }),
  on(toggleInactiveProjectsVisible, (state: IProjects) => {
    return {
      ...state,
      inactiveIncluded: !state.inactiveIncluded
    }
  }),
  on(selectProject, (state: IProjects, {project}) => {
    return {...state, currentProject: project}
  }),
  on(selectBranch, (state: IProjects, {branch}) => {
    return {...state, currentBranch: branch}
  })
)

export function projectsReducer(state, action) {
  return _projectsReducer(state, action)
}
