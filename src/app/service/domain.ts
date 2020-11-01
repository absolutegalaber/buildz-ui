export interface BuildStats {
  projects: string[];
  branches: string[];
  environments: string[];
  labelKeys: string[];
  numberOfBuilds: number;
  numberOfLabels: number;
}

export interface BuildLabel {
  key: string;
  value: string;
}

export interface SearchLabel {
  key: string;
  value: string;
}

export interface ArtifactSearchLabel {
  projectName: string;
  key: string;
  value: string;
}

export interface BuildSearch {
  project?: string;
  branch?: string;
  minBuildNumber?: number;
  maxBuildNumber?: number;
  labels?: any;
  pageSize?: number;
  page?: number;
  sortAttribute?: string;
  sortDirection?: string;
}

export const DEFAULT_BUILD_SEARCH: BuildSearch = {
  project: '',
  branch: '',
  page: 0,
  pageSize: 10,
  labels: {},
  sortAttribute: 'buildNumber',
  sortDirection: 'DESC'
}

export interface Build {
  id: number;
  project: string;
  branch: string;
  buildNumber: number;
  labels: BuildLabel[];
}

export interface BuildSearchResult {
  builds: Build[];
  page: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export const EMTPY_BUILD_SEARCH_RESULT = {
  builds: [],
  page: 0,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,
  hasPrevious: false
}

export interface Artifact {
  id?: number,
  project: string,
  branch: string,
  labels: { [key: string]: string }
}

export interface Environment {
  id: number;
  name: string;
  artifacts: Artifact[];
}

export const EMPTY_ENVIRONMENT: Environment = {
  id: null,
  name: '',
  artifacts: []
}

export interface EnvironmentBuilds {
  environment: string;
  builds: { [key: string]: Build };
}

export const EMPTY_ENVIRONMENT_BUILDS: EnvironmentBuilds = {
  environment: '',
  builds: {}
}

export interface Alert {
  type: string;
  heading: string;
  message: string;
}
