import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { EMPTY, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { filterOnlyEven } from './filterOnlyEven';
import { getFromApi, logError } from './logErr';
import { pow } from './pow';
import { takeEveryNth } from './takeEveryNth';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-custom-operators',
    templateUrl: './custom-operators.component.html',
    styleUrls: ['./custom-operators.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatButton,
    ],
})
export class CustomOperatorsComponent {
  http = inject(HttpClient);
  response: any;
  private readonly url = 'http://localhost:3000/todos/1';

  simpleFilter() {
    const numbers$ = from([1, 4, 6, 7, 9, 11]).pipe((n) => filterOnlyEven(n));
    numbers$.subscribe((n) => console.log(n));
  }

  usePow() {
    const numbers$ = from([1, 4, 6, 7, 9, 11]).pipe(pow(2));
    numbers$.subscribe((n) => console.log(n));
  }

  usingOperators() {
    const numbers$ = from([1, 4, 6, 7, 9, 11]).pipe(takeEveryNth(3));
    numbers$.subscribe((n) => console.log(n));
  }

  errHandling() {
    // traditional rest call
    this.http
      .get(this.url)
      .pipe(
        catchError((err) => {
          console.log('Error', err);
          return EMPTY;
        })
      )
      .subscribe((data) => console.log('result from api', data));

    // traditional rest call
    this.http
      .get(this.url)
      .pipe(logError())
      .subscribe((data) => console.log('result from api', data));
  }

  utilFunction() {
    getFromApi(this.http, this.url).subscribe((data) =>
      console.log('result from api', data)
    );
  }

  resolveParentChild() { }
}
