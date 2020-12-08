import {createReducer, on} from '@ngrx/store';
import {IProjects} from './model';
import {projectsLoaded, selectBranch, selectProject, toggleInactiveProjectsVisible} from './projects.actions';

export const INITIAL_PROJECTS: IProjects = {
  projects: [],
  projectBranches: {},
  labelKeys: [],
  inactiveIncluded: false,
  currentProject: '',
  currentBranch: ''
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
  on(selectProject, (state: IProjects, {projectName}) => {
    return {
      ...state, currentProject: projectName,
      branchesOf: state.projectBranches[projectName]
    }
  }),
  on(selectBranch, (state: IProjects, {branchName}) => {
    return {...state, currentBranch: branchName}
  })
)

export function projectsReducer(state, action) {
  return _projectsReducer(state, action)
}
