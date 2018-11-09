import { Component, OnInit } from '@angular/core';
import { CourseService } from './../course.service';
import { Course } from '../course';
import { Location } from '@angular/common';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  public courses = null;
  // public course = null;

  constructor(
    private courseService: CourseService,
    private location: Location) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void {
    const _this = this;
    this.courseService.getCourses()
    .then(response => {
      _this.courses = response.data.data;
    });
  }
  goBack(): void {
    this.location.back();
  }
}
