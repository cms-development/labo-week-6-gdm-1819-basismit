import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CourseService } from './../course.service';
import { AuthenticationService } from './../authentication.service';
import { StudentService } from './../student.service';
import { InstructorService } from './../instructor.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  public course = null;
  public included = null;
  public editMode = false;
  public instructor = null;
  public allInstructors = null;
  public instructorSelect = null;
  public students = null;
  public addedStudents = [];
  public removedStudents = [];
  public avStudents = [];
  public allStudents = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private courseService: CourseService,
    private studentService: StudentService,
    private instructorService: InstructorService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.getStudents();
    this.getInstructors();
    this.getCourse();
  }
  getCourse() {
    const _this = this;
    this.courseService.getCourse(this.route.snapshot.paramMap.get('id'))
      .then(response => {
        _this.course = response.data.data;
        _this.included = response.data.included;
        _this.students = _this.included.filter(result => result.type === 'student--student');
        _this.instructor = _this.included.filter(result => result.type === 'instructor--instructor')[0];
        _this.instructorSelect = _this.instructor.id;
        if (_this.allStudents) {
          _this.manageStudents();
        }
      })
      .catch(error => { console.log(error); });
  }
  getStudents() {
    const _this = this;
    this.studentService.getStudents()
      .then(response => {
        _this.allStudents = response.data.data;
        if (_this.students) {
          _this.manageStudents();
        }
      })
      .catch(error => { console.log(error); } );
  }
  getInstructors() {
    const _this = this;
    this.instructorService.getInstructors()
      .then(response => {
        _this.allInstructors = response.data.data;
      })
      .catch(error => { console.log(error); } );
  }
  updateCourse() {
    const _this = this;
    console.log('updating');
    const studentsArray = [];
    this.students.forEach(element => {
      console.log(element);
      studentsArray.push({
        type: 'student--student',
        id: element.id,
      });
    });
    const courseData = {
      data: {
        type: 'course--course',
        id: this.route.snapshot.paramMap.get('id'),
        attributes: {
            name: this.course.attributes.name,
            field_academic_institution: this.course.attributes.field_academic_institution,
        },
        relationships: {
            field_instructor: {
                data: {
                    type: 'instructor--instructor',
                    id: this.instructor.id,
                }
            },
            field_students: {
                data: studentsArray,
              }
          }
        }
    };
    // update course
    this.courseService.updateCourse(courseData)
    .then(response => {
      console.log(response);
    })
    .catch(error => { console.log(error); } );
    // update affected removed students
    const leftStudents = null;
    this.removedStudents.forEach(element => {
      const studentData = {
        data: {
            type: 'student--student',
            id: '05aa7d93-5281-4f42-9dc3-56987e89ea10',
            relationships: {
                field_courses: {
                    data: element.relationships.field_courses.data.filter(result => result.id !== _this.course.id)
                }
            }
          }
        };
      this.studentService.updateStudent(studentData)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
    });
    // update affected added students
    this.addedStudents.forEach(element => {
      const newData = element.relationships.field_courses.data;
      newData.push({
        'type': 'course--course',
        'id': _this.course.id
      });
      const studentData = {
        data: {
            type: 'student--student',
            id: '05aa7d93-5281-4f42-9dc3-56987e89ea10',
            relationships: {
                field_courses: {
                    data: newData,
                }
            }
        }
      };
      this.studentService.updateStudent(studentData)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
    });
    this.editMode = false;
  }
  removeStudent(removed) {
    this.removedStudents.push(removed);
    this.students = this.students.filter(result => result.id !== removed.id);
    this.addedStudents = this.addedStudents.filter(result => result.id !== removed.id);
    this.avStudents.push(removed);
  }
  addStudent(added) {
    this.addedStudents.push(added);
    this.avStudents = this.avStudents.filter(result => result.id !== added.id);
    this.removedStudents = this.removedStudents.filter(result => result.id !== added.id);
    this.students.push(added);
  }
  manageStudents() {
    this.avStudents = this.allStudents;
    this.students.forEach(element => {
      this.avStudents = this.avStudents.filter(result => result.id !== element.id);
    });
  }
  trackStudent(student: any) {
    return student ? student.id : null;
  }
  cancel() {
    this.getCourse();
    this.addedStudents = [];
    this.removedStudents = [];
    this.manageStudents();
    this.editMode = false;
  }
  instructorChange() {
    this.instructor = this.allInstructors.filter(result => result.id === this.instructorSelect)[0];
  }
  delete() {
    this.courseService.deleteCourse(this.course.id);
  }

  goBack(): void {
    this.location.back();
  }
}
