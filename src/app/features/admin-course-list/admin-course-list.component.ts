


import { Component, inject, OnInit } from '@angular/core';
import { CourseStore } from '../../store/course.store';

@Component({
selector: 'app-admin-course-list',
templateUrl: './admin-course-list.component.html',
styleUrl: './admin-course-list.component.scss',
})
export class AdminCourseListComponent implements OnInit {
readonly store = inject(CourseStore);

ngOnInit(): void {
// Load courses when the admin page opens.
// Use your existing CourseStore loading method here if available.
this.store.loadCourses();
}

onDelete(id: number): void {
this.store.deleteCourse(id);
}
}
