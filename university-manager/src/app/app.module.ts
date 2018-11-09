import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoursesComponent } from './courses/courses.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { StudentsComponent } from './students/students.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { InstructorDetailComponent } from './instructor-detail/instructor-detail.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { InstructorCreateComponent } from './instructor-create/instructor-create.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    InstructorsComponent,
    StudentsComponent,
    CourseDetailComponent,
    InstructorDetailComponent,
    StudentDetailComponent,
    LoginComponent,
    CourseCreateComponent,
    StudentCreateComponent,
    InstructorCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
