import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const initialComments = [
  { id: '1', url: '', title: 'Using @ngrx/store', comment: 'To use @ngrx/store, we need to install it first.', saved: '2020-09-16T20:10:06.925Z' },
  { id: '2', url: '', title: 'Optimizing change detection', comment: 'In order to optimize change detection, we need to use OnPush strategy.', saved: '2020-09-16T20:10:06.925Z' },
];

export default async function globalSetup() {
  const dbPath = join(__dirname, '..', 'db.json');
  const db = JSON.parse(readFileSync(dbPath, 'utf-8'));
  db.comments = initialComments;
  writeFileSync(dbPath, JSON.stringify(db, null, 2));
}
