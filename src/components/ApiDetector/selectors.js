import { createSelector } from 'reselect'

export const apiDetectorSelector = state => state.apiDetector

export const apiDetectorServersSelector = createSelector(apiDetectorSelector,
  apiDetector => apiDetector.servers
)
