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
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface TmsUser {
  displayName: string;
  role: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  readonly currentUser = signal<TmsUser | null>(null);
  readonly isAuthenticated = signal(false);

  // private readonly baseUrl = '/api/v2/auth';
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  async initializeXsrf(): Promise<void> {
    await firstValueFrom(this.http.get<void>(`${this.baseUrl}/xsrf`));  
  }

  async login(credentials: LoginRequest): Promise<void> {
    await firstValueFrom(this.http.post<void>(`${this.baseUrl}/login`, credentials));

    const user = await firstValueFrom(this.http.get<TmsUser>(`${this.baseUrl}/me`));

    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  async loadCurrentUser(): Promise<void> {
    try {
      const user = await firstValueFrom(this.http.get<TmsUser>(`${this.baseUrl}/me`));

      this.currentUser.set(user);
      this.isAuthenticated.set(true);
    } catch {
      this.currentUser.set(null);
      this.isAuthenticated.set(false);
    }
  }

  hasRole(role: string): boolean {
    const user = this.currentUser();

    return user?.role === role || user?.role === 'Admin';
  }

  async logout(): Promise<void> {
    try {
      await firstValueFrom(this.http.post<void>(`${this.baseUrl}/logout`, {}));
    } finally {
      this.currentUser.set(null);
      this.isAuthenticated.set(false);
    }
  }
}
