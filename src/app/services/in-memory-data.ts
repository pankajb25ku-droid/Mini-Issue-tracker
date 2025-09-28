import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Issue } from '../models/issue.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryData implements InMemoryDbService {
  createDb() {
    const issues: Issue[] = [
      { id: 1, title: 'Login page: fix validation', description: 'Empty password allowed', status: 'open' },
      { id: 2, title: 'Add unit tests for auth', description: 'Coverage for auth guard', status: 'in-progress' },
      { id: 3, title: 'Landing page images', description: 'Optimize hero images', status: 'done' },
      { id: 4, title: 'API: fix 500 on /users', description: 'Null pointer in user service', status: 'open' },
      { id: 5, title: 'UX: improve mobile nav', description: 'Menu overlap', status: 'in-progress' }
    ];
    return { issues };
  }

  genId(issues: Issue[]): number {
    return issues.length > 0 ? Math.max(...issues.map(i => i.id)) + 1 : 1;
  }
}
