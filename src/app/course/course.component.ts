import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    map,
    switchMap,
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { StringDecoder } from 'string_decoder';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId: string;
    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;

    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute, private http: HttpClient) {}

    ngOnInit() {
        this.courseId = this.route.snapshot.params['id'];

        this.course$ = this.http.get<Course>(`/api/courses/${this.courseId}`);

        this.lessons$ = this.loadLessons()
    }

    ngAfterViewInit() {

      const searchLessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
        .pipe(
          map( event => event.target.value),
          debounceTime(400), // aspetta che lo stream di dati si stabilizzi, prima di emetterlo
          distinctUntilChanged(),
          switchMap(search => this.loadLessons(search))
        );

        const initialLessons$ = this.loadLessons()
        this.lessons$ = concat(initialLessons$, searchLessons$);

    }

    loadLessons(search = ''): Observable<Lesson[]>{
        return this.http.get<Lesson[]>(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
            .pipe(
              map( res => res["payload"])
            );
    }

}
