import {createReducer, on} from '@ngrx/store'
import {IAlert} from './model'
import {backendErrorOccurred, clearAlert, frontendError, frontendInfo} from './alert.actions'

export const INITIAL_ALERT: IAlert = {
  message: '',
  heading: '',
  type: ''
}
export const alertReducerImpl = createReducer(
  INITIAL_ALERT,
  on(backendErrorOccurred, (state: IAlert, {errorResponse}) => {
    if (!!errorResponse?.error) {
      return {
        type: 'danger',
        heading: errorResponse.error.description,
        message: errorResponse.error.message
      }
    } else {
      return {
        type: 'danger',
        heading: `Unexpected Error: ${errorResponse?.status}`,
        message: errorResponse?.statusText
      }
    }
  }),
  on(frontendInfo, (state: IAlert, {alertMessage}) => {
    return {
      type: 'info',
      heading: alertMessage.heading,
      message: alertMessage.message
    }
  }),
  on(frontendError, (state: IAlert, {alertMessage}) => {
    return {
      type: 'danger',
      heading: alertMessage.heading,
      message: alertMessage.message
    }
  }),
  on(clearAlert, (state) => INITIAL_ALERT)
)

export function alertReducer(state, action) {
  return alertReducerImpl(state, action)
}
