'use client';

import apiClient from '@/lib/api';
import { LogOut, Scissors } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <div className="flex w-full items-center justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 px-2 sm:px-4 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border ">
        <span className="flex uppercase font-bold gap-1">
          <Scissors size={20} className="text-blue-600" />
          SCISSORS
        </span>

        <div className="flex font-bold gap-1">
          <span>Welcome,</span>
          {/* <span className="flex gap-2"> */}
          {/* <User size={20} className="text-blue-600" /> */}
          {'User Name'}
          {/* </span> */}
          <LogOut
            onClick={() => apiClient.logout()}
            size={20}
            className="ml-4 text-red-600 cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
