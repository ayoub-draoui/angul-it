export enum ChallengeType {
  IMAGE_SELECTION = 'IMAGE_SELECTION',
  MATH = 'MATH',
  TEXT = 'TEXT',
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  question: string;
  points: number;
}