import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import { Observable} from 'rxjs';
import { map, share, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$ : Observable<Course[]>;

    advancedCourses$ : Observable<Course[]>;

    constructor(private http: HttpClient) { }

    ngOnInit() {

      const http$ : Observable<Course[]> = this.http.get<Course[]>('/api/courses');

      const courses$ : Observable<any> = http$
        .pipe(
          tap( () => console.log('HTTP request executed')),
          map( res => Object.values(res["payload"] )),
          shareReplay()
        );

      this.beginnerCourses$ = courses$
          .pipe(
            map( courses => courses
              .filter( (course: Course) => course.category == 'BEGINNER'))
          );

      this.advancedCourses$ = courses$
          .pipe(
            map( courses => courses
              .filter( (course: Course) => course.category == 'ADVANCED'))
          );
    }

}
