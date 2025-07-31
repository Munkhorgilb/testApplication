import React, { createContext, useContext } from 'react';
import { toast } from 'sonner-native';

export const AlertContext = createContext({} as IAlert);
const { Provider } = AlertContext;

export type TAction = {
  onPress: () => void;
  label: string;
};

export interface IAlert {
  error: (message: string) => void;
  success: (message: string) => void;
  info: (message: string) => void;
  warn: (message: string) => void;
}

function AlertProvider({ children }: any) {
  const mContext: IAlert = {
    error: (message: string) =>
      toast.error(message, {
        duration: 1000,
      }),
    success: (message: string) =>
      toast.success(message, {
        duration: 1000,
      }),
    info: (message: string) =>
      toast.info(message, {
        duration: 1000,
      }),
    warn: (message: string) =>
      toast.warning(message, {
        duration: 1000,
      }),
  };

  return <Provider value={mContext}>{children}</Provider>;
}

export default AlertProvider;

export const useAlert = () => useContext(AlertContext);
