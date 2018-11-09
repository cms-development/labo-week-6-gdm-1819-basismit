import { Component, OnInit } from '@angular/core';
import { StudentService } from './../student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  public data = {
    field_first_name: null,
    name: null,
  };

  constructor(
    private studentService: StudentService,
    private location: Location,
    ) { }

  ngOnInit() {
  }
  saveStudent() {
    const _this = this;
    this.studentService.postStudent({
      data: {
        type: 'student--student',
        attributes: this.data,
      }
    })
    .then(response => {
      console.log(response);
      _this.goBack();
    })
    .catch(error => console.log(error));
  }
  goBack(): void {
    this.location.back();
  }

}
