import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IssueService } from '../../services/issue-service';
import * as IssueActions from './issue.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class IssueEffects {
    constructor(private actions$: Actions, private issueService: IssueService) { }

        loadIssues$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IssueActions.loadIssues),
            mergeMap(() =>
                this.issueService.getAll().pipe(
                    map(issues => IssueActions.loadIssuesSuccess({ issues })),
                    catchError(err =>
                        of(IssueActions.loadIssuesFailure({ error: err.message }))
                    )
                )
            )
        )
    );

    addIssue$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IssueActions.addIssue),
            mergeMap(action =>
                this.issueService.add(action.issue).pipe(
                    map(issue => IssueActions.addIssueSuccess({ issue })),
                    catchError(err => of(IssueActions.addIssueFailure({ error: err.message })))
                )
            )
        )
    );

    updateIssue$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IssueActions.updateIssue),
            mergeMap(action =>
                this.issueService.update(action.issue).pipe(
                    map(issue => IssueActions.updateIssueSuccess({ issue })),
                    catchError(err => of(IssueActions.updateIssueFailure({ error: err.message })))
                )
            )
        )
    );

    deleteIssue$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IssueActions.deleteIssue),
            mergeMap(action =>
                this.issueService.delete(action.id).pipe(
                    map(() => IssueActions.deleteIssueSuccess({ id: action.id })),
                    catchError(err => of(IssueActions.deleteIssueFailure({ error: err.message })))
                )
            )
        )
    );
}
