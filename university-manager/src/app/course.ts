import { Instructor } from './instructor';
import { Student } from './student';

export class Course {
  id: string;
  name: string;
  academic_institution: string;
  instructor: Instructor;
  student: Student;
}
