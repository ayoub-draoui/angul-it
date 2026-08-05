export type StageType = 'image' | 'math' | 'text';

export interface ImageTile {
  id: number;
  url: string;
  hasTarget: boolean;
  selected?: boolean;
}

export interface ImageStageData {
  targetObject: string;
  tiles: ImageTile[];
}

export interface MathStageData {
  num1: number;
  num2: number;
  operator: '+' | '-' | '*';
  expectedAnswer: number;
}

export interface TextStageData {
  distortedText: string;
}

export interface CaptchaSession {
  sessionId: string;
  currentStageIndex: number;
  stages: StageType[];
  imageStageData: ImageStageData;
  mathStageData: MathStageData;
  textStageData: TextStageData;
  stageResults: { [key in StageType]?: boolean };
  startTime: number;
  endTime?: number;
  isCompleted: boolean;
}