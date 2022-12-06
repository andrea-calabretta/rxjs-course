import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, Observable, of, Subscription, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { toSubscriber } from 'rxjs/internal-compatibility';
import { ThisReceiver } from '@angular/compiler';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    myObservable = interval(1000)
    subscription = new Subscription;

    constructor() {

    }

    ngOnInit() {
      const myObserver = {
        next : val => console.log(val),
        error : (err) => console.log(err),
        complete: () => console.log("complete!")
      }

      this.subscription = this.myObservable.subscribe(myObserver)
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}
