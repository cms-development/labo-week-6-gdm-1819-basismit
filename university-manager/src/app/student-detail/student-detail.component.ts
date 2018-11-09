import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { StudentService } from './../student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  public student = null;
  public courses = null;
  public editMode = false;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location,
    ) { }

  ngOnInit() {
    this.getStudent();
  }

  getStudent() {
    const _this = this;
    this.studentService.getStudent(this.route.snapshot.paramMap.get('id'))
    .then(response => {
      console.log(response);
      _this.student = response.data.data;
      if (response.data.included) { _this.courses = response.data.included.filter(result => result.type === 'course--course'); }
      console.log(_this.courses);
    });
  }
  updateStudent() {
    console.log('updating');
    const _this = this;
    this.studentService.updateStudent( {
      data: {
        type: 'student--student',
        id: this.route.snapshot.paramMap.get('id'),
        attributes: this.student.attributes,
      }
    })
      .then(response => {
        console.log(response);
        _this.editMode = false;
      })
      .catch(error => console.log(error));
  }
  cancel() {
    this.getStudent();
    this.editMode = false;
  }
  goBack(): void {
    this.location.back();
  }

}
