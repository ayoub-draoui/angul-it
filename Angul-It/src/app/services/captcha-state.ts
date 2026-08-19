import { Injectable, signal } from '@angular/core';

import { CHALLENGES } from '../data/challenges';
import { CaptchaSession } from '../models/captcha-session.model';

@Injectable({
  providedIn: 'root',
})
export class CaptchaState {
  private  readonly session = signal<CaptchaSession>({
    challenges: CHALLENGES,
    currentChallengeIndex: 0,
    score: 0,
    completed: false,
  });
  readonly theSessionDyalDaba= this.session.asReadonly();
 


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
      const lCurrent = this.session().currentChallengeIndex;
      const  theNext = lCurrent + 1;
      if (theNext < this.session().challenges.length) {
        this.session.update((state) => ({
          ...state,
          completed: true,
        }));
        return 
      }
      this.session.update((state) => ({
        ...state,
        currentChallengeIndex: theNext,
      }));
    }



    addPoints(): void {
  this.session.update((state) => ({
    ...state,
    score: state.score + 5,
  }));
}
}

