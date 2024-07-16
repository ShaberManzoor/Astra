'use client'

import React, { createContext, useContext, useReducer, ReactNode, useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
}

type Chat = {
  id: string;
  userId: string;
  title: string;
  messages: Message[];
};

type ChatState = {
  chats: Chat[];
  loading: boolean;
  error: string | null;
};

type ChatAction =
  | { type: 'SET_CHATS'; payload: Chat[] }
  | { type: 'ADD_CHAT'; payload: Chat }
  | { type: 'REMOVE_CHAT'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: { chatId: string, message: Message } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_CHATS':
      return { ...state, chats: action.payload };
    case 'ADD_CHAT':
      return { ...state, chats: [action.payload, ...state.chats] };
    case 'REMOVE_CHAT':
      return { chats: state.chats.filter(chat => chat.id !== action.payload), loading: state.loading, error: state.error };
    case 'ADD_MESSAGE':
      return {
        ...state,
        chats: state.chats.map(chat => 
          chat.id === action.payload.chatId 
            ? { ...chat, messages: [...chat.messages, action.payload.message] }
            : chat
        )
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const initialState: ChatState = {
  chats: [],
  loading: false,
  error: null
};

type ChatContextType = {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <ChatContext.Provider value={{ state, dispatch, messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
