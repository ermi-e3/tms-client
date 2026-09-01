// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Course } from './models/course.model';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   // templateUrl: './app.html',
//   templateUrl: './app.html',
//   styleUrl: './app.scss',
// })
// export class App {
//   protected readonly title = signal('tms-client');
// }

// import { Component, signal } from '@angular/core';
// import { RouterLink, RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterLink, RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.scss',
// })
// export class App {
//   protected readonly title = signal('tms-client');
// }

// import { Component, inject, signal } from '@angular/core';
// import {
//   RouterLink,
//   RouterLinkActive,
//   RouterOutlet,
// } from '@angular/router';
// import { AuthService } from './services/auth.service';

// @Component({
//   selector: 'app-root',
//   imports: [
//     RouterOutlet,
//     RouterLink,
//     RouterLinkActive,
//   ],
//   templateUrl: './app.html',
//   styleUrl: './app.scss',
// })
// export class App {
//   protected readonly title = signal('tms-client');

//   protected readonly auth = inject(AuthService);

//   logout(): void {
//     this.auth.logout();
//   }
// }

// import { Component, inject, signal } from '@angular/core';
// import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { AuthService } from './services/auth.service';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, RouterLink, RouterLinkActive],
//   templateUrl: './app.html',
//   styleUrl: './app.scss',
// })
// export class App {
//   protected readonly title = signal('tms-client');

//   protected readonly auth = inject(AuthService);
//   private readonly router = inject(Router);

//   logout(): void {
//     this.auth.logout();
//     this.router.navigate(['/login']);
//   }
// }

import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('tms-client');

  protected readonly auth = inject(AuthService);

  async logout(): Promise<void> {
    await this.auth.logout();
  }
}
