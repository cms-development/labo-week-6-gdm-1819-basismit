import { Injectable } from '@angular/core';
import { Course } from './course';
import * as axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl = 'http://labo5.local/jsonapi/course/course';

  constructor() { }

  getCourses() {
    return axios.get(`${this.baseUrl}?include=field_instructor,field_students`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'csrf_token': localStorage.getItem('csrf_token'),
      }
    });
  }
  getCoursesWithParmeters(param: string) {
    return axios.get(`${this.baseUrl}${param}`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'csrf_token': localStorage.getItem('csrf_token'),
      }
    });
  }


  getCourse(id: string) {
    return axios.get(`${this.baseUrl}/${id}?include=field_instructor,field_students`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'csrf_token': localStorage.getItem('csrf_token'),
      }
    });
  }

  postCourse(data: any) {
    return axios.post(`${this.baseUrl}`, data,
    {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'csrf_token': localStorage.getItem('csrf_token'),
      }
    });
  }

  updateCourse(data: any) {
    return axios.patch(`${this.baseUrl}/${data.data.id}`, data,
    {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'csrf_token': localStorage.getItem('csrf_token'),
      }
    });
  }

  deleteCourse(id: string) {
    return axios.delete(`${this.baseUrl}/${id}`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'csrf_token': localStorage.getItem('csrf_token'),
      }
    });
  }
}
