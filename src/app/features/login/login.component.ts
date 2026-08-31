
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'tms-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  username = signal('');
  password = signal('');
  error = signal<string | null>(null);
  isLoading = signal(false);

  async onLogin(): Promise<void> {
    this.error.set(null);
    this.isLoading.set(true);

    try {
      await this.authService.login({
        username: this.username(),
        password: this.password(),
      });

      // Login succeeded.
      // The backend has now created the HttpOnly tms_auth cookie.
      await this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.error.set(
        err?.error?.detail ?? 'Invalid username or password.',
      );
    } finally {
      this.isLoading.set(false);
    }
  }
}

