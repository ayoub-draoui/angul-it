export enum ChallengeType {
  IMAGE_SELECTION = 'IMAGE_SELECTION',
  MATH = 'MATH',
  TEXT = 'TEXT',
}

export interface ImageOption {
  id: string;
  src: string;
  alt: string;
  correct: boolean;
}


// export interface Challenge {
//   id: string
//   type: ChallengeType
//   question: string
//   points: number
// }

export interface ImageSelectionChallenge  {
        id : string 
        type: ChallengeType.IMAGE_SELECTION;
        questtion: string;
        points: number;
        images: ImageOption[];
}

  export interface MathChallenge  {
        id : string ;
        type: ChallengeType.MATH;
        question: string;
        points: number;
        expression: string;
        answer: number;
}

export interface TextChallenge {
  id: string;
  type: ChallengeType.TEXT;
  question: string;
  points: number;
  verificationText: string;
}

export type Challenge = ImageSelectionChallenge | MathChallenge | TextChallenge;
