export enum ChallengeType {
  IMAGE_SELECTION = 'IMAGE_SELECTION',
  MATH = 'MATH',
  TEXT = 'TEXT',
}

export interface Challenge {
  id: string
  type: ChallengeType
  question: string
  points: number
}

export interface ImageSelectionChallenge  {
        id : string 
        type: ChallengeType.IMAGE_SELECTION;
        questtion: string;
        points: number;
        // images: ImageOption[];
}

  export interface MathChallenge  {
        id : string ;
        type: ChallengeType.MATH;
        question: string;
        points: number;
        answer: number;
}
