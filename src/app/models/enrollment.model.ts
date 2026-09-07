

export interface Enrollment {
  id: number;
  studentId: number;
  studentName: string;
  courseId: number;
  courseTitle: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  enrolledAt: string;
}