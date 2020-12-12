import {createAction, props} from '@ngrx/store';
import {IBranch, IProject, IProjectBranch, IProjectsResponse} from './model';

export const loadProjects = createAction('LOAD-PROJECTS')
export const projectsLoaded = createAction('PROJECTS-LOADED', props<{ projectsResponse: IProjectsResponse }>())
export const toggleInactiveProjectsVisible = createAction('TOGGLE-INACTIVE-PROJECTS-VISIBLE')
export const selectProject = createAction('SELECT-PROJECT', props<{ project: IProject }>())
export const selectBranch = createAction('SELECT-BRANCH', props<{ branch: IBranch }>())
export const setProjectActive = createAction('SET-PROJECT-ACTIVE', props<{ project: IProject }>())
export const setProjectBranchActive = createAction('SET-PROJECT-BRANCH-ACTIVE', props<{ projectBranch: IProjectBranch }>())
