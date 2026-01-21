import { Card, Button } from "./ui";
import { Collection, mockCategories } from "@/store/slices/collectionSlice";

interface CollectionItemProps {
  id: string;
  title: string;
  description?: string;
  image?: string;
  categoryId?: string;
  price?: number;
  onEditClick?: (collection: Collection) => void;
  viewType?: "grid" | "list";
}

// Koleksiyon ismine göre özel görsel oluştur
const getCollectionImage = (title: string) => {
  const titleLower = title.toLowerCase();
  
  // Premium Giyim Koleksiyonu
  if (titleLower.includes("giyim") || titleLower.includes("premium")) {
    return {
      gradient: "from-purple-500 via-pink-500 to-red-500",
      icon: (
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        </svg>
      ),
    };
  }
  
  // Değerli Mücevherler
  if (titleLower.includes("mücevher") || titleLower.includes("değerli")) {
    return {
      gradient: "from-yellow-400 via-amber-500 to-orange-500",
      icon: (
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L9.09 8.26L2 9.27L7 14.14L5.18 21.02L12 17.77L18.82 21.02L17 14.14L22 9.27L14.91 8.26L12 2Z"/>
        </svg>
      ),
    };
  }
  
  // Modern Sanat Eserleri
  if (titleLower.includes("sanat") || titleLower.includes("modern")) {
    return {
      gradient: "from-blue-400 via-indigo-500 to-purple-600",
      icon: (
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l6 2.25v4.78L12 8.5 6 11.21V6.43l6-2.25zM4 8.5v6.78c0 4.42 2.9 8.5 7 9.82 4.1-1.32 7-5.4 7-9.82V8.5l-7 2.63-7-2.63z"/>
        </svg>
      ),
    };
  }
  
  // Ayakkabı Koleksiyonu
  if (titleLower.includes("ayakkabı")) {
    return {
      gradient: "from-gray-600 via-gray-700 to-gray-800",
      icon: (
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.5 9.5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2s2-.9 2-2v-7c0-1.1-.9-2-2-2zm-15 0c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2s2-.9 2-2v-7c0-1.1-.9-2-2-2zM2.5 8.5h19c.83 0 1.5-.67 1.5-1.5S22.33 5.5 21.5 5.5h-19C1.67 5.5 1 6.17 1 7s.67 1.5 1.5 1.5z"/>
        </svg>
      ),
    };
  }
  
  // Antika ve Koleksiyon Eşyaları
  if (titleLower.includes("antika") || titleLower.includes("koleksiyon eşya")) {
    return {
      gradient: "from-amber-600 via-yellow-700 to-orange-800",
      icon: (
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
        </svg>
      ),
    };
  }
  
  // Zaman Ölçüm Aletleri
  if (titleLower.includes("zaman") || titleLower.includes("saat")) {
    return {
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      icon: (
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
        </svg>
      ),
    };
  }
  
  // Deri Aksesuarlar
  if (titleLower.includes("deri") || titleLower.includes("aksesuar")) {
    return {
      gradient: "from-amber-800 via-brown-700 to-amber-900",
      icon: (
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
    };
  }
  
  // Ev Dekorasyonu
  if (titleLower.includes("ev") || titleLower.includes("dekorasyon") || titleLower.includes("mobilya")) {
    return {
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      icon: (
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      ),
    };
  }
  
  // Varsayılan
  return {
    gradient: "from-blue-400 to-purple-500",
    icon: (
      <span className="text-6xl font-bold">{title.charAt(0).toUpperCase()}</span>
    ),
  };
};

export default function CollectionItem({
  id,
  title,
  description,
  image,
  categoryId,
  price,
  onEditClick,
  viewType = "grid",
}: CollectionItemProps) {
  const category = categoryId 
    ? mockCategories.find((cat) => cat.id === categoryId)?.name 
    : undefined;
  
  const collectionImage = getCollectionImage(title);

  const handleEditClick = () => {
    if (onEditClick) {
      onEditClick({
        id,
        title,
        description: description || "",
        categoryId: categoryId || "",
        image,
      });
    }
  };

  if (viewType === "list") {
    return (
      <Card className="overflow-hidden transition-transform hover:shadow-lg cursor-pointer">
        <div className="flex gap-6">
          <div className="w-48 h-48 flex-shrink-0 bg-gray-700 rounded-lg overflow-hidden">
            <div className={`w-full h-full bg-gradient-to-br ${collectionImage.gradient} flex items-center justify-center text-white`}>
              {collectionImage.icon}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {category && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-400 bg-blue-900/30 rounded mb-2">
                      {category}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-white">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-sm text-gray-400 mt-2">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <Button
                variant="secondary"
                onClick={handleEditClick}
                className="text-sm cursor-pointer w-auto"
              >
                Sabitleri Düzenle
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden transition-transform hover:scale-105 hover:shadow-lg cursor-pointer flex flex-col">
      <div className="w-full h-48 bg-gray-700 mb-4 rounded-t-lg overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br ${collectionImage.gradient} flex items-center justify-center text-white`}>
          {collectionImage.icon}
        </div>
      </div>
      <div className="space-y-2 flex-1">
        {category && (
          <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-400 bg-blue-900/30 rounded">
            {category}
          </span>
        )}
        <h3 className="text-lg font-semibold text-white line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-400 line-clamp-2">
            {description}
          </p>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <Button
          variant="secondary"
          fullWidth
          onClick={handleEditClick}
          className="text-sm cursor-pointer"
        >
          Sabitleri Düzenle
        </Button>
      </div>
    </Card>
  );
}
