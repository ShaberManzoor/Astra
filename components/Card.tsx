import { useChatContext } from '@/context/ChatContext';
import { getAiRes, getChatTitle } from '@/lib/actions/chat.actions';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Card = ({desc, icon, color}: {desc: string, icon: string, color: string}) => {
    const {user} = useUser();
    const {dispatch, setMessages} = useChatContext();
    const router = useRouter();

    const handleClick = async (input: string) => {
    const newUserMessage: Message = { role: "user", content: input };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    try {
      dispatch({type: 'SET_LOADING', payload: true})

      const aiRes = await getAiRes(input);
      const title = await getChatTitle(input);
      title[0].toUpperCase();
      
      const newAiMessage: Message = { role: "assistant", content: aiRes };
      setMessages(prevMessages => [...prevMessages, newAiMessage]);

     if (user) {
         const response = await axios.post('/api/chat/create', {
           userId: user.id,
           message: [newUserMessage, newAiMessage],
           title: title
         });

         const chatId = response.data.chatId;
         const newChat = {
           id: chatId,
           userId: user.id,
           title: title,
           messages: [newUserMessage, newAiMessage],
         };
        
          // Redirect to the chat page
        dispatch({type: 'ADD_CHAT', payload: newChat});
        dispatch({type: 'SET_LOADING', payload: false})
        router.push(`/chat/${chatId}`)
       } 
       } catch (error: any) {
        dispatch({type: 'SET_ERROR', payload: error})
        console.error('Failed to create chat:', error);
       }
  };
  return (
    <div className={`dark:text-[#f5f5f5] h-30 w-40 relative p-2 rounded-[10px] dark:bg-[#202020] dark:hover:bg-[#101415] hover:bg-[#FEF5EA] hover:cursor-pointer`} style={{ borderColor: color, borderWidth: 1 }} onClick={() => handleClick(desc)}>
        <p>{desc}</p>
        <Image src={icon} alt="icon" className='absolute bottom-1 right-1 p-0.5 rounded-full border border-[#ebdad1] bg-[#f4f4f4] break-words' width={20} height={20} />
    </div>
  )
}

export default Card