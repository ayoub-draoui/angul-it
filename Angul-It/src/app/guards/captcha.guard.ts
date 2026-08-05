import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { CaptchaStateService } from '../services/captcha-state.service';

export const captchaCompletedGuard: CanActivateFn = () => {
  const stateService = inject(CaptchaStateService);
  const router = inject(Router);

  if (stateService.isCompleted()) {
    return true;
  }

  const session = stateService.session();
  if (session) {
    return router.createUrlTree(['/captcha']);
  }

  return router.createUrlTree(['/']);
};