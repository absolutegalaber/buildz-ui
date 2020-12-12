import {createAction, props} from '@ngrx/store';
import {IAlertMessage} from './model';
import {HttpErrorResponse} from '@angular/common/http';

export const backendErrorOccurred = createAction('BACKEND-ERROR-OCCURRED', props<{ errorResponse: HttpErrorResponse }>())
export const frontendInfo = createAction('FRONTEND-INFO', props<{ alertMessage: IAlertMessage }>())
export const frontendError = createAction('FRONTEND-ERROR', props<{ alertMessage: IAlertMessage }>())
export const clearAlert = createAction('CLEAR-ALERT')
