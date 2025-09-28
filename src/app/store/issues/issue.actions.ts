import { createAction, props } from '@ngrx/store';
import { Issue } from '../../models/issue.model';

export const loadIssues = createAction('[Issue] Load Issues');
export const loadIssuesSuccess = createAction('[Issue] Load Issues Success', props<{ issues: Issue[] }>());
export const loadIssuesFailure = createAction('[Issue] Load Issues Failure', props<{ error: string }>());

export const addIssue = createAction('[Issue] Add Issue', props<{ issue: Issue }>());
export const addIssueSuccess = createAction('[Issue] Add Issue Success', props<{ issue: Issue }>());
export const addIssueFailure = createAction('[Issue] Add Issue Failure', props<{ error: string }>());

export const updateIssue = createAction('[Issue] Update Issue', props<{ issue: Issue }>());
export const updateIssueSuccess = createAction('[Issue] Update Issue Success', props<{ issue: Issue }>());
export const updateIssueFailure = createAction('[Issue] Update Issue Failure', props<{ error: string }>());

export const deleteIssue = createAction('[Issue] Delete Issue', props<{ id: number }>());
export const deleteIssueSuccess = createAction('[Issue] Delete Issue Success', props<{ id: number }>());
export const deleteIssueFailure = createAction('[Issue] Delete Issue Failure', props<{ error: string }>());
