import { Injectable } from '@angular/core';
import * as axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  baseUrl = 'http://labo5.local/jsonapi/instructor/instructor';  constructor() { }

  getInstructors() {
    return axios.get(`${this.baseUrl}`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'csrf_token': localStorage.getItem('csrf_token'),
      }
    });
  }

  getInstructor(id: string) {
    return axios.get(`${this.baseUrl}/${id}`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'csrf_token': localStorage.getItem('csrf_token'),
      }
    });
  }

  postInstructor(data: any) {
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

  updateInstructor(data: any) {
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

  deleteInstructor(id: string) {
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
