import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { Course } from '../model/course';


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private _http: HttpClient) { }

  ngOnInit() {}
}
