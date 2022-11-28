import { Component, OnInit } from '@angular/core';
import { concat, interval, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  #subscription: Subscription = new Subscription;

  constructor() {
  }

  ngOnInit() {
    const interval1$ = interval(1000);
    const interval2$ = interval1$.pipe(map(val => 10 * val));

    const result$ = merge(interval1$, interval2$);

    this.#subscription = result$.subscribe(console.log);
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}
