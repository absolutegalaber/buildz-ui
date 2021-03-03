import {projectsReducer} from './projects.reducer';
import {buildStatsReducer} from './build-stats.reducer';
import {buildSearchReducer} from './build-search.reducer';
import {environmentReducer} from './environment.reducer';
import {alertReducer} from './alert.reducer';
import {serverReducer} from './server.reducer';

export interface Buildz {
  alert: IAlert
  projects: IProjects
  environments: IEnvironments
  stats: IBuildStats
  builds: IBuilds
  servers: IServersState;
}

export const buildzReducers = {
  alert: alertReducer,
  projects: projectsReducer,
  environments: environmentReducer,
  stats: buildStatsReducer,
  builds: buildSearchReducer,
  servers: serverReducer
};

// Base interfaces
/**
 * An interface that includes all
 * information that every "Search Result"
 * object should have
 */
export interface IBaseSearchResult {
  page: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * An interface that includes all
 * information that should be included
 * in every "Search Parameters" object
 */
export interface IBaseSearchParams {
  pageSize?: number;
  page?: number;
  sortAttribute?: string;
  sortDirection?: string;
}

// Build related interfaces
export interface IBuilds {
  search: IBuildSearchParams
  result: IBuildSearchResult
}

export interface IBuildSearchParams extends IBaseSearchParams {
  project?: string;
  branch?: string;
  minBuildNumber?: number;
  maxBuildNumber?: number;
  labels?: any;
}

export interface IBuildSearchResult extends IBaseSearchResult {
  builds: IBuild[];
}

export interface IBuildLabel {
  key: string
  value: string
}

export interface IArtifactBuildLabel {
  projectName: string
  key: string
  value: string
}

export interface IBuild {
  id: number
  project: string
  branch: string
  buildNumber: number
  labels: any
}

export interface IProjects {
  projects: IProject[]
  projectBranches: { [key: string]: IBranch[] }
  labelKeys: string[]
  inactiveIncluded: boolean
  currentProject?: IProject
  currentBranch?: IBranch
}

export interface IProject {
  name: string
  active: boolean
}

export interface IBranch {
  name: string
  active: boolean
}

export interface IProjectBranch {
  projectName: string
  branchName: string
  active: boolean
}

export interface IProjectsResponse {
  projects: IProject[]
  projectBranches: { [key: string]: IBranch[] }
  labelKeys: string[]
}

export interface IProjectWithBranches {
  project: IProject
  branches: IBranch[]
}

export interface ISelectedProjectAndBranch {
  project: IProject
  branch: IBranch
}

export interface IBuildStats {
  numberOfBuilds: number
  numberOfLabels: number;
  numberOfDeploys: number;
}

export interface IEnvironments {
  knownEnvironments: string[]
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

export interface IAlert {
  type: string
  heading: string
  message: string
}

export interface IAlertMessage {
  heading: string
  message: string
}

// Interfaces related to Server(s)
/**
 * A State interface that represents all Server related State data
 */
export interface IServersState {
  knownServers: IServer[];
  currentServer?: IServer;
}

/**
 * A view interface that represents a specific Server
 */
export interface IServer {
  id: number;
  name: string;
  deploysSearch: IBaseSearchParams;
  deploysResult: IDeploySearchResult;
  reservation?: IReservation;
}

// Interfaces related to Reservation(s)
/**
 * A view interface that represents a specific Server Reservation
 */
export interface IReservation {
  by: string;
  note: string;
}


/**
 * An event interface that contains all data needed to reserve a server
 */
export interface ICreateReservationEvent {
  serverName: string;
  reservation: {
    reservedBy: string;
    reservationNote: string;
  };
}

// Interfaces related to Deploy(s)
/**
 * A view interface that represents a specific Deploy
 */
export interface IDeploy {
  id: number;
  deployedAt: Date;
  build: IDeployBuild;
  labels: any;
}

/**
 * A view interface that represents a Build related to a Deploy
 */
export interface IDeployBuild {
  id: number;
  project: string;
  branch: string;
  buildNumber: number;
}

/**
 * A view interface that represents a label which is meant to be associated to a specific Deploy
 */
export interface IDeployLabel {
  key: string;
  value: string;
}

/**
 * A Search Result interface that encapsulates all info related
 * to the results of a Deploy search
 */
export interface IDeploySearchResult extends IBaseSearchResult {
  deploys?: IDeploy[];
}
