import {IBuildStats} from './model'
import {createReducer, on} from '@ngrx/store'
import {buildStatsLoaded} from './build-stats.actions'

export const EMPTY_BUILD_STATS: IBuildStats = {
  numberOfLabels: 0,
  numberOfBuilds: 0,
  numberOfDeploys: 0
}

export const buildStatsReducerImpl = createReducer(
  EMPTY_BUILD_STATS,
  on(buildStatsLoaded, (state: IBuildStats, {stats}) => stats)
)

export function buildStatsReducer(state, action) {
  return buildStatsReducerImpl(state, action)
}
