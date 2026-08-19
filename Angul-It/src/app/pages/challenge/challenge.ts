import { Component, inject } from '@angular/core';
import { CaptchaState } from '../../services/captcha-state';

@Component({
  selector: 'app-challenge',
  imports: [],
  templateUrl: './challenge.html',
  styleUrl: './challenge.scss',
})
export class Challenge {
  protected readonly captchaState = inject(CaptchaState);
}