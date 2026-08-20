import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CaptchaState } from '../../services/captcha-state';

@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.html',
  styleUrl: './result.scss',
})
export class Result {
  protected readonly captchaState = inject(CaptchaState);

  private readonly router = inject(Router);

  protected restart(): void {
    this.captchaState.startNewSession();
    this.router.navigate(['/challenge']);
  }
}