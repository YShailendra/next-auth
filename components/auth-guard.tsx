'use client';

import { redirect } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import React from 'react';

type AuthGuardProps = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin');
    },
  });

  if (status === 'loading') {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }
  
  return (
    <>
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 w-full bg-white border-b z-50 h-[64px] px-6 md:px-8 flex items-center justify-between shadow-sm">
        <span className="text-sm text-gray-700">
          Welcome, <strong>{session?.user?.email ?? 'User'}</strong>
        </span>
        <button
          onClick={()=>signOut({ callbackUrl: "/" })}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <main>{children}</main>
    </>
  );
};

