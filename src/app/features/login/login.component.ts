// import { Component, inject, signal } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'tms-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss',
// })
// export class LoginComponent {
//   private readonly authService = inject(AuthService);
//   private readonly router = inject(Router);

//   username = signal('');
//   password = signal('');
//   error = signal<string | null>(null);
//   isLoading = signal(false);

//   async onLogin(): Promise<void> {
//     this.error.set(null);
//     this.isLoading.set(true);

//     try {
//       await this.authService.login({
//         // username: this.username(),
//         email: this.username(),
//         password: this.password(),
//       });

//       // Login succeeded.
//       // The backend has now created the HttpOnly tms_auth cookie.
//       await this.router.navigate(['/dashboard']);
//     } catch (err: any) {
//       this.error.set(
//         err?.error?.detail ?? 'Invalid username or password.',
//       );
//     } finally {
//       this.isLoading.set(false);
//     }
//   }
// }

// import { Component, inject, signal } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss',
// })
// export class LoginComponent {
//   private readonly auth = inject(AuthService);
//   private readonly router = inject(Router);

//   email = signal('');
//   password = signal('');
//   error = signal('');

//   async onLogin(): Promise<void> {
//     this.error.set('');

//     try {
//       await this.auth.login({
//         email: this.email(),
//         password: this.password(),
//       });

//       console.log('Login successful');
//       console.log('User:', this.auth.currentUser());

//       await this.router.navigate(['/']);
//     } catch (error) {
//       console.error('Login failed:', error);

//       this.error.set('Invalid email or password.');
//     }
//   }
// }

// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HttpErrorResponse } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss',
// })
// export class LoginComponent {
//   private readonly auth = inject(AuthService);
//   private readonly router = inject(Router);

//   email = '';
//   password = '';

//   errorMessage = '';
//   isLoading = false;

//   async onSubmit(): Promise<void> {
//     // Clear previous error
//     this.errorMessage = '';

//     // Basic validation
//     if (!this.email || !this.password) {
//       this.errorMessage = 'Please enter your email and password.';
//       return;
//     }

//     this.isLoading = true;

//     try {
//       await this.auth.login({
//         email: this.email,
//         password: this.password,
//       });

//       // Login successful
//       await this.router.navigate(['/dashboard']);
//     } catch (error) {
//       console.error('Login failed:', error);

//       if (error instanceof HttpErrorResponse) {
//         switch (error.status) {
//           case 401:
//             this.errorMessage = 'Invalid email or password.';
//             break;

//           case 423:
//             this.errorMessage =
//               'Your account is locked because of too many failed login attempts. Please try again later.';
//             break;

//           case 429:
//             this.errorMessage = 'Too many login attempts. Please wait a moment and try again.';
//             break;

//           default:
//             this.errorMessage = error.error?.detail ?? 'Unable to login. Please try again later.';
//         }
//       } else {
//         this.errorMessage = 'Unable to connect to the server. Please try again later.';
//       }
//     } finally {
//       this.isLoading = false;
//     }
//   }
// }



import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly email = signal('');
  readonly password = signal('');

  readonly error = signal('');
  readonly isLoading = signal(false);

  async onLogin(): Promise<void> {
    this.error.set('');

    if (!this.email() || !this.password()) {
      this.error.set('Please enter your email and password.');
      return;
    }

    this.isLoading.set(true);

    try {
      await this.auth.login({
        email: this.email(),
        password: this.password(),
      });

      // Login successful
      await this.router.navigate(['/dashboard']);
    } catch (err) {
      console.error('Login failed:', err);

      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 401:
            this.error.set('Invalid email or password.');
            break;

          case 423:
            this.error.set(
              'Your account is locked because of too many failed login attempts. Please try again later.'
            );
            break;

          case 429:
            this.error.set(
              'Too many login attempts. Please wait a moment and try again.'
            );
            break;

          default:
            this.error.set(
              err.error?.detail ??
                'Unable to login. Please try again later.'
            );
            break;
        }
      } else {
        this.error.set(
          'Unable to connect to the server. Please try again later.'
        );
      }
    } finally {
      this.isLoading.set(false);
    }
  }
}
