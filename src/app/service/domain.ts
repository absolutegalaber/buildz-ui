export interface BuildStats {
  projects: string[];
  environments: string[];
  numberOfBuilds: number;
  numberOfLabels: number;
}

export interface BuildLabel {
  key: string;
  value: string;
}

export interface BuildSearch {
  project?: string;
  branch?: string;
  minBuildNumber?: number;
  maxBuildNumber?: number;
  labels?: BuildLabel[];
  pageSize?: number;
  page?: number;
  sortAttribute?: string;
  sortDirection?: string;
}

export const DEFAULT_BUILD_SEARCH: BuildSearch = {
  page: 0,
  pageSize: 10,
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

