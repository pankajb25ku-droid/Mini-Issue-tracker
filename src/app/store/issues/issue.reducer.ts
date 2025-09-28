import { createReducer, on } from '@ngrx/store';
import { Issue } from '../../models/issue.model';
import * as IssueActions from './issue.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface IssueState extends EntityState<Issue> {
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Issue> = createEntityAdapter<Issue>();

export const initialState: IssueState = adapter.getInitialState({
  loading: false,
  error: null
});

export const issueReducer = createReducer(
  initialState,

  // Load
  on(IssueActions.loadIssues, state => ({ ...state, loading: true, error: null })),
  on(IssueActions.loadIssuesSuccess, (state, { issues }) => adapter.setAll(issues, { ...state, loading: false })),
  on(IssueActions.loadIssuesFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Add
  on(IssueActions.addIssueSuccess, (state, { issue }) => adapter.addOne(issue, state)),
  on(IssueActions.addIssueFailure, (state, { error }) => ({ ...state, error })),

  // Update
  on(IssueActions.updateIssueSuccess, (state, { issue }) => adapter.updateOne({ id: issue.id, changes: issue }, state)),
  on(IssueActions.updateIssueFailure, (state, { error }) => ({ ...state, error })),

  // Delete
  on(IssueActions.deleteIssueSuccess, (state, { id }) => adapter.removeOne(id, state)),
  on(IssueActions.deleteIssueFailure, (state, { error }) => ({ ...state, error }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
