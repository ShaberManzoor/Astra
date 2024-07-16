import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen flex bg-[#f5f5f5] dark:bg-[#101415]">
      <Sidebar />
      <div className='flex flex-col flex-1'>
        <Header />
        {children}
      </div>
    </main>
  );
};

export default RootLayout;
