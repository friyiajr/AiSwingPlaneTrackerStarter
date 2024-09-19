// import { Observation } from 'modules/ai-coordinate-tracker';
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';

type Props = {
  children: React.ReactNode;
};
type Context = {
  // observations: Observation[];
  // setObservations: Dispatch<SetStateAction<Observation[]>>;
  videoFile: string;
  setVideoFile: React.Dispatch<React.SetStateAction<string>>;
};

// Just find-replace "XContext" with whatever context name you like. (ie. DankContext)
const XContext = createContext<Context | null>(null);

export const XContextProvider = ({ children }: Props) => {
  // const [observations, setObservations] = useState<Observation[]>([]);
  const [videoFile, setVideoFile] = useState<string>('');

  const values = useMemo(() => {
    return { videoFile, setVideoFile };
  }, [videoFile, setVideoFile]);

  return <XContext.Provider value={values}>{children}</XContext.Provider>;
};

export const useXContext = () => {
  const context = useContext(XContext);

  if (!context) throw new Error('XContext must be called from within the XContextProvider');

  return context;
};
