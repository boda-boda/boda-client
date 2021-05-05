import { createContext, useReducer, useContext } from 'react';
import { CareCenter } from '../model/care-center';

export const CareCenterStateContext = createContext({
  isValidating: true,
  isLoggedIn: false,
  isLoggedOut: false,
} as any);

export const CareCenterDispatchContext = createContext(null);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGOUT':
      return {
        isValidating: false,
        isLoggedIn: false,
        isLoggedOut: true,
      };
    case 'LOGIN':
      return { ...action.payload, isValidating: false, isLoggedIn: true, isLoggedOut: false };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const CareCenterProvider = ({ children, careCenter }) => {
  const [state, dispatch] = useReducer(reducer, careCenter);

  return (
    <CareCenterDispatchContext.Provider value={dispatch}>
      <CareCenterStateContext.Provider value={state}>{children}</CareCenterStateContext.Provider>
    </CareCenterDispatchContext.Provider>
  );
};

export const useCareCenter = (): CareCenter => useContext(CareCenterStateContext);
export const useCareCenterDispatch = () => useContext(CareCenterDispatchContext);
