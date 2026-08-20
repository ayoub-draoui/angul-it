import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { CaptchaState } from '../services/captcha-state';

export const captchaGuard: CanActivateFn = () => {
  const captchaState = inject(CaptchaState);
  const router = inject(Router);

  if (captchaState.sessionState().completed) {
    return true;
  }

  return router.createUrlTree(['/challenge']);
};