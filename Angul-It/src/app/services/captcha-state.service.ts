import { Injectable, signal, computed, effect } from '@angular/core';
import { CaptchaSession, StageType, ImageTile, ImageStageData, MathStageData, TextStageData } from '../models/captcha.model';

const STORAGE_KEY = 'angul_it_captcha_session';

@Injectable({
  providedIn: 'root'
})
export class CaptchaStateService {
  // Signal holding current session
  readonly session = signal<CaptchaSession | null>(this.loadSessionFromStorage());

  // Derived signal computation
  readonly isCompleted = computed(() => this.session()?.isCompleted ?? false);
  readonly currentStage = computed(() => {
    const s = this.session();
    if (!s) return null;
    return s.stages[s.currentStageIndex] || null;
  });

  constructor() {
    // Automatically keep localStorage in sync when signal changes
    effect(() => {
      const current = this.session();
      if (current) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    });
  }

  startNewSession(): void {
    const newSession: CaptchaSession = {
      sessionId: 'sess_' + Math.random().toString(36).substring(2, 9),
      currentStageIndex: 0,
      stages: ['image', 'math', 'text'],
      imageStageData: this.generateImageStage(),
      mathStageData: this.generateMathStage(),
      textStageData: this.generateTextStage(),
      stageResults: {},
      startTime: Date.now(),
      isCompleted: false
    };

    this.session.set(newSession);
  }

  validateCurrentStage(isCorrect: boolean): void {
    const current = this.session();
    if (!current) return;

    const currentType = current.stages[current.currentStageIndex];
    const updatedResults = { ...current.stageResults, [currentType]: isCorrect };

    this.session.set({
      ...current,
      stageResults: updatedResults
    });
  }

  nextStage(): void {
    const current = this.session();
    if (!current) return;

    const nextIdx = current.currentStageIndex + 1;
    if (nextIdx >= current.stages.length) {
      this.session.set({
        ...current,
        isCompleted: true,
        endTime: Date.now()
      });
    } else {
      this.session.set({
        ...current,
        currentStageIndex: nextIdx
      });
    }
  }

  previousStage(): void {
    const current = this.session();
    if (!current || current.currentStageIndex === 0) return;

    this.session.set({
      ...current,
      currentStageIndex: current.currentStageIndex - 1
    });
  }

  resetSession(): void {
    this.session.set(null);
  }

  private loadSessionFromStorage(): CaptchaSession | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  // Helper generators
  private generateImageStage(): ImageStageData {
    const targets = ['traffic lights', 'cats', 'bicycles'];
    const selectedTarget = targets[Math.floor(Math.random() * targets.length)];
    
    // Generate 9 tiles with random targets
    const tiles: ImageTile[] = Array.from({ length: 9 }, (_, i) => {
      const hasTarget = Math.random() > 0.5;
      return {
        id: i + 1,
        url: `https://picsum.photos/seed/${selectedTarget}_${i + 1}/150/150`,
        hasTarget,
        selected: false
      };
    });

    return { targetObject: selectedTarget, tiles };
  }

  private generateMathStage(): MathStageData {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const ops: ('+' | '-' | '*')[] = ['+', '-', '*'];
    const operator = ops[Math.floor(Math.random() * ops.length)];
    
    let expectedAnswer = 0;
    if (operator === '+') expectedAnswer = num1 + num2;
    if (operator === '-') expectedAnswer = num1 - num2;
    if (operator === '*') expectedAnswer = num1 * num2;

    return { num1, num2, operator, expectedAnswer };
  }

  private generateTextStage(): TextStageData {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let text = '';
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return { distortedText: text };
  }
}