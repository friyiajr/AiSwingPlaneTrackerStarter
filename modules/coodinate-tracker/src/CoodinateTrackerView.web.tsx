import * as React from 'react';

import { CoodinateTrackerViewProps } from './CoodinateTracker.types';

export default function CoodinateTrackerView(props: CoodinateTrackerViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
