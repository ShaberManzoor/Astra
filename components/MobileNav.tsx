'use client';

import React from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import NewChat from './NewChat';
import axios from 'axios';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { useChatContext } from '@/context/ChatContext';
import { useParams, useRouter } from 'next/navigation';
import ChatOptions from './ChatOptions';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'; // Ensure these are the correct imports for Shadcn components

const MobileNav = () => {
  const router = useRouter();
  const { state: chatState, dispatch } = useChatContext();
  const { id } = useParams();

  const handleDelete = async (chat_id: string) => {
    try {
      await axios.delete(`/api/chat/delete`, { params: { chat_id } });
      dispatch({ type: 'REMOVE_CHAT', payload: chat_id });
      if (chat_id === id) {
        router.push('/');
      }
    } catch (error) {
      console.log("Failed to delete chat:", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='p-2'>
          <HiOutlineMenuAlt3 size={20} />
        </button>
      </SheetTrigger>
      <SheetContent side='left' className='h-screen px-2 py-0 w-64 bg-[#FEF5EA] dark:bg-[#202020]'>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>
        <div className='flex flex-col h-full w-full'>
          <div className='py-2 mt-0.5 flex justify-between items-center'>
            <ModeToggle />
          </div>
          <NewChat />
          <div className='mt-2 w-full scrollbar-track-thin dark:scrollbar-thumb-gray-500 overflow-y-auto'>
            {chatState.chats.map((chat, ind) => (
              <div key={ind} className={`${chat.id === id ? 'bg-[#EBDAD1] dark:bg-[#1A1A1A]' : ''} flex justify-between items-center hover:bg-[#ebdad1] dark:hover:bg-[#1A1A1A] rounded-[5px] w-full px-2`}>
                <Link href={`/chat/${chat.id}`} key={chat.id} className='py-2 flex-1 overflow-hidden'>
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
