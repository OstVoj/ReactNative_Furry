import { geoLocation } from 'src/components/GeoLocation/reducer'
import { apiDetector } from 'src/components/ApiDetector/reducer'
import { placeReaOwnershipReducers } from 'src/containers/PlaceReqOwnership/reducer'

export const AppReducers = {
  apiDetector,
  ...placeReaOwnershipReducers,
  geoLocation
}
