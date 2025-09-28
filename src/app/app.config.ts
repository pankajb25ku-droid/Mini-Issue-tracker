// File: app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryData } from './services/in-memory-data';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { issueReducer } from './store/issues/issue.reducer';
import { IssueEffects } from './store/issues/issue.effects';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryData, { delay: 300 })),
    provideStore({ issues: issueReducer }),
    provideEffects([IssueEffects]),
    provideStoreDevtools({ maxAge: 25 })
  ]
};
