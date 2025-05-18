import Link from "next/link";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../../public/logo.png";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50
        bg-gradient-to-br from-blue-600/70 to-indigo-500/80
        backdrop-blur-lg
        shadow-sm
        transition-colors duration-300">
      <div className="flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex flex-col items-center">
          <Image
            src={logo}
            alt="Logo"
            width={60}
            height={60}
            priority
          />
          <span className="text-md font-bold text-white -mt-2">
            The Meteo
          </span>
        </Link>

        <div className="flex items-center space-x-2 mr-2">
          <Link href="/weather" passHref>
            <Button 
            variant="link"
            className="cursor-pointer text-white text-md hover:text-gray-200"
            >Dashboard</Button>
          </Link>

          <UserButton />
          <SignedOut>
            <SignInButton
              mode="modal"
              forceRedirectUrl="/weather"
              fallbackRedirectUrl="/"
            >
                <Button variant="outline" className="text-gray-700 border-white">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
