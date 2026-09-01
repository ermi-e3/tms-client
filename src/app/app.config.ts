// import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
// import { provideRouter, withComponentInputBinding } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { routes } from './app.routes';
// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZonelessChangeDetection(),
//     provideRouter(routes, withComponentInputBinding()),
//     provideHttpClient(),
//   ],
// };

// import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
// import { provideRouter, withComponentInputBinding } from '@angular/router';
// import {
//   provideHttpClient,
//   withInterceptors,
//   withXsrfConfiguration,
// } from '@angular/common/http';

// import { routes } from './app.routes';
// import { credentialsInterceptor } from './interceptors/credentials.interceptor';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZonelessChangeDetection(),

//     provideRouter(
//       routes,
//       withComponentInputBinding()
//     ),

//     provideHttpClient(
//       withInterceptors([
//         credentialsInterceptor,
//       ]),

//       withXsrfConfiguration({
//         cookieName: 'XSRF-TOKEN',
//         headerName: 'X-XSRF-TOKEN',
//       }),
//     ),
//   ],
// };

import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';

import { provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';

import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { credentialsInterceptor } from './interceptors/credentials.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { AuthService } from './services/auth.service';
import { jwtInterceptor } from './interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),

    provideRouter(routes, withComponentInputBinding()),

    // provideHttpClient(
    //   withInterceptors([credentialsInterceptor]),
    //   withXsrfConfiguration({
    //     cookieName: 'XSRF-TOKEN',
    //     headerName: 'X-XSRF-TOKEN',
    //   }),
    // ),
    // provideHttpClient(
    //   withInterceptors([credentialsInterceptor, errorInterceptor]),
    //   withXsrfConfiguration({
    //     cookieName: 'XSRF-TOKEN',
    //     headerName: 'X-XSRF-TOKEN',
    //   }),
    // ),

    provideHttpClient(
      withInterceptors([credentialsInterceptor, jwtInterceptor, errorInterceptor]),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      }),
    ),

    // provideAppInitializer(() => {
    //   const authService = inject(AuthService);

    //   return authService.initializeXsrf();
    // }),
  ],
};
