import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to CoodinateTracker.web.ts
// and on native platforms to CoodinateTracker.ts
import CoodinateTrackerModule from './src/CoodinateTrackerModule';

export interface Observation {
  frameTime: string;
  x: number;
  y: number;
  height: number;
  confidence: number;
  width: number;
  class: string;
  color: number[];
}

export function initializeAI(): Promise<void> {
  return CoodinateTrackerModule.initializeAI();
}

export function getCoordinates(filePath: string): Promise<Observation[]> {
  return CoodinateTrackerModule.getCoordinates(filePath);
}
