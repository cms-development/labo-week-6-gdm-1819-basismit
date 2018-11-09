import { Component, OnInit } from '@angular/core';
import { InstructorService } from './../instructor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-instructor-create',
  templateUrl: './instructor-create.component.html',
  styleUrls: ['./instructor-create.component.css']
})
export class InstructorCreateComponent implements OnInit {

  public data = {
    field_first_name: null,
    name: null,
    field_academic_rank: null,
    field_academic_title: []
  };
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
    private location: Location) { }

  ngOnInit() {
    this.manageTitles();
  }

  saveInstructor() {
    const _this = this;
    this.instructorService.postInstructor({
      data: {
        type: 'instructor--instructor',
        attributes: this.data,
      }
    })
      .then(response => {
        console.log(response);
        _this.goBack();
      })
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
    this.data.field_academic_title = this.data.field_academic_title.filter(result => result !== value);
  }
  addTitle(value) {
    this.data.field_academic_title.push(value);
    this.titlesLeft = this.titlesLeft.filter(result => {
      return result.value !== value;
    });
  }
  trackTitle(title: any) {
    return title ? title : null;
  }
  manageTitles() {
    this.titlesLeft = this.allTitles;
    this.data.field_academic_title.forEach(element => {
      this.titlesLeft = this.titlesLeft.filter(result => {
        return result.value !== element;
      });
    });
  }
  goBack(): void {
    this.location.back();
  }
}
