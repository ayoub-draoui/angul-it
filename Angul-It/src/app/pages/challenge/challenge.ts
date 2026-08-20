import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { ChallengeType } from '../../models/challenges.model';
import { CaptchaState } from '../../services/captcha-state';

@Component({
  selector: 'app-challenge',
  imports: [],
  templateUrl: './challenge.html',
  styleUrl: './challenge.scss',
})
export class Challenge {
  protected readonly captchaState = inject(CaptchaState);
  protected readonly ChallengeType = ChallengeType;
 protected readonly mathAnswer = new FormControl<number | null>(
    null,
    Validators.required
  );


  protected readonly textAnswer = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  protected readonly selectedImageIds = new Set<string>();

  protected get challenge() {
    return this.captchaState.getCurrentChallenge();
  }

  protected toggleImage(imageId: string): void {
    if (this.selectedImageIds.has(imageId)) {
      this.selectedImageIds.delete(imageId);
    } else {
      this.selectedImageIds.add(imageId);
    }
  }
    protected verifyMath(): void {
    if (this.challenge.type !== ChallengeType.MATH) {
      return;
    }

    if (this.mathAnswer.invalid) {
      this.mathAnswer.markAsTouched();
      return;
    }

    if (this.mathAnswer.value !== this.challenge.answer) {
      console.log('Wrong answer');
      return;
    }

    this.captchaState.addPoints(this.challenge.points);

    this.mathAnswer.reset();

    this.captchaState.nextChallenge();
  }


  protected verifyImageSelection(): void {
  if (this.challenge.type !== ChallengeType.IMAGE_SELECTION) {
    return;
  }

  const correctIds = new Set(
    this.challenge.images
      .filter(image => image.correct)
      .map(image => image.id)
  );

  const selectedIds = this.selectedImageIds;

  const isCorrect =
    selectedIds.size === correctIds.size &&
    [...selectedIds].every(id => correctIds.has(id));

  if (!isCorrect) {
    console.log('Wrong answer');
    return;
  }

  this.captchaState.addPoints(this.challenge.points);
  this.selectedImageIds.clear();

  this.captchaState.nextChallenge();
}

  protected isSelected(imageId: string): boolean {
    return this.selectedImageIds.has(imageId);
  }


  protected verifyText(): void {
    if (this.challenge.type !== ChallengeType.TEXT) {
      return;
    }

    if (this.textAnswer.invalid) {
      this.textAnswer.markAsTouched();
      return;
    }

    const answer = this.textAnswer.value?.trim().toUpperCase();

    if (answer !== this.challenge.verificationText.toUpperCase()) {
      console.log('Wrong answer');
      return;
    }

    this.captchaState.addPoints(this.challenge.points);

    this.textAnswer.reset();

    this.captchaState.nextChallenge();
  }
}