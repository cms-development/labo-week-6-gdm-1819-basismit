import { Component, OnInit } from '@angular/core';
import { InstructorService } from './../instructor.service';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from './../course.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.css']
})
export class InstructorDetailComponent implements OnInit {

  public instructor = null;
  public courses = null;
  public editMode = false;
  public allTitles = [
    {value: 'title_5-0', name: 'A.D.'},
    {value: 'title_6-0', name: 'B.'},
    {value: 'title_6-1', name: 'B.A.'},
    {value: 'title_6-2', name: 'B.Sc.'},
    {value: 'title_7-0', name: 'M.'},
    {value: 'title_7-1', name: 'M.A.'},
    {value: 'title_7-2', name: 'M.Sc.'},
    {value: 'title_8-0', name: 'Ph.D.'},
  ];
  public allRanks = [
    {value: 'rank_0', name: 'Visiting Professor'},
    {value: 'rank_1', name: 'Assistant Lecturer'},
    {value: 'rank_2', name: 'Senior Assistant Lecturer'},
    {value: 'rank_3', name: 'Lecturer'},
    {value: 'rank_4', name: 'Senior Lecturer'},
  ];
  public titlesLeft = null;

  constructor(
    private instructorService: InstructorService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private location: Location,
    ) { }

  ngOnInit() {
    this.getInstructor();
    console.log('test');
  }

  getInstructor() {
    const _this = this;
    this.instructorService.getInstructor(this.route.snapshot.paramMap.get('id'))
      .then(response => {
        console.log(response);
        _this.instructor = response.data.data;
        _this.getInstructorCourses(_this.instructor.id);
        _this.manageTitles();
      })
      .catch(error => {
        console.log(error);
      });
  }
  getInstructorCourses(id: string) {
    const _this = this;
    this.courseService.getCoursesWithParmeters(`?[instructor.id]=${id}`)
      .then(response => {
        console.log(response);
        _this.courses = response.data.data;

      });
  }
  updateInstructor() {
    this.instructorService.updateInstructor({
      data: {
        type: 'instructor--instructor',
        id: this.route.snapshot.paramMap.get('id'),
        attributes: this.instructor.attributes,
      }
    })
      .then(response => {console.log(response); this.editMode = false; })
      .catch(error => console.log(error));
  }
  getTitleName(value) {
    return this.allTitles.filter(result => result.value === value)[0].name;
  }
  getRankName(value) {
    return this.allRanks.filter(result => result.value === value)[0].name;
  }
  removeTitle(value) {
    this.titlesLeft.push(this.allTitles.filter(result => result.value === value));
    this.instructor.attributes.field_academic_title = this.instructor.attributes.field_academic_title.filter(result => result !== value);
  }
  addTitle(value) {
    this.instructor.attributes.field_academic_title.push(value);
    this.titlesLeft = this.titlesLeft.filter(result => {
      return result.value !== value;
    });
  }
  trackTitle(title: any) {
    return title ? title : null;
  }
  manageTitles() {
    this.titlesLeft = this.allTitles;
    this.instructor.attributes.field_academic_title.forEach(element => {
      this.titlesLeft = this.titlesLeft.filter(result => {
        return result.value !== element;
      });
    });
  }
  cancel() {
    this.getInstructor();
    this.editMode = false;
  }
  goBack() {
    this.location.back();
  }

}

