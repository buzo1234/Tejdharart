import {
  useEffect,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { UserReducer, initialState } from './UserReducer';

const UserContext = createContext();

export function UserWrapper({ children }) {
  const [state, dispatch] = useReducer(UserReducer, initialState, () => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('state')) {
        return {
          user: localStorage.getItem('state').user
            ? JSON.parse(localStorage.getItem('state')).user
            : {
                userAvailable: false,
                userDetails: {
                  userName: null,
                  userPhone: null,
                },
              },
        };
      } else {
        return {
          user: {
            userAvailable: false,
            userDetails: {
              userName: null,
              userPhone: null,
            },
          },
        };
      }
    }
  });

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
    if (
      localStorage.getItem('state') !== undefined
        ? JSON.parse(localStorage.getItem('state'))
        : false
    ) {
      dispatch({
        type: 'init_stored',
        value: JSON.parse(localStorage.getItem('state')),
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem('state', JSON.stringify(state));
    }
  }, [state]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
