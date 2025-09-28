import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { Issue, IssueStatus } from '../../models/issue.model';
import * as IssueActions from '../../store/issues/issue.actions';
import * as IssueSelectors from '../../store/issues/issue.selectors';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: true
})
export class Home implements OnInit {

  /** -------- Controls -------- */
  searchControl = new FormControl<string>('', { nonNullable: true });
  filterControl = new FormControl<'all' | IssueStatus>('all', { nonNullable: true });

  /** -------- Form -------- */
  newForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(''),
    status: new FormControl<IssueStatus>('open')
  });

  /** -------- Store Observables -------- */
  allIssues$!: Observable<Issue[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  issues$!: Observable<Issue[]>;

  constructor(private store: Store) {}

  ngOnInit(): void { 

    this.allIssues$ = this.store.select(IssueSelectors.selectAllIssues);
    this.loading$ = this.store.select(IssueSelectors.selectLoading);
    this.error$ = this.store.select(IssueSelectors.selectError);

    this.issues$ = combineLatest([
      this.allIssues$,
      this.searchControl.valueChanges.pipe(startWith(''), debounceTime(300), distinctUntilChanged()),
      this.filterControl.valueChanges.pipe(startWith<'all' | IssueStatus>('all'))
    ]).pipe(
      map(([issues, search, status]) => {
        const q = (search ?? '').toLowerCase();
        return issues.filter(i =>
          (status === 'all' || i.status === status) &&
          (`${i.title} ${i.description ?? ''}`.toLowerCase().includes(q))
        );
      })
    );

    this.store.dispatch(IssueActions.loadIssues());
  }

  /** -------- Actions -------- */
  addIssue(): void {
    if (this.newForm.invalid) return;

    const raw = this.newForm.value;
    const newIssue: Issue = {
      id: Math.floor(Math.random() * 100000), // temporary id
      title: raw.title ?? '',
      description: raw.description ?? '',
      status: raw.status ?? 'open'
    };

    this.store.dispatch(IssueActions.addIssue({ issue: newIssue }));
    this.newForm.reset({ title: '', description: '', status: 'open' });
  }

  updateStatus(issue: Issue, status: IssueStatus): void {
    this.store.dispatch(IssueActions.updateIssue({ issue: { ...issue, status } }));
  }

   deleteIssue(id: number): void {
    if (!confirm('Delete this issue?')) return;
    this.store.dispatch(IssueActions.deleteIssue({ id }));
  }
}
