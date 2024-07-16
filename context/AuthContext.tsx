'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import axios from 'axios';

type User = {
  _id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

type AuthAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false, error: null };
    case 'LOGOUT':
      return { ...state, user: null, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  // if (!context) {
  //   throw new Error('useAuthContext must be used within an AuthProvider');
  // }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/user/get-user');
        dispatch({ type: 'SET_USER', payload: res.data.data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load user' });
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};