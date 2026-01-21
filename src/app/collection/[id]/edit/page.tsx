"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { updateCollection, mockCategories, mockProducts, Product } from "@/store/slices/collectionSlice";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui";

export default function EditCollectionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const collections = useAppSelector((state) => state.collection.items);
  
  const collectionId = params.id as string;
  const collection = collections.find((c) => c.id === collectionId);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    categoryId: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productEditForm, setProductEditForm] = useState({
    title: "",
    description: "",
    categoryId: "",
    price: "",
    stock: "",
    productCode: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  
  // Filtreleme state'leri
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterPriceMin, setFilterPriceMin] = useState<string>("");
  const [filterPriceMax, setFilterPriceMax] = useState<string>("");
  const [filterStockMin, setFilterStockMin] = useState<string>("");
  const [filterStockMax, setFilterStockMax] = useState<string>("");
  const [filterProductCode, setFilterProductCode] = useState<string>("");
  
  // Görünüm türü
  const [viewType, setViewType] = useState<"grid" | "list">("list");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (collection) {
      setEditForm({
        title: collection.title,
        description: collection.description,
        categoryId: collection.categoryId,
      });

      // Koleksiyona ait ürünleri yükle
      if (collection.productIds && collection.productIds.length > 0) {
        const collectionProducts = collection.productIds
          .map((id) => mockProducts.find((p) => p.id === id))
          .filter((p): p is Product => p !== undefined)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setProducts(collectionProducts);
      } else {
        setProducts([]);
      }
    }
  }, [collection]);

  // Filtrelenmiş ürünler
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (filterCategory) {
      filtered = filtered.filter((p) => p.categoryId === filterCategory);
    }

    if (filterPriceMin) {
      const min = parseFloat(filterPriceMin);
      filtered = filtered.filter((p) => p.price >= min);
    }

    if (filterPriceMax) {
      const max = parseFloat(filterPriceMax);
      filtered = filtered.filter((p) => p.price <= max);
    }

    if (filterStockMin) {
      const min = parseInt(filterStockMin);
      filtered = filtered.filter((p) => (p.stock ?? 0) >= min);
    }

    if (filterStockMax) {
      const max = parseInt(filterStockMax);
      filtered = filtered.filter((p) => (p.stock ?? 0) <= max);
    }

    if (filterProductCode) {
      const codeLower = filterProductCode.toLowerCase();
      filtered = filtered.filter((p) => 
        p.productCode?.toLowerCase().includes(codeLower)
      );
    }

    return filtered;
  }, [products, filterCategory, filterPriceMin, filterPriceMax, filterStockMin, filterStockMax, filterProductCode]);

  // Drag and Drop handlers
  const handleDragStart = (productId: string) => {
    setDraggedIndex(products.findIndex((p) => p.id === productId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropProductId: string) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const dropIndex = products.findIndex((p) => p.id === dropProductId);
    if (dropIndex === -1 || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newProducts = [...products];
    const draggedItem = newProducts[draggedIndex];
    newProducts.splice(draggedIndex, 1);
    newProducts.splice(dropIndex, 0, draggedItem);

    // Order'ları güncelle
    newProducts.forEach((product, index) => {
      product.order = index + 1;
    });

    setProducts(newProducts);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSave = () => {
    // Request objesi oluştur
    const requestData = {
      collectionId: collection?.id,
      collection: {
        ...editForm,
      },
      products: products.map((p, index) => ({
        id: p.id,
        order: index + 1,
      })),
    };

    // Request'i modal'da göster (gerçek kaydetme yapılmayacak)
    setShowRequestModal(true);
  };

  const handleCancel = () => {
    router.push("/collection");
  };

  const handleCloseRequestModal = () => {
    setShowRequestModal(false);
  };

  const handleProductClick = (product: Product) => {
    setEditingProduct(product);
    setProductEditForm({
      title: product.title,
      description: product.description,
      categoryId: product.categoryId,
      price: product.price.toString(),
      stock: product.stock?.toString() || "",
      productCode: product.productCode || "",
    });
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = () => {
    if (!editingProduct) return;

    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id
        ? {
            ...p,
            title: productEditForm.title,
            description: productEditForm.description,
            categoryId: productEditForm.categoryId,
            price: parseFloat(productEditForm.price) || 0,
            stock: productEditForm.stock ? parseInt(productEditForm.stock) : undefined,
            productCode: productEditForm.productCode || undefined,
          }
        : p
    );

    setProducts(updatedProducts);
    handleCloseProductModal();
    
    // Toast göster
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleDeleteClick = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;

    const updatedProducts = products.filter((p) => p.id !== productToDelete.id);
    setProducts(updatedProducts);
    setShowDeleteModal(false);
    
    // Toast göster
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setProductToDelete(null);
    }, 3000);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

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

  if (!collection) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Koleksiyon bulunamadı.
            </p>
            <Button variant="secondary" onClick={handleCancel} className="mt-4">
              Geri Dön
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Koleksiyon Düzenle
            </h1>
            <p className="mt-2 text-gray-400">
              Koleksiyon bilgilerini ve ürünlerini düzenleyin
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sol Panel - Koleksiyon Bilgileri ve Filtreleme */}
            <div className="lg:col-span-1 space-y-6">
              {/* Koleksiyon Bilgileri */}
              <div className="rounded-lg border border-gray-700 bg-zinc-900 p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Koleksiyon Bilgileri
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="edit-title"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Başlık
                    </label>
                    <input
                      id="edit-title"
                      type="text"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                      className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Koleksiyon başlığı"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-description"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Açıklama
                    </label>
                    <textarea
                      id="edit-description"
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({ ...editForm, description: e.target.value })
                      }
                      rows={3}
                      className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Koleksiyon açıklaması"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-category"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Kategori
                    </label>
                    <select
                      id="edit-category"
                      value={editForm.categoryId}
                      onChange={(e) =>
                        setEditForm({ ...editForm, categoryId: e.target.value })
                      }
                      className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Kategori Seçin</option>
                      {mockCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Filtreleme Paneli */}
              <div className="rounded-lg  border border-gray-700 bg-zinc-900 p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Filtrele
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="filter-category"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Kategori
                    </label>
                    <select
                      id="filter-category"
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Tüm Kategoriler</option>
                      {mockCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="filter-price-min"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Min Fiyat (₺)
                    </label>
                    <input
                      id="filter-price-min"
                      type="number"
                      value={filterPriceMin}
                      onChange={(e) => setFilterPriceMin(e.target.value)}
                      min="0"
                      step="0.01"
                      className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="filter-price-max"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Max Fiyat (₺)
                    </label>
                    <input
                      id="filter-price-max"
                      type="number"
                      value={filterPriceMax}
                      onChange={(e) => setFilterPriceMax(e.target.value)}
                      min="0"
                      step="0.01"
                      className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="filter-stock-min"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Min Stok
                    </label>
                    <input
                      id="filter-stock-min"
                      type="number"
                      value={filterStockMin}
                      onChange={(e) => setFilterStockMin(e.target.value)}
                      min="0"
                      className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="filter-stock-max"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Max Stok
                    </label>
                    <input
                      id="filter-stock-max"
                      type="number"
                      value={filterStockMax}
                      onChange={(e) => setFilterStockMax(e.target.value)}
                      min="0"
                      className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="filter-product-code"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Ürün Kodu
                    </label>
                    <input
                      id="filter-product-code"
                      type="text"
                      value={filterProductCode}
                      onChange={(e) => setFilterProductCode(e.target.value)}
                      className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ürün kodu ile ara..."
                    />
                  </div>

                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => {
                      setFilterCategory("");
                      setFilterPriceMin("");
                      setFilterPriceMax("");
                      setFilterStockMin("");
                      setFilterStockMax("");
                      setFilterProductCode("");
                    }}
                  >
                    Filtreleri Temizle
                  </Button>
                </div>
              </div>
            </div>

            {/* Sağ Panel - Ürün Listesi */}
            <div className="lg:col-span-3">
              <div className="rounded-lg p-6 border border-gray-700 bg-zinc-900">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold  text-white">
                    Ürünler ({filteredProducts.length})
                  </h2>
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Görünüm
                    </label>
                    <div className="flex rounded-md border border-gray-700 bg-zinc-800 p-1">
                      <button
                        onClick={() => setViewType("grid")}
                        className={`p-2 rounded transition-colors ${
                          viewType === "grid"
                            ? "bg-blue-600 text-white"
                            : "text-gray-400 hover:text-white hover:bg-zinc-700"
                        }`}
                        title="Grid Görünümü"
                      >
                        <svg
                          className="w-5 h-5"
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
                        className={`p-2 rounded transition-colors ${
                          viewType === "list"
                            ? "bg-blue-600 text-white"
                            : "text-gray-400 hover:text-white hover:bg-zinc-700"
                        }`}
                        title="Liste Görünümü"
                      >
                        <svg
                          className="w-5 h-5"
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

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400">
                      {products.length === 0
                        ? "Bu koleksiyonda henüz ürün bulunmamaktadır."
                        : "Filtre kriterlerine uygun ürün bulunamadı."}
                    </p>
                  </div>
                ) : viewType === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((product, index) => {
                      const category = mockCategories.find(
                        (cat) => cat.id === product.categoryId
                      );
                      const actualIndex = products.findIndex((p) => p.id === product.id);
                      const isDragged = draggedIndex === actualIndex;

                      return (
                        <div
                          key={product.id}
                          draggable
                          onDragStart={() => handleDragStart(product.id)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, product.id)}
                          onDragEnd={handleDragEnd}
                          onClick={(e) => {
                            if (!(e.target as HTMLElement).closest('.drag-handle')) {
                              handleProductClick(product);
                            }
                          }}
                          className={`relative rounded-lg border p-4 transition-colors ${
                            isDragged
                              ? "border-blue-500 bg-blue-900/20 opacity-50"
                              : "border-gray-700 bg-zinc-800 hover:border-gray-600"
                          } cursor-pointer flex flex-col`}
                        >
                          <div 
                            className="absolute top-2 left-2 text-gray-500 drag-handle cursor-move z-10"
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 8h16M4 16h16"
                              />
                            </svg>
                          </div>
                          <button
                            onClick={(e) => handleDeleteClick(product, e)}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-300 transition-colors z-10"
                            title="Ürünü Sil"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-white text-lg">
                                {product.title}
                              </h3>
                            </div>
                            {category && (
                              <span className="inline-block rounded bg-blue-900/30 px-2 py-1 text-xs font-semibold text-blue-400 mb-2">
                                {category.name}
                              </span>
                            )}
                            <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="space-y-1">
                              <p className="text-lg font-bold text-white">
                                {product.price.toLocaleString("tr-TR", {
                                  style: "currency",
                                  currency: "TRY",
                                })}
                              </p>
                              {product.stock !== undefined && (
                                <p className="text-sm text-gray-400">
                                  Stok: <span className="font-semibold text-white">{product.stock}</span>
                                </p>
                              )}
                              {product.productCode && (
                                <p className="text-sm text-gray-400">
                                  Kod: <span className="font-semibold text-white">{product.productCode}</span>
                                </p>
                              )}
                              <p className="text-xs text-gray-500 mt-2">
                                Sıra: {product.order || index + 1}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredProducts.map((product, index) => {
                      const category = mockCategories.find(
                        (cat) => cat.id === product.categoryId
                      );
                      const actualIndex = products.findIndex((p) => p.id === product.id);
                      const isDragged = draggedIndex === actualIndex;

                      return (
                        <div
                          key={product.id}
                          draggable
                          onDragStart={() => handleDragStart(product.id)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, product.id)}
                          onDragEnd={handleDragEnd}
                          onClick={(e) => {
                            // Sadece drag handle'a tıklanmadıysa modal aç
                            if (!(e.target as HTMLElement).closest('.drag-handle')) {
                              handleProductClick(product);
                            }
                          }}
                          className={`flex items-center gap-4 rounded-lg border p-4 transition-colors ${
                            isDragged
                              ? "border-blue-500 bg-blue-900/20 opacity-50"
                              : "border-gray-700 bg-zinc-800 hover:border-gray-600"
                          } cursor-pointer`}
                        >
                          <div 
                            className="flex-shrink-0 text-gray-500 drag-handle cursor-move"
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 8h16M4 16h16"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-white">
                                {product.title}
                              </h3>
                              {category && (
                                <span className="rounded bg-blue-900/30 px-2 py-1 text-xs font-semibold text-blue-400">
                                  {category.name}
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-gray-400">
                              {product.description}
                            </p>
                            <div className="mt-2 flex items-center gap-4 flex-wrap">
                              <p className="text-lg font-bold text-white">
                                {product.price.toLocaleString("tr-TR", {
                                  style: "currency",
                                  currency: "TRY",
                                })}
                              </p>
                              {product.stock !== undefined && (
                                <span className="text-sm text-gray-400">
                                  Stok: <span className="font-semibold text-white">{product.stock}</span>
                                </span>
                              )}
                              {product.productCode && (
                                <span className="text-sm text-gray-400">
                                  Kod: <span className="font-semibold text-white">{product.productCode}</span>
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex-shrink-0 flex items-center gap-4">
                            <div className="text-sm text-gray-400">
                              Sıra: {product.order || index + 1}
                            </div>
                            <button
                              onClick={(e) => handleDeleteClick(product, e)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                              title="Ürünü Sil"
                            >
                              <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Alt Butonlar */}
          <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={handleCancel}>
              Vazgeç
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Kaydet
            </Button>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-3xl rounded-lg bg-zinc-900 p-6 shadow-xl border border-gray-700">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Kaydetme İsteği
              </h2>
              <button
                onClick={handleCloseRequestModal}
                className="text-gray-400 hover:text-gray-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Request Body:
                </h3>
                <pre className="max-h-96 overflow-auto rounded-md bg-zinc-800 p-4 text-sm text-gray-300">
                  {JSON.stringify(
                    {
                      collectionId: collection?.id,
                      collection: {
                        ...editForm,
                      },
                      products: products.map((p, index) => ({
                        id: p.id,
                        order: index + 1,
                      })),
                    },
                    null,
                    2
                  )}
                </pre>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <Button variant="secondary" onClick={handleCloseRequestModal}>
                  Kapat
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Edit Modal */}
      {showProductModal && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-3xl max-h-[90vh] bg-zinc-900 rounded-lg shadow-xl border border-gray-700 flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Ürün Düzenle
              </h2>
              <button
                onClick={handleCloseProductModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-4 max-w-2xl mx-auto">
                <div>
                  <label
                    htmlFor="product-title"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Başlık
                  </label>
                  <input
                    id="product-title"
                    type="text"
                    value={productEditForm.title}
                    onChange={(e) =>
                      setProductEditForm({ ...productEditForm, title: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ürün başlığı"
                  />
                </div>

                <div>
                  <label
                    htmlFor="product-description"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Açıklama
                  </label>
                  <textarea
                    id="product-description"
                    value={productEditForm.description}
                    onChange={(e) =>
                      setProductEditForm({ ...productEditForm, description: e.target.value })
                    }
                    rows={3}
                    className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ürün açıklaması"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="product-category"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Kategori
                    </label>
                    <select
                      id="product-category"
                      value={productEditForm.categoryId}
                      onChange={(e) =>
                        setProductEditForm({ ...productEditForm, categoryId: e.target.value })
                      }
                      className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Kategori Seçin</option>
                      {mockCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="product-price"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Fiyat (₺)
                    </label>
                    <input
                      id="product-price"
                      type="number"
                      value={productEditForm.price}
                      onChange={(e) =>
                        setProductEditForm({ ...productEditForm, price: e.target.value })
                      }
                      min="0"
                      step="0.01"
                      className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="product-stock"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Stok
                    </label>
                    <input
                      id="product-stock"
                      type="number"
                      value={productEditForm.stock}
                      onChange={(e) =>
                        setProductEditForm({ ...productEditForm, stock: e.target.value })
                      }
                      min="0"
                      className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="product-code"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Ürün Kodu
                    </label>
                    <input
                      id="product-code"
                      type="text"
                      value={productEditForm.productCode}
                      onChange={(e) =>
                        setProductEditForm({ ...productEditForm, productCode: e.target.value })
                      }
                      className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ürün kodu"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-700 flex justify-end gap-4">
              <Button variant="secondary" onClick={handleCloseProductModal}>
                İptal
              </Button>
              <Button variant="primary" onClick={handleSaveProduct}>
                Kaydet
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md bg-zinc-900 rounded-lg shadow-xl border border-gray-700">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                Ürünü Sil
              </h2>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-300 mb-4">
                <span className="font-semibold text-white">{productToDelete.title}</span> ürününü silmek istediğinizden emin misiniz?
              </p>
              <p className="text-sm text-gray-400 mb-6">
                Bu işlem geri alınamaz.
              </p>
            </div>
            <div className="px-6 py-4 border-t border-gray-700 flex justify-end gap-4">
              <Button variant="secondary" onClick={handleCancelDelete}>
                İptal
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Sil
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-in">
          <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">
              {productToDelete ? "Ürün başarılı bir şekilde silindi" : "Ürün başarılı bir şekilde güncellendi"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
