"use client";

import { useState } from "react";
import Link from "next/link";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "../../public/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="
      fixed top-0 left-0 w-full z-50
      bg-gradient-to-br from-blue-600/70 to-indigo-500/80
      backdrop-blur-lg shadow-sm transition-colors p-4
    ">
      <div className="relative flex items-center h-16 px-4 py-2">
        {/* Mobile: Hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="sm:hidden absolute left-4"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>

        {/* Logo centered on mobile, left on sm+ */}
        <Link
          href="/"
          className="mx-auto sm:mx-0 flex flex-col items-center"
        >
          <Image src={logo} alt="Logo" width={50} height={50} priority />
          <span className="text-lg font-bold text-white -mt-1">The Meteo</span>
        </Link>

        <div className="hidden sm:flex items-center space-x-3 ml-auto">
          <Link href="/weather" passHref>
            <Button variant="link" className="text-white text-lg font-semibold hover:text-gray-200">
              Dashboard
            </Button>
          </Link>
          <UserButton />
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/weather">
              <Button variant="outline" className="text-white border-white">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav className="sm:hidden bg-indigo-600/90 backdrop-blur-md">
          <div className="flex flex-col p-4 space-y-3 mt-2">
            <Link href="/weather" onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full text-white justify-start">
                Dashboard
              </Button>
            </Link>
            <div className="flex space-x-2">
              <UserButton />
              <SignedOut>
                <SignInButton
                  mode="modal"
                  forceRedirectUrl="/weather"
                  fallbackRedirectUrl="/"
                >
                  <Button variant="outline" className="flex-1 text-white border-white">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
