import { Challenge } from './challenges.model';

export interface CaptchaSession {
  challenges: Challenge[];
  currentChallengeIndex: number;
  score: number;
  completed: boolean;
}