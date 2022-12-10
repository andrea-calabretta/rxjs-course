import {Component, OnInit} from '@angular/core';
import { of, Subscription} from 'rxjs';
import { map} from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/internal-compatibility';


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
      this.subscription = this.myObservable
        .pipe(
          map( name => ajax(`https://random-data-api.com/api/${name}`)
                .subscribe((ajaxresponse: AjaxResponse) => console.log(ajaxresponse.response.name))
              )
        )
        .subscribe();

      // this.subscription = this.myObservable
      // .pipe(
      //   concatMap( name => ajax(`https://random-data-api.com/api/${name}`))
      // )
      // .subscribe((ajaxresponse: AjaxResponse) =>console.log( ajaxresponse.response.name))

    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}
