import {createAction, props} from '@ngrx/store'
import {IBuildStats} from './model'

export const loadBuildStats = createAction('LOAD-BUILD-STATS')
export const buildStatsLoaded = createAction('BUILD-STATS-LOADED', props<{ stats: IBuildStats }>())
