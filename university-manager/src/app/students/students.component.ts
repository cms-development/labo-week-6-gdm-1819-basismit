import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from './../student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  public students = null;

  constructor(
    private studentService: StudentService,
    private location: Location,
    ) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
    const _this = this;
    this.studentService.getStudents()
    .then(response => {
      _this.students = response.data.data;
      console.log(_this.students);
    });
  }
  goBack(): void {
    this.location.back();
  }

}
