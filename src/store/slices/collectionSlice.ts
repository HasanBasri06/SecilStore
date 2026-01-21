import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  id: string;
  name: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  image?: string;
  productIds?: string[];
}

export interface Product {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  price: number;
  image?: string;
  order?: number;
  stock?: number;
  productCode?: string;
}

export const mockCategories: Category[] = [
  { id: "1", name: "Giyim" },
  { id: "2", name: "Mücevher" },
  { id: "3", name: "Sanat" },
  { id: "4", name: "Ayakkabı" },
  { id: "5", name: "Kitap" },
  { id: "6", name: "Saat" },
  { id: "7", name: "Aksesuar" },
  { id: "8", name: "Mobilya" },
];

interface CollectionState {
  items: Collection[];
  selectedCollection: Collection | null;
  loading: boolean;
  error: string | null;
}

export const mockProducts: Product[] = [
  {
    id: "p1",
    title: "Klasik Deri Ceket",
    description: "El yapımı deri ceket, üstün kalite malzemeden üretilmiş",
    categoryId: "1",
    price: 1250,
    order: 1,
    stock: 15,
    productCode: "CEK-001",
  },
  {
    id: "p2",
    title: "Elmas Yüzük",
    description: "0.5 karat elmas taşlı, 14 ayar altın yüzük",
    categoryId: "2",
    price: 18500,
    order: 2,
    stock: 3,
    productCode: "YUZ-001",
  },
  {
    id: "p3",
    title: "Tablo - Deniz Manzarası",
    description: "Modern sanat eseri, tuval üzerine yağlı boya",
    categoryId: "3",
    price: 3200,
    order: 3,
    stock: 1,
    productCode: "TAB-001",
  },
  {
    id: "p4",
    title: "Deri Bot",
    description: "Gerçek deri, rahat ve dayanıklı erkek botu",
    categoryId: "4",
    price: 890,
    order: 4,
    stock: 25,
    productCode: "BOT-001",
  },
  {
    id: "p5",
    title: "Antika Dünya Atlası",
    description: "1940'lardan kalma orijinal harita atlası",
    categoryId: "5",
    price: 750,
    order: 5,
    stock: 2,
    productCode: "ATL-001",
  },
  {
    id: "p6",
    title: "Vintage Kol Saati",
    description: "Mekanik hareket, klasik tasarım, altın kaplama",
    categoryId: "6",
    price: 2400,
    order: 6,
    stock: 8,
    productCode: "SAT-001",
  },
  {
    id: "p7",
    title: "Deri Sırt Çantası",
    description: "Elle dikilmiş, deri sırt çantası, çok bölmeli",
    categoryId: "7",
    price: 550,
    order: 7,
    stock: 12,
    productCode: "CAN-001",
  },
  {
    id: "p8",
    title: "Ahşap Komodin",
    description: "Ceviz ağacından, el işçiliği, 3 çekmeceli",
    categoryId: "8",
    price: 4200,
    order: 8,
    stock: 5,
    productCode: "KOM-001",
  },
  {
    id: "p9",
    title: "Pamuklu Gömlek",
    description: "Organik pamuk, rahat kesim, günlük kullanım",
    categoryId: "1",
    price: 185,
    order: 9,
    stock: 50,
    productCode: "GOM-001",
  },
  {
    id: "p10",
    title: "Gümüş Kolye",
    description: "925 ayar gümüş, inci taşlı zarif kolye",
    categoryId: "2",
    price: 450,
    order: 10,
    stock: 20,
    productCode: "KOL-001",
  },
  {
    id: "p11",
    title: "Spor Ayakkabı",
    description: "Hafif, nefes alabilir, koşu ve yürüyüş için ideal",
    categoryId: "4",
    price: 680,
    order: 11,
    stock: 30,
    productCode: "AYA-001",
  },
  {
    id: "p12",
    title: "Kahve Masası",
    description: "Cam üstlü, metal ayaklı modern kahve masası",
    categoryId: "8",
    price: 1200,
    order: 12,
    stock: 7,
    productCode: "MAS-001",
  },
  // Giyim ürünleri
  {
    id: "p13",
    title: "Klasik Takım Elbise",
    description: "İş dünyası için şık ve profesyonel takım elbise",
    categoryId: "1",
    price: 2500,
    order: 13,
    stock: 10,
    productCode: "TAK-001",
  },
  {
    id: "p14",
    title: "Kot Pantolon",
    description: "Rahat kesim, dayanıklı kot pantolon",
    categoryId: "1",
    price: 450,
    order: 14,
    stock: 35,
    productCode: "KOT-001",
  },
  {
    id: "p15",
    title: "Kazak",
    description: "Yün karışımlı, sıcak tutan kazak",
    categoryId: "1",
    price: 320,
    order: 15,
    stock: 25,
    productCode: "KAZ-001",
  },
  // Mücevher ürünleri
  {
    id: "p16",
    title: "Altın Bilezik",
    description: "22 ayar altın, klasik tasarım bilezik",
    categoryId: "2",
    price: 8500,
    order: 16,
    stock: 5,
    productCode: "BIL-001",
  },
  {
    id: "p17",
    title: "Pırlanta Küpe",
    description: "0.3 karat pırlanta taşlı, gümüş küpe",
    categoryId: "2",
    price: 3200,
    order: 17,
    stock: 8,
    productCode: "KUP-001",
  },
  {
    id: "p18",
    title: "İnci Kolye",
    description: "Doğal inci, gümüş zincirli zarif kolye",
    categoryId: "2",
    price: 1200,
    order: 18,
    stock: 12,
    productCode: "INK-001",
  },
  // Sanat ürünleri
  {
    id: "p19",
    title: "Soyut Resim",
    description: "Modern soyut sanat eseri, tuval üzerine akrilik",
    categoryId: "3",
    price: 4500,
    order: 19,
    stock: 1,
    productCode: "SOY-001",
  },
  {
    id: "p20",
    title: "Heykel - Figür",
    description: "Bronz heykel, el yapımı sanat eseri",
    categoryId: "3",
    price: 6800,
    order: 20,
    stock: 1,
    productCode: "HEY-001",
  },
  {
    id: "p21",
    title: "Fotoğraf Koleksiyonu",
    description: "Sınırlı sayıda basılmış fotoğraf koleksiyonu",
    categoryId: "3",
    price: 1500,
    order: 21,
    stock: 3,
    productCode: "FOT-001",
  },
  // Ayakkabı ürünleri
  {
    id: "p22",
    title: "Klasik Erkek Ayakkabısı",
    description: "Deri, iş dünyası için uygun klasik ayakkabı",
    categoryId: "4",
    price: 1200,
    order: 22,
    stock: 18,
    productCode: "KLA-001",
  },
  {
    id: "p23",
    title: "Sandalet",
    description: "Yaz için rahat ve şık sandalet",
    categoryId: "4",
    price: 350,
    order: 23,
    stock: 40,
    productCode: "SAN-001",
  },
  {
    id: "p24",
    title: "Bot - Kış",
    description: "Su geçirmez, kış için ideal bot",
    categoryId: "4",
    price: 750,
    order: 24,
    stock: 22,
    productCode: "KIS-001",
  },
  // Antika ürünleri
  {
    id: "p25",
    title: "Antika Vazo",
    description: "Çin porseleni, 1800'lü yıllardan kalma",
    categoryId: "5",
    price: 3500,
    order: 25,
    stock: 1,
    productCode: "VAZ-001",
  },
  {
    id: "p26",
    title: "Eski Kitap Koleksiyonu",
    description: "Nadir bulunan eski kitaplar koleksiyonu",
    categoryId: "5",
    price: 2800,
    order: 26,
    stock: 2,
    productCode: "KIT-001",
  },
  {
    id: "p27",
    title: "Antika Masa Saati",
    description: "1920'lerden kalma mekanik masa saati",
    categoryId: "5",
    price: 4200,
    order: 27,
    stock: 1,
    productCode: "MAS-002",
  },
  // Saat ürünleri
  {
    id: "p28",
    title: "Akıllı Saat",
    description: "Modern akıllı saat, fitness takibi özellikli",
    categoryId: "6",
    price: 1800,
    order: 28,
    stock: 15,
    productCode: "AKI-001",
  },
  {
    id: "p29",
    title: "Klasik Cep Saati",
    description: "Altın kaplama, mekanik cep saati",
    categoryId: "6",
    price: 3200,
    order: 29,
    stock: 4,
    productCode: "CEP-001",
  },
  {
    id: "p30",
    title: "Spor Saati",
    description: "Dayanıklı, su geçirmez spor saati",
    categoryId: "6",
    price: 650,
    order: 30,
    stock: 20,
    productCode: "SPO-001",
  },
  // Deri aksesuar ürünleri
  {
    id: "p31",
    title: "Deri Cüzdan",
    description: "Gerçek deri, çok bölmeli cüzdan",
    categoryId: "7",
    price: 280,
    order: 31,
    stock: 30,
    productCode: "CUZ-001",
  },
  {
    id: "p32",
    title: "Deri Kemer",
    description: "El yapımı deri kemer, ayarlanabilir",
    categoryId: "7",
    price: 180,
    order: 32,
    stock: 45,
    productCode: "KEM-001",
  },
  {
    id: "p33",
    title: "Deri Çanta",
    description: "Kadın el çantası, deri işçiliği",
    categoryId: "7",
    price: 850,
    order: 33,
    stock: 15,
    productCode: "CAN-002",
  },
  // Ev dekorasyonu ürünleri
  {
    id: "p34",
    title: "Koltuk Takımı",
    description: "Modern tasarım, rahat koltuk takımı",
    categoryId: "8",
    price: 5500,
    order: 34,
    stock: 3,
    productCode: "KOL-002",
  },
  {
    id: "p35",
    title: "Yatak Odası Takımı",
    description: "Ahşap yatak odası mobilya takımı",
    categoryId: "8",
    price: 8500,
    order: 35,
    stock: 2,
    productCode: "YAT-001",
  },
  {
    id: "p36",
    title: "Aydınlatma Ünitesi",
    description: "Modern avize, LED aydınlatma",
    categoryId: "8",
    price: 2200,
    order: 36,
    stock: 8,
    productCode: "AYD-001",
  },
];

