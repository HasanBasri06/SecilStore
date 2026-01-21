"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { Collection } from "@/store/slices/collectionSlice";
import CollectionItem from "@/components/CollectionItem";
import Navbar from "@/components/Navbar";

export default function CollectionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const collections = useAppSelector((state) => state.collection.items);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  const filteredCollections = useMemo(() => {
    if (!searchTerm.trim()) {
      return collections;
    }
    const searchLower = searchTerm.toLowerCase();
    return collections.filter(
      (collection) =>
        collection.title.toLowerCase().includes(searchLower) ||
        collection.description.toLowerCase().includes(searchLower)
    );
  }, [collections, searchTerm]);

  const handleEditClick = (collection: Collection) => {
    router.push(`/collection/${collection.id}/edit`);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-lg text-gray-400">Yükleniyor...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full space-y-4 sm:space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
            <div className="flex-shrink-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Koleksiyonlar
              </h1>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-400">
                Hoş geldiniz, {session.user?.name || session.user?.email}!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-4 w-full lg:w-auto">
              <div className="flex-1 sm:flex-initial sm:w-full sm:max-w-md">
                <label
                  htmlFor="search"
                  className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2"
                >
                  Koleksiyon Ara
                </label>
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Koleksiyon ara..."
                  className="w-full rounded-md border border-gray-700 bg-zinc-800 px-3 sm:px-4 py-2 text-sm sm:text-base text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1 sm:gap-2 sm:flex-shrink-0">
                <label className="block text-xs sm:text-sm font-medium text-gray-300">
                  Görünüm
                </label>
                <div className="flex rounded-md border border-gray-700 bg-zinc-800 p-1 w-fit">
                  <button
                    onClick={() => setViewType("grid")}
                    className={`p-1.5 sm:p-2 rounded transition-colors ${
                      viewType === "grid"
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-zinc-700"
                    }`}
                    title="Grid Görünümü"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewType("list")}
                    className={`p-1.5 sm:p-2 rounded transition-colors ${
                      viewType === "list"
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-zinc-700"
                    }`}
                    title="Liste Görünümü"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {viewType === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCollections.map((collection) => (
                <CollectionItem
                  key={collection.id}
                  id={collection.id}
                  title={collection.title}
                  description={collection.description}
                  categoryId={collection.categoryId}
                  onEditClick={handleEditClick}
                  viewType="grid"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCollections.map((collection) => (
                <CollectionItem
                  key={collection.id}
                  id={collection.id}
                  title={collection.title}
                  description={collection.description}
                  categoryId={collection.categoryId}
                  onEditClick={handleEditClick}
                  viewType="list"
                />
              ))}
            </div>
          )}

          {filteredCollections.length === 0 && collections.length > 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                "{searchTerm}" için sonuç bulunamadı.
              </p>
            </div>
          )}

          {collections.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                Henüz koleksiyonunuz bulunmamaktadır.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
