export type CoverType = 'assignment' | 'lab-report';

export interface FormData {
  type: CoverType;
  universityName: string;
  universityDepartment: string;
  courseCode: string;
  courseTitle: string;
  submissionDate: string;
  assignmentNo?: string;
  assignmentTitle?: string;
  experimentNo?: string;
  experimentTitle?: string;
  teacherName: string;
  teacherDesignation: string;
  teacherDepartment: string;
  studentName: string;
  studentId: string;
  batch: string;
  program: string;
  section: string;
}
