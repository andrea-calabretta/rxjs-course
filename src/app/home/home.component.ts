import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, Observable, of, Subscription, timer} from 'rxjs';
import {catchError, concatMap, delayWhen, exhaustMap, map, mergeMap, retryWhen, shareReplay, switchMap, tap} from 'rxjs/operators';
import { ajax, AjaxResponse, toSubscriber } from 'rxjs/internal-compatibility';
import { ThisReceiver } from '@angular/compiler';
import { HttpClient, HttpContext } from '@angular/common/http';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    myObservable = of( "name/random_name", "name/random_name", "name/random_name")
    subscription = new Subscription;

    constructor() {

    }

    ngOnInit() {


      // this.subscription = this.myObservable
      //   .pipe(
      //     map( name => ajax(`https://random-data-api.com/api/${name}`)
      //       .pipe(
      //         map((ajaxresponse: AjaxResponse) => ajaxresponse.response.name)
      //       )
      //       .subscribe(val => console.log(val)))
      //   )
      //   .subscribe()

      // this.subscription = this.myObservable
      // .pipe(
      //   concatMap( name => ajax(`https://random-data-api.com/api/${name}`) ),
      //   map((ajaxresponse: AjaxResponse) => ajaxresponse.response.name)
      // )
      // .subscribe(val => console.log(val))


      this.subscription = this.myObservable
        .pipe(
          map( name => ajax(`https://random-data-api.com/api/${name}`)
                .subscribe((ajaxresponse: AjaxResponse) => console.log(ajaxresponse.response.name))
              )
        )
        .subscribe()

      this.subscription = this.myObservable
      .pipe(
        concatMap( name => ajax(`https://random-data-api.com/api/${name}`))
      )
      .subscribe((ajaxresponse: AjaxResponse) =>console.log( ajaxresponse.response.name))

    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}
