"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui";

export default function Navbar() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/collection">
              <h1 className="text-lg sm:text-xl font-bold text-white hover:opacity-80 transition-opacity cursor-pointer">
                Seçil Store
              </h1>
            </Link>
            <Link
              href="/collection"
              className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Koleksiyon
            </Link>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium text-white">
                {session.user?.name || "Kullanıcı"}
              </span>
              <span className="text-xs text-gray-400">
                {session.user?.email}
              </span>
            </div>
            <div className="md:hidden text-sm font-medium text-white">
              {session.user?.name?.split(" ")[0] || "Kullanıcı"}
            </div>
            <Button
              variant="danger"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
            >
              <span className="hidden sm:inline">Çıkış Yap</span>
              <span className="sm:hidden">Çıkış</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
