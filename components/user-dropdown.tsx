"use client";

import Link from "next/link";
import Image from 'next/image';


import { useState } from "react";
import { signOut } from "next-auth/react";
import { LayoutDashboard, LogOut } from "lucide-react";
import Popover from "@/components/popover";
//import Image from "next/image";
import { signIn, useSession } from 'next-auth/react';

import { Session } from "next-auth";


export default function UserDropdown({ session }: { session: Session }) {
  const { email, image } = session?.user || {};
  const [openPopover, setOpenPopover] = useState(false);

  if (!email) return null;

  //console.log('Contenido de session:', ////email); // Agrega este log


  return (
    
    <div className="relative inline-block text-left">
      <Popover
        
        content={
          
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            {
              
              <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
            >
              <Link href="dashboard">
                <div className="flex items-center justify-start space-x-2 relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100">
                  <LayoutDashboard className="h-4 w-4" />
                  <p className="text-sm">Dashboard</p>
                </div>
              </Link>
            </button>
            }

            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => signOut({
                callbackUrl:'/',               
              })}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </button>
        
      </Popover>


    </div>
  );
}
