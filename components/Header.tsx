"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="px-2 sm:px-3 md:px-5 lg:px-8 flex justify-between items-center">
      <Link href={"/"} className="flex text-3xl md:text-4xl font-bold">
        <h1 className="text-blue-200">Code</h1>
        <h1 className="text-blue-500">Connect</h1>
      </Link>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}

export default Header;
