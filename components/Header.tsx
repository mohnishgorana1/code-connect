"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Code2, GraduationCap, Menu, Plug } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { navLinks } from "@/constants/navlinks";
import { useAppUser } from "@/contexts/UserContext";
import { Role } from "@/models/user.model";

export default function Header() {
  const pathname = usePathname();
  const { user, isSignedIn } = useUser();
  const [open, setOpen] = useState(false);
  const { appUser } = useAppUser();
  const currentUserDashboardUrl =
    appUser && appUser?.role === Role.Candidate
      ? "/dashboard/candidate"
      : appUser?.role === Role.Interviewer
      ? "/dashboard/interviewer"
      : "/dashboard/adimn";
  return (
    <header className="w-full sticky top-0 z-50 bg-gray-950">
      <div className="max-w-7xl md:max-w-[99%] mx-auto flex items-center justify-between px-4 py-5">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-semibold tracking-tight flex items-center group transition-all duration-300"
        >
          <Plug
            size={26}
            className="text-cyan-400 group-hover:rotate-12 transition-transform duration-300"
          />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-indigo-500 font-bold tracking-tight">
            CodeConnect
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 rounded-full bg-cyan-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
          {appUser && appUser?.role && (
            <Link
              href={currentUserDashboardUrl}
              className={`relative text-sm font-medium transition-all duration-300 ${
                pathname === "/dashboard"
                  ? "text-cyan-400"
                  : "text-gray-300 hover:text-cyan-400"
              }`}
            >
              Dashboard
              <span
                className={`absolute left-0 -bottom-1 h-0.5 rounded-full bg-indigo-500 transition-all duration-300 ${
                  pathname === "/dashboard"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          )}
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {isSignedIn ? (
            <>
              <UserButton afterSignOutUrl="/" />
              <SignOutButton>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-gray-200 hover:text-cyan-400 transition-all duration-300"
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

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-cyan-400 transition-all duration-300"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-gray-950 border-neutral-800"
            >
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="text-2xl font-semibold text-cyan-400 flex items-center gap-2"
                  >
                    <GraduationCap size={24} />
                    Code Connect
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-5 mt-6 items-center justify-center w-full">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-medium transition-all duration-300 ${
                      pathname === link.href
                        ? "text-cyan-400"
                        : "text-gray-300 hover:text-cyan-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="w-full pt-5 border-t border-neutral-800 flex flex-col gap-3 px-3">
                  {isSignedIn ? (
                    <span className="flex items-center justify-between ">
                      <UserButton afterSignOutUrl="/" />
                      <SignOutButton>
                        <Button
                          variant="outline"
                          className="border-neutral-700 text-gray-200 hover:text-cyan-400 transition-all duration-300"
                        >
                          Sign Out
                        </Button>
                      </SignOutButton>
                    </span>
                  ) : (
                    <SignInButton mode="modal">
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full transition-all duration-300">
                        Sign In
                      </Button>
                    </SignInButton>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
