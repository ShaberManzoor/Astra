// page.tsx
'use client';

import ChatMessages from '@/components/ChatMessages';
import InputField from '@/components/InputField';
import { getAiRes, getChatTitle } from '@/lib/actions/chat.actions';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import HomeStarter from '@/components/HomeStarter';
import { useChatContext } from '@/context/ChatContext';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function HomePage() {
  const {user} = useUser();
  const {dispatch, messages, setMessages} = useChatContext();
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleFormSubmit = async (input: string) => {
    const newUserMessage: Message = { role: "user", content: input };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    try {
      dispatch({type: 'SET_LOADING', payload: true})

      const aiRes = await getAiRes(input);
      const title = await getChatTitle(input);
      const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
      
      const newAiMessage: Message = { role: "assistant", content: aiRes };
      dispatch({type: 'SET_LOADING', payload: false});
      setMessages(prevMessages => [...prevMessages, newAiMessage]);

      if (user) {
         const response = await axios.post('/api/chat/create', {
           userId: user.id,
           message: [newUserMessage, newAiMessage],
           title: capitalizedTitle
         });

         const chatId = response.data.chatId;
         const newChat = {
           id: chatId,
           userId: user.id,
           title: capitalizedTitle,
           messages: [newUserMessage, newAiMessage],
         };
        dispatch({type: 'ADD_CHAT', payload: newChat});
        router.push(`/chat/${chatId}`)
       } 
       } catch (error: any) {
        dispatch({type: 'SET_LOADING', payload: false});
        setMessages(prevMessages => [...prevMessages, {role: 'assistant', content: 'Irrelevant Chat! Please ask something else'}]);
        dispatch({type: 'SET_ERROR', payload: error})
        console.error('Failed to create chat:', error);
       }
  };

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

    fetchUserChats();
  }, [dispatch, user]);

  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);


  return (
    <section className="w-full h-full flex flex-col justify-center overflow-hidden">
      <div className="flex-1 overflow-y-auto w-full">
        {
        messages.length>0 ? (
          <ChatMessages chatMessages={messages} />
        ) : (
          <HomeStarter />
        )
        }
      </div>
      <div ref={latestMessageRef} />
      <InputField onsubmit={handleFormSubmit} />
    </section>
  );
}