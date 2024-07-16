'use client'

import React from 'react'
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import NewChat from './NewChat';
import axios from 'axios';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { useChatContext } from '@/context/ChatContext';
import { useParams, useRouter } from 'next/navigation';
import ChatOptions from './ChatOptions';
import { useSidebarContext } from '@/context/SidebarContext';

const Sidebar = () => {
  const router = useRouter();
  const {state: chatState, dispatch, setMessages} = useChatContext();
  const {isSidebarVisible, setIsSidebarVisible} = useSidebarContext();
  const {id} = useParams();
  
  const handleDelete = async (chat_id: string) => {
    console.log(chat_id);
    console.log(id);
    
    try {
      await axios.delete(`/api/chat/delete`, { params: { chat_id } });
      dispatch({ type: 'REMOVE_CHAT', payload: chat_id });
      if(chat_id===id){
        setMessages([]);
        console.log('Going home');
        router.push('/');
      }
    } catch (error) {
      console.log("Failed to delete chat:", error);
    }
  };

  const handleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  }

  return (
    <div className={`transition-all duration-300 ${isSidebarVisible ? 'w-64' : 'w-0'} overflow-hidden`}>
      <div className='flex flex-col px-2 bg-[#FEF5EA] dark:bg-[#202020] h-full w-full'>
        <div className='py-2 mt-0.5 flex justify-between items-center'>
          <TbLayoutSidebarLeftCollapseFilled className='h-6 w-6 hover:cursor-pointer' onClick={handleSidebar} />
          <ModeToggle />
        </div>
        <NewChat />
          <div className='mt-2 scrollbar-track-thin dark:scrollbar-thumb-gray-500 overflow-y-auto'>
            {chatState.chats.map((chat, ind) => (
              <div key={ind} className={`${chat.id === id && 'bg-[#EBDAD1] dark:bg-[#1A1A1A]'} flex justify-between items-center hover:bg-[#ebdad1] dark:hover:bg-[#1A1A1A] rounded-[5px] w-full px-2`}>
                <Link href={`/chat/${chat.id}`} key={chat.id} className='py-2 flex-1 overflow-hidden' >
                  <div className='text-gray-900 dark:text-[#F5F5F5] overflow-hidden whitespace-nowrap flex-1'>
                      {chat.title}
                  </div>
                </Link>
                <ChatOptions 
                  chatLink={`${window.location.origin}/share/${chat.id}`}
                  onDelete={() => handleDelete(chat.id)}
                />
              </div>
            ))}
          </div>
      </div>
    </div>
  )
}

export default Sidebar