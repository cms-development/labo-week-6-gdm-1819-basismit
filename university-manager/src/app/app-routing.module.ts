import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { StudentsComponent } from './students/students.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { InstructorDetailComponent } from './instructor-detail/instructor-detail.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { InstructorCreateComponent } from './instructor-create/instructor-create.component';
import { LoginComponent } from './login/login.component';
import { StudentCreateComponent } from './student-create/student-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/create', component: CourseCreateComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'instructors', component: InstructorsComponent },
  { path: 'instructors/create', component: InstructorCreateComponent },
  { path: 'instructors/:id', component: InstructorDetailComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'students/create', component: StudentCreateComponent },
  { path: 'students/:id', component: StudentDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
exports: [ RouterModule ]
})

export class AppRoutingModule {}
