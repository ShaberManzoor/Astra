'use client'

import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { questions } from '@/constants/random'
import Card from './Card'

const HomeStarter = () => {
    const {user} = useUser();
    const [randomQues, setReandomQues] = useState<any []>([]);

    useEffect(() => {
        function getRandomQuestions(questions: any, count: number) {
            const shuffled = questions.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }
        setReandomQues(getRandomQuestions(questions, 4));
    }, [])

  return (
    <motion.div className='h-full flex items-center justify-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }} 
    >
        <div className='mx-auto'>
            <div className='greet text-3xl md:text-5xl mb-5 px-2'>
                <p>
                    {user ? 
                    <span>
                        Hello, {user.firstName || user.username}
                    </span> : 
                    <span>
                        Build with Gemini    
                    </span>}
                </p>
                <p>How can I help you today?</p>
            </div>
            <div className="mx-3 mt-12 flex max-w-3xl flex-wrap items-stretch justify-center gap-4">
                {/* <div className="dark:text-[#f5f5f5] h-[120px] max-w-[180px] relative p-2 rounded-[10px] border border-blue-500 dark:bg-[#202020] dark:hover:bg-[#101415] hover:bg-[#FEF5EA] hover:cursor-pointer">
                    <p>What is the Capital of India?</p>
                    <img src='/compass_icon.png' alt="" className='absolute bottom-2.5 right-2.5 p-0.5 w-[32px] rounded-full border border-[#ebdad1] bg-[#f4f4f4]' />
                </div>
                <div className="dark:text-[#f5f5f5] h-[120px] max-w-[180px] relative p-2 rounded-[10px] dark:bg-[#202020] border border-red-500 dark:hover:bg-[#101415] hover:bg-[#FEF5EA] hover:cursor-pointer">
                    <p>Suggest good Array problems</p>
                    <img src='/bulb_icon.png' alt="" className='absolute bottom-2.5 right-2.5 p-0.5 w-[32px] rounded-full border border-[#ebdad1] bg-[#f4f4f4]'/>
                </div>
                <div className="hidden sm:inline dark:text-[#f5f5f5] h-[120px] max-w-[180px] relative p-2 rounded-[10px] dark:bg-[#202020] border border-green-500 dark:hover:bg-[#101415] hover:bg-[#FEF5EA] hover:cursor-pointer">
                    <p>Where can i find Taj Mahal?</p>
                    <img src='/message_icon.png' alt="" className='absolute bottom-2.5 right-2.5 p-0.5 w-[32px] rounded-full border border-[#ebdad1] bg-[#f4f4f4]'/>
                </div>
                <div className="hidden md:inline dark:text-[#f5f5f5] h-[120px] max-w-[180px] relative p-2 rounded-[10px] dark:bg-[#202020] border border-orange-400 dark:hover:bg-[#101415] hover:bg-[#FEF5EA] hover:cursor-pointer">
                    <p>Give me tips for becoming good web developer</p>
                    <img src='/code_icon.png' alt="" className='absolute bottom-2.5 right-2.5 p-0.5 w-[32px] rounded-full border border-[#ebdad1] bg-[#f4f4f4]' />
                </div> */}
                {randomQues.length >= 4 && (
                  <>
                    <div className='flex max-w-3xl flex-wrap items-stretch justify-center gap-4'>
                        <Card desc={randomQues[0].question} icon={randomQues[0].icon} color={randomQues[0].color} />
                        <Card desc={randomQues[1].question} icon={randomQues[1].icon} color={randomQues[1].color} />
                    </div>
                    <div className='hidden sm:inline-flex max-w-3xl flex-wrap items-stretch justify-center gap-4'>
                        <Card desc={randomQues[2].question} icon={randomQues[2].icon} color={randomQues[2].color} />
                        <Card desc={randomQues[3].question} icon={randomQues[3].icon} color={randomQues[3].color} />
                    </div>
                  </>
                )}
            </div>
        </div>
    </motion.div>
  )
}

export default HomeStarter