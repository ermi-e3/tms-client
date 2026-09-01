// export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
//   const auth = inject(AuthService);
//   const token = auth.getAccessToken();
//   if (token) {
//     const cloned = req.clone({
//       setHeaders: { Authorization: `Bearer ${token}` },
//     });
//     return next(cloned);
//   }
//   return next(req);
// };

import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getAccessToken();

  console.log('JWT INTERCEPTOR:', req.url);
  console.log('ACCESS TOKEN:', token);

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log('Authorization header added');

    return next(cloned);
  }

   console.log('NO ACCESS TOKEN');
  return next(req);
};
