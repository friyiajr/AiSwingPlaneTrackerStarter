import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to CoodinateTracker.web.ts
// and on native platforms to CoodinateTracker.ts
import CoodinateTrackerModule from './src/CoodinateTrackerModule';

export function initializeAI(): Promise<void> {
  return CoodinateTrackerModule.initializeAI();
}
