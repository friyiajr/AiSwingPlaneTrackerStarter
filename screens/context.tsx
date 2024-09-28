// import { Observation } from 'modules/ai-coordinate-tracker';
import { Observation } from 'modules/coodinate-tracker';
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
  observations: Observation[];
  setObservations: Dispatch<SetStateAction<Observation[]>>;
  videoFile: string;
  setVideoFile: React.Dispatch<React.SetStateAction<string>>;
};

const XContext = createContext<Context | null>(null);

export const XContextProvider = ({ children }: Props) => {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [videoFile, setVideoFile] = useState<string>('');

  const values = useMemo(() => {
    return { videoFile, setVideoFile, observations, setObservations };
  }, [videoFile, setVideoFile, observations, setObservations]);

  return <XContext.Provider value={values}>{children}</XContext.Provider>;
};

export const useXContext = () => {
  const context = useContext(XContext);

  if (!context) throw new Error('XContext must be called from within the XContextProvider');

  return context;
};
