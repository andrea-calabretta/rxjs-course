import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { toSubscriber } from 'rxjs/internal-compatibility';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    constructor() {

    }

    ngOnInit() {
      const myObservable = new Observable<number>
      (subscriber => {
          console.log("Observable executed");
          subscriber.next(1);
          setTimeout(() =>  subscriber.next(3), 1000);
          setTimeout(() =>  subscriber.next(4), 3000);
          // setTimeout(() =>  {subscriber.error('Failure')}, 5000 );
          setTimeout(() =>  { subscriber.complete()}, 6000 );
          return () => {
            console.log("Teardown logic");
          }
    })

    const myObserver = {
      next : val => console.log(val),
      error : (err) => console.log(err),
      complete: () => console.log("complete!")
    }

    myObservable.subscribe(myObserver)
    }

}
