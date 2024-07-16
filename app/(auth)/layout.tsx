import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen dark:bg-[#222831] bg-[#f5f5f5] flex items-center justify-center">
        {children}
    </main>
  );
};

export default AuthLayout;