const mockCollections: Collection[] = [
  {
    id: "1",
    title: "Premium Giyim Koleksiyonu",
    description: "Yüksek kaliteli giyim ürünleri koleksiyonu",
    categoryId: "1",
    productIds: ["p1", "p9", "p13", "p14", "p15"],
  },
  {
    id: "2",
    title: "Değerli Mücevherler",
    description: "Elmas ve değerli taşlardan oluşan özel koleksiyon",
    categoryId: "2",
    productIds: ["p2", "p10", "p16", "p17", "p18"],
  },
  {
    id: "3",
    title: "Modern Sanat Eserleri",
    description: "Çağdaş sanat eserleri ve tablolar",
    categoryId: "3",
    productIds: ["p3", "p19", "p20", "p21"],
  },
  {
    id: "4",
    title: "Ayakkabı Koleksiyonu",
    description: "Rahat ve şık ayakkabı seçenekleri",
    categoryId: "4",
    productIds: ["p4", "p11", "p22", "p23", "p24"],
  },
  {
    id: "5",
    title: "Antika ve Koleksiyon Eşyaları",
    description: "Nadir ve değerli antika eserler",
    categoryId: "5",
    productIds: ["p5", "p25", "p26", "p27"],
  },
  {
    id: "6",
    title: "Zaman Ölçüm Aletleri",
    description: "Vintage ve modern saat koleksiyonu",
    categoryId: "6",
    productIds: ["p6", "p28", "p29", "p30"],
  },
  {
    id: "7",
    title: "Deri Aksesuarlar",
    description: "Elle yapılmış deri ürünler",
    categoryId: "7",
    productIds: ["p7", "p31", "p32", "p33"],
  },
  {
    id: "8",
    title: "Ev Dekorasyonu",
    description: "Modern ve şık ev mobilyaları",
    categoryId: "8",
    productIds: ["p8", "p12", "p34", "p35", "p36"],
  },
];

const initialState: CollectionState = {
  items: mockCollections,
  selectedCollection: null,
  loading: false,
  error: null,
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<Collection[]>) => {
      state.items = action.payload;
    },
    addCollection: (state, action: PayloadAction<Collection>) => {
      state.items.push(action.payload);
    },
    updateCollection: (state, action: PayloadAction<Collection>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteCollection: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setSelectedCollection: (state, action: PayloadAction<Collection | null>) => {
      state.selectedCollection = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCollections,
  addCollection,
  updateCollection,
  deleteCollection,
  setSelectedCollection,
  setLoading,
  setError,
} = collectionSlice.actions;

export default collectionSlice.reducer;
