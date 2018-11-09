import { Injectable } from '@angular/core';
import * as axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl = 'http://labo5.local/jsonapi/student/student';

  constructor() { }

  getStudents() {
    return axios.get(`${this.baseUrl}?include=field_courses`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'csrf_token': localStorage.getItem('csrf_token'),
      }
    });
  }

  getStudent(id: string) {
    return axios.get(`${this.baseUrl}/${id}?include=field_courses`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'csrf_token': localStorage.getItem('csrf_token'),
      }
    });
  }

  postStudent(data: any) {
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

  updateStudent(data: any) {
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

  deleteStudent(id: string) {
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
