'use client';

import { useEffect } from 'react';
import axios from 'axios';
import ChatMessages from '@/components/ChatMessages';
import InputField from '@/components/InputField';
import { getAiRes } from '@/lib/actions/chat.actions';
import { useChatContext } from '@/context/ChatContext';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const {state: chatState, dispatch, messages, setMessages} = useChatContext();
  const {user} = useUser();
  const id = params.id;
  const chat = chatState.chats.find(chat => chat.id === id);
  
  useEffect(()=> {
    if(chat?.userId !==  user?.id){
      router.push('/');
    }
  }, [chat, user]);

  useEffect(() => {
    const fetchUserChats = async () => {
      if (user) {
        console.log('Fetching chats for user:', user.id);
        try {
          const res2 = await axios.get('/api/chat/get-all', { params: { id: user.id } });
          dispatch({ type: 'SET_CHATS', payload: res2.data.chats });
        } catch (error) {
          console.log("Failed to load chats:", error);
        }
      }
    };

    if(user && chatState.chats.length===0){
      fetchUserChats();
    }

  }, [user,chatState.chats.length, dispatch]);

    useEffect(() => {
      if (chat) {
        setMessages(chat.messages);
      }
    }, [chat, setMessages]);

  const handleFormSubmit = async (input: string) => {
    const newUserMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, newUserMessage]);
  
    try {
      dispatch({type: 'SET_LOADING', payload: true})
      const aiRes = await getAiRes(input);
      const newAiMessage: Message = { role: 'assistant', content: aiRes };
      dispatch({type: 'SET_LOADING', payload: false});
      setMessages(prev => [...prev, newAiMessage]);
      dispatch({ type: 'ADD_MESSAGE', payload: { chatId: id, message: newUserMessage } });
      dispatch({ type: 'ADD_MESSAGE', payload: { chatId: id, message: newAiMessage } });
      await axios.post('/api/chat/save', { chatId: id, messages: [newUserMessage, newAiMessage] });
    } catch (error: any) {
      dispatch({type: 'SET_LOADING', payload: false});
      setMessages(prev => [...prev, {role: 'assistant', content: 'Irrelevant Chat! Please ask something else'}]);
      dispatch({ type: 'ADD_MESSAGE', payload: { chatId: id, message: {role: 'assistant', content: 'Irrelevant Chat! Please ask something else'} } });      
      dispatch({type: 'SET_ERROR', payload: error})
      console.error('Failed to handle form submit:', error);
    }
  };

  return (
    <section className="w-full h-full flex flex-col justify-center overflow-hidden">
      <div className="flex-1 overflow-y-auto w-full">
        {chat && <ChatMessages chatMessages={messages} />}
      </div>
      <InputField onsubmit={handleFormSubmit} />
    </section>
  );
}
