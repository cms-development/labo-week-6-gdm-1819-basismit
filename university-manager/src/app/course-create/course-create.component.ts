import { Component, OnInit } from '@angular/core';
import { InstructorService } from './../instructor.service';
import { StudentService } from './../student.service';
import { CourseService } from './../course.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  public data = {
    name: null,
    institution: null,
    instructor: null,
    students: [],

  };
  public allInstructors = null;
  public addedStudents = [];
  public removedStudents = [];
  public avStudents = [];
  public allStudents = null;

  constructor(
    private instructorService: InstructorService,
    private studentService: StudentService,
    private courseService: CourseService,
    private location: Location,
    ) { }

  ngOnInit() {
    this.getInstructors();
    this.getStudents();
  }
  saveCourse() {
    const _this = this;
    const studentsArray = [];
    this.data.students.forEach(element => {
      console.log(element);
      studentsArray.push({
        type: 'student--student',
        id: element.id,
      });
    });
    const courseData = {
      data: {
        type: 'course--course',
        attributes: {
            name: this.data.name,
            field_academic_institution: this.data.institution,
        },
        relationships: {
            field_instructor: {
                data: {
                    type: 'instructor--instructor',
                    id: this.data.instructor,
                }
            },
            field_students: {
                data: studentsArray,
              }
          }
        }
    };
    this.courseService.postCourse(courseData)
      .then(response => {
        console.log(response);
        // update affected added students
    this.addedStudents.forEach(element => {
      const newData = element.relationships.field_courses.data;
      newData.push({
        'type': 'course--course',
        'id': response.data.id,
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
      .then(newResponse => {
        console.log(newResponse);
      })
      .catch(error => console.log(error));
    });
    _this.goBack();
      })
      .catch(error => console.log(error));
  }
  getInstructors() {
    const _this = this;
    this.instructorService.getInstructors()
      .then(response => {
        _this.allInstructors = response.data.data;
        _this.data.instructor = _this.allInstructors[0].id;
      })
      .catch(error => console.log(error));
  }
  getStudents() {
    const _this = this;
    this.studentService.getStudents()
      .then(response => {
        _this.allStudents = response.data.data;
        _this.manageStudents();
      })
      .catch(error => {
        console.log(error);
      });
  }
  removeStudent(removed) {
    this.removedStudents.push(removed);
    this.data.students = this.data.students.filter(result => result.id !== removed.id);
    this.addedStudents = this.addedStudents.filter(result => result.id !== removed.id);
    this.avStudents.push(removed);
  }
  addStudent(added) {
    this.addedStudents.push(added);
    this.avStudents = this.avStudents.filter(result => result.id !== added.id);
    this.removedStudents = this.removedStudents.filter(result => result.id !== added.id);
    this.data.students.push(added);
  }
  manageStudents() {
    this.avStudents = this.allStudents;
    if (this.data.students) {
      this.data.students.forEach(element => {
        this.avStudents = this.avStudents.filter(result => result.id !== element.id);
      });
    }
  }
  trackStudent(student: any) {
    return student ? student.id : null;
  }
  instructorChange() {
    this.data.instructor = this.allInstructors.filter(result => result.id === this.data.instructor)[0];
  }
  goBack(): void {
    this.location.back();
  }


}
