import { Injectable, signal } from '@angular/core';

import { CHALLENGES } from '../data/challenges';
import { CaptchaSession } from '../models/captcha-session.model';

@Injectable({
  providedIn: 'root',
})
export class CaptchaState {


constructor() {
  this.restoreSession();
}

  private readonly session = signal<CaptchaSession>({
    challenges: CHALLENGES,
    currentChallengeIndex: 0,
    score: 0,
    completed: false,
  });
  readonly sessionState = this.session.asReadonly();
  
  private readonly STORAGE_KEY = 'angul-it-session';


  private saveSession(): void {
  localStorage.setItem(
    this.STORAGE_KEY,
    JSON.stringify(this.session())
  );
}




private restoreSession(): void {
  const stored = localStorage.getItem(this.STORAGE_KEY);

  if (!stored) {
    return;
  }

  try {
    const session: CaptchaSession = JSON.parse(stored);
    this.session.set(session);
  } catch {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
  startNewSession() {
    this.session.set({
      challenges: [...CHALLENGES],
      currentChallengeIndex: 0,
      score: 0,
      completed: false,
    })
    this.saveSession();
  }


  getCurrentChallenge() {
    return this.session().challenges[this.session().currentChallengeIndex];
    // return this.session().challenges[currentIndex];
  }

  nextChallenge() {
    this.session.update((state) => {
      const lCurrent = this.session().currentChallengeIndex
      const theNext = lCurrent + 1
      if (theNext >= this.session().challenges.length) {

        return {
          ...state,
          completed: true,
        }
      }
      return {
        ...state,
        currentChallengeIndex: theNext,
      }
    });
    this.saveSession();
  }



  addPoints( points :number): void {
    this.session.update((state) => ({
      ...state,
      score: state.score + points,
    }));
    this.saveSession();
  }
}

