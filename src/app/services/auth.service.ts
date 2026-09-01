// import { inject, Service, signal } from "@angular/core";
// import { HttpClient } from "@microsoft/signalr";

// export interface TmsUser {
//   displayName: string;
//   role: string;
// }
// export interface LoginRequest {
//   username: string;
//   password: string;
// }
// @Service()
// export class AuthService {
//   private http = inject(HttpClient);
//   currentUser = signal<TmsUser | null>(null);
//   hasRole(role: string): boolean {
//     const user = this.currentUser();
//     return user?.role === role || user?.role === 'Admin';
//   }
//   async login(credentials: LoginRequest) {
//     // Server sets the HttpOnly cookie in the Set-Cookie response header
//     await firstValueFrom(this.http.post<void>('/api/auth/login', credentials));
//     // Fetch authenticated profile — browser automatically sends the cookie
//     const user = await firstValueFrom(this.http.get<TmsUser>('/api/auth/me'));
//     this.currentUser.set(user);
//   }
// }

// import { Injectable, inject, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { firstValueFrom } from 'rxjs';

// export interface TmsUser {
//   displayName: string;
//   role: string;
// }

// export interface LoginRequest {
//   username: string;
//   password: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private readonly http = inject(HttpClient);

//   readonly currentUser = signal<TmsUser | null>(null);

//   readonly isAuthenticated = signal(false);

//   hasRole(role: string): boolean {
//     const user = this.currentUser();

//     return user?.role === role || user?.role === 'Admin';
//   }

//   async login(credentials: LoginRequest): Promise<void> {
//     await firstValueFrom(this.http.post<void>('/api/auth/login', credentials));

//     const user = await firstValueFrom(this.http.get<TmsUser>('/api/auth/me'));

//     this.currentUser.set(user);
//     this.isAuthenticated.set(true);
//   }

//   async loadCurrentUser(): Promise<void> {
//     try {
//       const user = await firstValueFrom(this.http.get<TmsUser>('/api/auth/me'));

//       this.currentUser.set(user);
//       this.isAuthenticated.set(true);
//     } catch {
//       this.currentUser.set(null);
//       this.isAuthenticated.set(false);
//     }
//   }

//   async logout(): Promise<void> {
//     try {
//       await firstValueFrom(this.http.post<void>('/api/auth/logout', {}));
//     } finally {
//       this.currentUser.set(null);
//       this.isAuthenticated.set(false);
//     }
//   }
// }

/// ###############################################################################################################################################

// import { Injectable, inject, signal } from '@angular/core';
// import { environment } from '../../environments/environment';
// import { HttpClient } from '@angular/common/http';
// import { firstValueFrom } from 'rxjs';

// export interface TmsUser {
//   email: string;
//   displayName: string;
//   role: string;
// }
// export interface LoginRequest {
//   email: string;
//   password: string;
// }
// export interface AuthResponse {
//   accessToken: string;
//   refreshToken: string;
// }
// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private http = inject(HttpClient);
//   private accessToken = signal<string | null>(null);
//   currentUser = signal<TmsUser | null>(null);
//   getAccessToken(): string | null {
//     return this.accessToken();
//   }
//   hasRole(role: string): boolean {
//     const user = this.currentUser();
//     return user?.role === role || user?.role === 'Admin';
//   }
//   async login(credentials: LoginRequest): Promise<void> {
//     const res = await firstValueFrom(this.http.post<AuthResponse>('/api/auth/login', credentials));
//     this.accessToken.set(res.accessToken);
//     // Decode user payload from JWT (or fetch /api/auth/me)
//     const payload = JSON.parse(atob(res.accessToken.split('.')[1]));
//     this.currentUser.set({
//       email: payload.email || payload.sub,
//       displayName: payload.name || payload.email || 'User',
//       role:
//         payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
//         payload.role ||
//         'Student',
//     });
//   }

//   logout(): void {
//     this.accessToken.set(null);
//     this.currentUser.set(null);
//   }
// }

// import { Injectable, inject, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { firstValueFrom } from 'rxjs';
// import { environment } from '../../environments/environment';

// export interface TmsUser {
//   email: string;
//   displayName: string;
//   role: string;
// }

// export interface LoginRequest {
//   email: string;
//   password: string;
// }

// export interface AuthResponse {
//   accessToken: string;
//   refreshToken: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private readonly http = inject(HttpClient);

//   // JWT access token is kept ONLY in memory.
//   private readonly accessToken = signal<string | null>(null);
//   private readonly refreshToken = signal<string | null>(null);

//   readonly currentUser = signal<TmsUser | null>(null);

//   private readonly baseUrl = `${environment.apiUrl}/auth`;

//   async initializeXsrf(): Promise<void> {
//     await firstValueFrom(
//       this.http.get<void>(`${this.baseUrl}/xsrf`)
//     );
//   }

