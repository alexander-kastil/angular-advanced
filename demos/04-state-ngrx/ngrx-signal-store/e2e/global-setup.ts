import * as fs from 'fs';
import * as path from 'path';

const TEST_DB_ORIGINAL = {
  comments: [
    {
      id: '1',
      url: '',
      title: 'Using @ngrx/store',
      comment: 'To use @ngrx/store, we need to install it first.',
      saved: '2020-09-16T20:10:06.925Z',
    },
    {
      id: '2',
      url: '',
      title: 'Optimizing change detection',
      comment: 'In order to optimize change detection, we need to use OnPush strategy.',
      saved: '2020-09-16T20:10:06.925Z',
    },
  ],
  demos: [
    { url: 'app-state', title: 'SignalStore App State', id: '1' },
    { url: 'store-crud', title: 'SignalStore CRUD', id: '2' },
  ],
  skills: [],
  customers: [],
  'top-links': [
    { label: 'Home', url: '', id: '965c' },
    { label: 'Demos', url: 'demos', id: 'ee5c' },
    { label: 'Skills', url: 'skills', id: '5f93' },
    { label: 'Customers', url: 'customers', id: '68c7' },
    { label: 'Topics', url: 'topics', id: '68c7' },
  ],
  topics: [],
};

export default async function globalSetup() {
  const dbPath = path.join(__dirname, '..', 'db-test.json');
  fs.writeFileSync(dbPath, JSON.stringify(TEST_DB_ORIGINAL, null, 2));
}
