import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { CoodinateTrackerViewProps } from './CoodinateTracker.types';

const NativeView: React.ComponentType<CoodinateTrackerViewProps> =
  requireNativeViewManager('CoodinateTracker');

export default function CoodinateTrackerView(props: CoodinateTrackerViewProps) {
  return <NativeView {...props} />;
}