//   getAccessToken(): string | null {
//     return this.accessToken();
//   }

//   async login(credentials: LoginRequest): Promise<void> {
//     const response = await firstValueFrom(
//       this.http.post<AuthResponse>(
//         `${this.baseUrl}/login`,
//         credentials
//       )
//     );

//     // Store access token in memory.
//     this.accessToken.set(response.accessToken);

//     // Decode JWT payload.
//     const payload = JSON.parse(
//       atob(response.accessToken.split('.')[1])
//     );

//     this.currentUser.set({
//       email: payload.email ?? '',
//       displayName:
//         payload.FirstName ??
//         payload.name ??
//         payload.email ??
//         'User',
//       role:
//         payload[
//           'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
//         ] ??
//         payload.role ??
//         'Student',
//     });
//   }

//   hasRole(role: string): boolean {
//     const user = this.currentUser();

//     return user?.role === role || user?.role === 'Admin';
//   }

//   logout(): void {
//     this.accessToken.set(null);
//     this.currentUser.set(null);
//   }
// }

import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';

export interface TmsUser {
  email: string;
  displayName: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  /*
   * IMPORTANT:
   *
   * Both tokens are kept ONLY in memory.
   *
   * They are NOT stored in:
   * - localStorage
   * - sessionStorage
   * - IndexedDB
   * - cookies
   *
   * Therefore, refreshing the browser will clear them.
   */
  private readonly accessToken = signal<string | null>(null);
  private readonly refreshToken = signal<string | null>(null);

  readonly currentUser = signal<TmsUser | null>(null);

  private readonly baseUrl = `${environment.apiUrl}/auth`;

  /**
   * Request the XSRF cookie from the API.
   *
   * The browser stores the XSRF-TOKEN cookie and Angular's
   * XSRF mechanism can use it for protected state-changing requests.
   */
  async initializeXsrf(): Promise<void> {
    await firstValueFrom(this.http.get<void>(`${this.baseUrl}/xsrf`));
  }

  /**
   * Returns the current access token.
   *
   * The JWT interceptor uses this to add:
   *
   * Authorization: Bearer <token>
   */
  getAccessToken(): string | null {
    return this.accessToken();
  }

  /**
   * Login user.
   *
   * 1. Send credentials to API.
   * 2. Receive access + refresh token.
   * 3. Keep both tokens in memory.
   * 4. Decode access-token payload.
   * 5. Populate currentUser.
   */
  async login(credentials: LoginRequest): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials),
    );

    // Store tokens ONLY in memory.
    this.accessToken.set(response.accessToken);
    this.refreshToken.set(response.refreshToken);

    // Decode JWT payload.
    const payload = this.decodeJwtPayload(response.accessToken);

    this.currentUser.set({
      email:
        payload.email ??
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ??
        '',

      displayName: payload.FirstName ?? payload.name ?? payload.email ?? 'User',

      role:
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ??
        payload.role ??
        'Student',
    });
  }

  /**
   * Decode the JWT payload.
   *
   * This is used ONLY to read display information such as
   * email, first name and role.
   *
   * It does NOT validate the JWT.
   * The API remains responsible for validating the token.
   */
  private decodeJwtPayload(token: string): any {
    try {
      const payload = token.split('.')[1];

      if (!payload) {
        throw new Error('Invalid JWT.');
      }

      // Convert base64url -> base64.
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

      // Add required padding.
      const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');

      return JSON.parse(atob(padded));
    } catch (error) {
      console.error('Failed to decode JWT payload.', error);

      return {};
    }
  }

  /**
   * Check whether the current user has a specific role.
   *
   * Admin automatically has access to all roles.
   */
  hasRole(role: string): boolean {
    const user = this.currentUser();

    return user?.role === role || user?.role === 'Admin';
  }

  /**
   * Logout.
   *
   * Server:
   *   - Finds the refresh token.
   *   - Sets IsRevoked = true.
   *
   * Client:
   *   - Clears access token.
   *   - Clears refresh token.
   *   - Clears current user.
   *   - Navigates to login.
   *
   * The finally block guarantees that the local authentication
   * state is destroyed even if the API logout request fails.
   */
  async logout(): Promise<void> {
    const refreshToken = this.refreshToken();

    try {
      if (refreshToken) {
        await firstValueFrom(
          this.http.post<void>(`${this.baseUrl}/logout`, {
            refreshToken,
          }),
        );
      }
    } catch (error) {
      console.error('Logout request failed.', error);
    } finally {
      // Destroy local authentication state.
      this.accessToken.set(null);
      this.refreshToken.set(null);
      this.currentUser.set(null);

      // Return user to login page.
      await this.router.navigate(['/login']);
    }
  }
}
