import { useChatContext } from '@/context/ChatContext';
import Link from 'next/link';
import React from 'react'
import { FiPlus } from "react-icons/fi";

const NewChat = () => {
  const {setMessages} = useChatContext();

  const handleClick = () => {
    setMessages([]);
  }
  return (
    <Link href='/'>
      <div className='mt-1 border-2 dark:border-slate-200 border-black rounded-[5px] p-2 w-fit'>
          <button className='flex items-center gap-2' onClick={handleClick}>
              <FiPlus className='dark:text-[#EEEEEE] h-6 w-6' />
              <span className='dark:text-[#EEEEEE]'>New Chat</span>
          </button>
      </div>
    </Link>
  )
}

export default NewChat