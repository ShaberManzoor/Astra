'use client';

import { TextareaAutosize } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { IoMdSend } from 'react-icons/io';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa6';

type InputFieldProps = {
  onsubmit: (input: string) => void;
};

const InputField = ({ onsubmit }: InputFieldProps) => {
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [interimTranscript, setInterimTranscript] = useState('');

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = 'en-IN';

      speechRecognition.onresult = (event) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        setInterimTranscript(interim);
        setInput(prevInput => prevInput + final + " ");
      };

      speechRecognition.onend = () => {
        setListening(false);
        setInterimTranscript('');
      };

      setRecognition(speechRecognition);
    } else {
      console.error('Browser does not support speech recognition');
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onsubmit(input);
    setInput('');
  };

  return (
    <div className="sticky flex flex-col bg-transparent items-center justify-center w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative w-full px-2 py-2 rounded-[26px] mb-1 mx-2 bg-[#FEF5EA] dark:bg-[#202020] border border-[#ebdad1] dark:border-none z-20 flex items-center justify-center">
        <TextareaAutosize
          value={input + interimTranscript}
          onChange={(e) => setInput(e.target.value)}
          maxRows={7}
          placeholder="Message Astra"
          className="resize-none w-full outline-none text-black dark:text-white placeholder:text-gray-500 bg-transparent pl-4 scrollbar-track-thin dark:scrollbar-thumb-gray-500 scrollbar-thumb-yellow-500"
        />
        <div className='flex gap-1'>
          {listening ? (
            <button
              type="button"
              onClick={stopListening}
              className="justify-center mx-auto dark:text-white text-black p-2 animate-pulse bg-blue-600 dark:bg-blue-400 rounded-full"
            >
              <FaMicrophoneSlash className="h-6 w-6" />
            </button>
          ) : (
            <button
              type="button"
              onClick={startListening}
              className="justify-center mx-auto text-black dark:text-white p-2"
            >
              <FaMicrophone className="h-6 w-6" />
            </button>
          )}
          {input !== '' && (
            <button type="submit" className="justify-center mx-auto text-black dark:text-white p-1 transition ease-in-out">
              <IoMdSend className="h-7 w-7" />
            </button>
          )}
        </div>
      </form>
      <p className='text-gray-400 text-[12px] my-1'>Astra may display inaccurate info , including about people.</p>
    </div>
  );
};

export default InputField;
