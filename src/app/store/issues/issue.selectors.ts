import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IssueState, selectAll } from './issue.reducer';

export const selectIssueState = createFeatureSelector<IssueState>('issues');

export const selectAllIssues = createSelector(selectIssueState, selectAll);
export const selectLoading = createSelector(selectIssueState, state => state.loading);
export const selectError = createSelector(selectIssueState, state => state.error);
