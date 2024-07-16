import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import {SlOptions} from 'react-icons/sl'
import { FaLink } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import useClipboard from 'react-use-clipboard';

const ChatOptions = ({ chatLink, onDelete }: { chatLink: string, onDelete: () => void }) => {
    const [isCopied, setCopied] = useClipboard(chatLink);
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className='cursor-pointer px-1'>
            <button className="cursor-pointer focus:outline-none">
              <SlOptions className="text-[12px] md:text-lg" />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='w-fit bg-[#f5f5f5] dark:bg-[#101415] border dark:border-[#202020] rounded-[5px]'>
            <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 dark:hover:bg-[#1A1A1A] cursor-pointer" onClick={setCopied}>
                <FaLink className='h-4 w-4' />
                <span>{isCopied ? 'Copied!' : 'Copy Link'}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 dark:hover:bg-[#1A1A1A] cursor-pointer" onClick={onDelete}>
                <MdOutlineDelete className='h-4 w-4 text-red-800' />
                <span className='text-red-800'>Delete Chat</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ChatOptions