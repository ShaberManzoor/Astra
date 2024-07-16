'use client'

import SyntaxHighlighter from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Skeleton } from './ui/skeleton';
import { useChatContext } from '@/context/ChatContext';
import { useEffect, useRef, useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatMessagesProps = {
  chatMessages: Message[];
};

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split(/(```[\s\S]*?```)/).filter(block => block.trim() !== "");
    return blocks;
  }
  return [message];
}

function isCodeBlock(str: string) {
  return /^```[\s\S]*```$/.test(str);
}



const ChatMessages = ({ chatMessages }: ChatMessagesProps) => {
  const { state: chatState, messages } = useChatContext();
  const latestMessageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  useEffect(() => {
    console.log('Messages updated:', messages);  // Add this line
  }, [messages]);
  return (
    <>
      <div className="w-full mx-auto max-w-3xl flex flex-col gap-2 px-2 my-1">
        {chatMessages.map((message, index) => {
          const messageBlocks = extractCodeFromString(message.content);
          return message.role === 'user' ? (
            <div key={index} className="flex justify-end w-full">
              <div className="bg-[#FEF5EA] dark:bg-[#202020] w-fit max-w-2xl rounded-b-[26px] rounded-l-[26px] px-4 py-3 text-black dark:text-[#f5f5f5] p-2">
                {message.content}
              </div>
            </div>
          ) : (
            <div key={index} className="flex w-full px-2 justify-start mx-auto">
              <div className="max-w-3xl prose dark:prose-invert text-black dark:text-[#f5f5f5] px-2">
                {messageBlocks.map((block, ind) =>
                  isCodeBlock(block) ? (
                    <div className="w-full overflow-x-auto px-2" key={ind}>
                      <SyntaxHighlighter style={dracula} language="javascript">
                        {block.replace(/```/g, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <div key={ind}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {block}
                      </ReactMarkdown>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
        {chatState.loading && (
          <div className="px-2">
            <Skeleton className="w-full h-4 bg-slate-200 dark:bg-gray-400 rounded-[5px] my-1" />
            <Skeleton className="w-full h-4 bg-slate-200 dark:bg-gray-400 rounded-[5px] my-1" />
            <Skeleton className="w-1/2 h-4 bg-slate-200 dark:bg-gray-400 rounded-[5px] my-1" />
          </div>
        )}
      <div ref={latestMessageRef} />
      </div>
    </>
  );
};

export default ChatMessages;
