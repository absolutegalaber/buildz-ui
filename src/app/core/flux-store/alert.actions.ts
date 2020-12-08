import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {IAlertMessage} from './model';

export const backendErrorOccurred = createAction('BACKEND-ERROR-OCCURRED', props<{ errorResponse: HttpErrorResponse }>())
export const frontendInfo = createAction('FRONTEND-INFO', props<{ alertMessage: IAlertMessage }>())
export const frontendError = createAction('FRONTEND-ERROR', props<{ alertMessage: IAlertMessage }>())
export const clearAlert = createAction('CLEAR-ALERT')
