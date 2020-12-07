import {Build} from '../../service/domain';
import {projectsReducer} from './projects.reducer';
import {buildStatsReducer} from './build-stats.reducer';
import {buildSearchReducer} from './build-search.reducer';
import {environmentReducer} from './environment.reducer';

export interface Buildz {
  projects: IProjects
  environments: IEnvironments
  stats: IBuildStats
  builds: IBuilds
}

export const buildzReducers = {
  projects: projectsReducer,
  environments: environmentReducer,
  stats: buildStatsReducer,
  builds: buildSearchReducer
}

export interface IBuilds {
  search: IBuildSearchParams
  result: IBuildSearchResult
}

export interface IBuildSearchParams {
  project?: string
  branch?: string
  minBuildNumber?: number
  maxBuildNumber?: number
  labels?: any
  pageSize?: number
  page?: number
  sortAttribute?: string
  sortDirection?: string
}

export interface IBuildSearchResult {
  builds: Build[]
  page: number
  totalElements: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface IBuildLabel {
  key: string
  value: string
}

export interface IBuild {
  id: number
  project: string
  branch: string
  buildNumber: number
  labels: IBuildLabel[]
}

export interface IProjects {
  projects: string[]
  projectBranches: { [key: string]: string[] }
  labelKeys: string[]
  inactiveIncluded: boolean
  currentProject: string
  currentBranch: string
}

export interface IProjectsResponse {
  projects: string[]
  projectBranches: { [key: string]: string[] }
  labelKeys: string[]
}

export interface IProjectWithBranches {
  project: string
  branches: string[]
}

export interface ISelectedProjectAndBranch {
  project: string
  branch: string
}

export interface IBuildStats {
  environments: string[]
  numberOfBuilds: number
  numberOfLabels: number
}

export interface IEnvironments {
  currentEnvironmentName: string
  currentEnvironment: IEnvironment
  environmentBuilds: IEnvironmentBuilds
}

export interface IEnvironment {
  id?: number;
  name: string;
  artifacts: IArtifact[]
}

export interface IArtifact {
  id?: number,
  project: string,
  branch: string,
  labels: { [key: string]: string }
}

export interface IEnvironmentBuilds {
  environment: string
  builds: { [key: string]: IBuild }
}
