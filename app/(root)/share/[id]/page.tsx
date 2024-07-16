'use client'

import ChatMessages from '@/components/ChatMessages';
import { useChatContext } from '@/context/ChatContext'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect } from 'react'

const SharePage = ({params}: { params: { id: string } }) => {
    const {user} = useUser();
    const {state: chatState, dispatch, messages, setMessages} = useChatContext();
    const id = params.id;

    useEffect(() => {
        const fetchChats = async () => {
            const res = await axios.get('/api/chat/get', { params: { id: id } });
            setMessages(res.data.messages);
        }

        fetchChats();
    }, []);

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

  return (
    <section className="w-full h-full flex flex-col justify-center overflow-hidden">
      <div className="flex-1 overflow-y-auto w-full">
        {
        messages.length>0 && (
          <ChatMessages chatMessages={messages} />
        ) 
        }
      </div>
    </section>
  )
}

export default SharePage