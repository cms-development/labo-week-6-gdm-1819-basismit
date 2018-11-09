import { Component, OnInit } from '@angular/core';
import { Instructor } from './../instructor';
import { InstructorService } from './../instructor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {
  public instructors: null;
  constructor(
    private instructorService: InstructorService,
    private location: Location,
    ) { }

  ngOnInit() {
    this.getInstructors();
  }

  getInstructors(): void {
    const _this = this;
    this.instructorService.getInstructors()
      .then(response => {
        _this.instructors = response.data.data;
        console.log(_this.instructors);
      });
  }
  goBack(): void {
    this.location.back();
  }

}
