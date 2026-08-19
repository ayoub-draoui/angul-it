import { Injectable, signal } from '@angular/core';

import { CHALLENGES } from '../data/challenges';
import { CaptchaSession } from '../models/captcha-session.model';

@Injectable({
  providedIn: 'root',
})
export class CaptchaState {
  private readonly session = signal<CaptchaSession>({
    challenges: CHALLENGES,
    currentChallengeIndex: 0,
    score: 0,
    completed: false,
  });
readonly sessionState = this.session.asReadonly();


  stertNewSession() {
    this.session.set({
      challenges: [...CHALLENGES],
      currentChallengeIndex: 0,
      score: 0,
      completed: false,
    })
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
  }



  addPoints( points :number): void {
    this.session.update((state) => ({
      ...state,
      score: state.score + points,
    }));
  }
}

