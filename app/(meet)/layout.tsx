"use client";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import StreamVideoProvider from "@/contexts/StreamClientProvider";
import { useAppUser } from "@/contexts/UserContext";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Plug } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MeetingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isSignedIn } = useUser();
  const [open, setOpen] = useState(false);
  const { appUser, loading } = useAppUser();

  if (!isSignedIn) {
    return <Loader />;
  }
  if (loading) {
    return <Loader />;
  }

  if (!loading && appUser) {
    return (
      <StreamVideoProvider>
        <main className="flex flex-col ">
          <header className="w-full sticky top-0 z-50 bg-gray-950">
            <div className="max-w-7xl md:max-w-[99%] mx-auto flex items-center justify-between px-4 py-5">
              {/* LOGO */}
              <Link
                href="/"
                className="text-xl md:text-2xl font-semibold tracking-tight flex items-center group transition-all duration-300"
              >
                <Plug
                  size={26}
                  className="text-indigo-400 group-hover:rotate-12 transition-transform duration-300"
                />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-indigo-500 font-bold tracking-tight">
                  CodeConnect
                </span>
              </Link>

              {/* Right Section */}
              <div className="hidden md:flex items-center gap-4">
                {isSignedIn ? (
                  <>
                    <UserButton afterSignOutUrl="/" />
                    <SignOutButton>
                      <Button
                        variant="outline"
                        className="border-neutral-700 text-gray-200 hover:text-indigo-400 transition-all duration-300"
                      >
                        Sign Out
                      </Button>
                    </SignOutButton>
                  </>
                ) : (
                  <SignInButton mode="modal">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300">
                      Sign In
                    </Button>
                  </SignInButton>
                )}
              </div>
            </div>
          </header>

          <div className="bg-gray-950">
            <div>{children}</div>
          </div>
        </main>
      </StreamVideoProvider>
    );
  }
}
