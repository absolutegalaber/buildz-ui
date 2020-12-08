import {createAction, props} from '@ngrx/store';
import {IProjectsResponse} from './model';

export const loadProjects = createAction('LOAD-PROJECTS')
export const projectsLoaded = createAction('PROJECTS-LOADED', props<{ projectsResponse: IProjectsResponse }>())
export const toggleInactiveProjectsVisible = createAction('TOGGLE-INACTIVE-PROJECTS-VISIBLE')
export const selectProject = createAction('SELECT-PROJECT', props<{ projectName: string }>())
export const selectBranch = createAction('SELECT-BRANCH', props<{ branchName: string }>())
export const toggleCurrentProjectActive = createAction('TOGGLE-CURRENT-PROJECT-ACTIVE')
export const toggleCurrentBranchActive = createAction('TOGGLE-CURRENT-BRANCH-ACTIVE')
