'use client'

import dynamic from 'next/dynamic';
import Logo from "./Logo";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { HiOutlineMenuAlt2, HiOutlinePencilAlt } from "react-icons/hi";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useChatContext } from '@/context/ChatContext';
import { useSidebarContext } from '@/context/SidebarContext';
import MobileNav from './MobileNav';

// Dynamically import components that are client-side only
const SignedInComponent = dynamic(() => import("@clerk/nextjs").then(mod => mod.SignedIn), { ssr: false });
const SignedOutComponent = dynamic(() => import("@clerk/nextjs").then(mod => mod.SignedOut), { ssr: false });
const UserButtonComponent = dynamic(() => import("@clerk/nextjs").then(mod => mod.UserButton), { ssr: false });

const Header = () => {
  const { user } = useUser();
  const {setMessages} = useChatContext();
  const {isSidebarVisible, setIsSidebarVisible} = useSidebarContext();

  const handleClick = () => {
    setMessages([]);
  }

  const handleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  }

  return (
    <div className="sticky w-full bg-[#f5f5f5] dark:bg-[#101415] py-1 px-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center justify-between">
          {!isSidebarVisible && 
            <>
              {user ? 
                <>
                <button className='hidden md:inline' onClick={handleSidebar}>
                  <TbLayoutSidebarLeftExpandFilled className="h-[1.5rem] w-[1.5rem] hover:cursor-pointer" />
                </button>
                <div className='md:hidden'>
                  <MobileNav />
                </div>
                {/* <button onClick={handleSidebar} className='md:hidden'>
                  <HiOutlineMenuAlt2 className='h-[1.5rem] w-[1.5rem] hover:cursor-pointer' />
                </button> */}
                </>
                :
                <button onClick={handleClick}>
                  <HiOutlinePencilAlt className='dark:text-[#EEEEEE] h-6 w-6' />
                </button>
              }
              <ModeToggle />
            </>
          }
        </div>
        <div>
          <Logo />
        </div>
        <div>
          <SignedInComponent>              
            <div className="mt-1">
              <UserButtonComponent />
            </div>
          </SignedInComponent>
          <SignedOutComponent>
            <div className="flex gap-2 lg:gap-3 items-center justify-center mx-2">
              <Link href={'/sign-up'} className='nav-link my-3 border text-black dark:text-white border-[#ff0011] py-1 px-2 rounded-[5px]'>
                  Sign Up
              </Link>
              <Link href={'/sign-in'} className='nav-link hidden md:inline my-3 text-black dark:text-white bg-transparent border border-gray-400 py-1 px-2 rounded-[5px]'>
                  Log In
              </Link>
            </div>
          </SignedOutComponent>
        </div>
      </div>
    </div>
  )
}

export default Header;
