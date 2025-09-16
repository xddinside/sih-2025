"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "~/components/mode-toggle";

import { Button } from "./ui/button";
import { Authenticated, Unauthenticated } from "convex/react";

export function Navbar() {
  useUser();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border/40 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 lg:space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-foreground text-lg font-bold">SIH 2025</span>
          </Link>
          <Button variant={"ghost"} className="cursor-pointer">
            <Link href="/">Home</Link>
          </Button>
          <Authenticated>
            <Button variant={"ghost"} className="cursor-pointer">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </Authenticated>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center gap-4 px-4 sm:px-6">
            <Unauthenticated>
              <div>
                <div className="hidden items-center gap-4 md:flex">
                  <Button asChild>
                    <Link href="/sign-in">Login</Link>
                  </Button>
                  <Button variant={"ghost"} asChild>
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </div>

                <div className="md:hidden">
                  <Button asChild size={"sm"}>
                    <Link href="/sign-in">Login</Link>
                  </Button>
                  <Button variant={"ghost"} asChild size={"sm"}>
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </div>
              </div>
            </Unauthenticated>

            <Authenticated>
              <div className="flex items-center gap-4">
                <UserButton />
              </div>
            </Authenticated>

            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
