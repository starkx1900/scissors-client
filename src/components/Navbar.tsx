'use client';

import { useAuth } from '@/context/AuthContext';
import { LogOut, Scissors } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="z-10 w-full max-w-5xl mx-auto flex items-center justify-between font-mono text-sm lg:flex border-b border-gray-300 bg-gradient-to-b from-zinc-200 px-2 sm:px-4 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border ">
      <Link href="/">
        <span className="flex uppercase font-bold gap-1">
          <Scissors size={20} className="text-blue-600" />
          SCISSORS
        </span>
      </Link>

      <div className="flex font-bold gap-1">
        <span>Welcome</span>
        {user && (
          <>
            {/* <span className="flex gap-2"> */}
            {/* <User size={20} className="text-blue-600" /> */}, {user.name}
            {/* </span> */}
            <LogOut
              onClick={logout}
              size={20}
              className="ml-4 text-red-600 cursor-pointer"
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
