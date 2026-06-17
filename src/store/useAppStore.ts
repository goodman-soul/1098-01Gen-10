import { create } from 'zustand';
import type {
  Consignment,
  ListedProduct,
  Brand,
  AccessoryType,
  AppraisalStatus,
  ConditionGrade,
} from '@/types';
import { MOCK_CONSIGNMENTS, MOCK_LISTED_PRODUCTS } from '@/data/mockData';
import { BRAND_PRICE_FACTOR } from '@/types';

interface AppState {
  consignments: Consignment[];
  listedProducts: ListedProduct[];
  currentConsignmentId: string | null;

  addConsignment: (data: {
    brand: Brand;
    model: string;
    year: number;
    originalPrice: number;
    flawPhotos: string[];
    accessories: AccessoryType[];
    customAccessories: string[];
  }) => string;

  updateConsignmentStatus: (id: string, status: AppraisalStatus) => void;

  confirmValuation: (id: string) => void;

  getConsignment: (id: string) => Consignment | undefined;

  getProduct: (id: string) => ListedProduct | undefined;

  filterProducts: (filters: {
    brands?: Brand[];
    grades?: ConditionGrade[];
    minPrice?: number;
    maxPrice?: number;
    keyword?: string;
  }) => ListedProduct[];
}

const generateId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

const calculateEstimate = (brand: Brand, originalPrice: number, year: number) => {
  const ageFactor = Math.max(0.4, 1 - (new Date().getFullYear() - year) * 0.08);
  const brandFactor = BRAND_PRICE_FACTOR[brand] || 0.5;
  const basePrice = Math.round(originalPrice * brandFactor * ageFactor);
  return {
    min: Math.round(basePrice * 0.85),
    max: Math.round(basePrice * 1.1),
  };
};

export const useAppStore = create<AppState>((set, get) => ({
  consignments: [...MOCK_CONSIGNMENTS],
  listedProducts: [...MOCK_LISTED_PRODUCTS],
  currentConsignmentId: null,

  addConsignment: (data) => {
    const id = generateId('C');
    const estimate = calculateEstimate(data.brand, data.originalPrice, data.year);
    const newConsignment: Consignment = {
      id,
      ...data,
      status: 'valuing',
      createdAt: new Date().toISOString().slice(0, 10),
      estimatedPriceMin: estimate.min,
      estimatedPriceMax: estimate.max,
      serviceFeeRate: 0.08,
    };
    set((state) => ({
      consignments: [newConsignment, ...state.consignments],
      currentConsignmentId: id,
    }));
    return id;
  },

  updateConsignmentStatus: (id, status) => {
    set((state) => ({
      consignments: state.consignments.map((c) =>
        c.id === id ? { ...c, status } : c
      ),
    }));
  },

  confirmValuation: (id) => {
    set((state) => ({
      consignments: state.consignments.map((c) =>
        c.id === id ? { ...c, status: 'shipping' as AppraisalStatus } : c
      ),
    }));
  },

  getConsignment: (id) => {
    return get().consignments.find((c) => c.id === id);
  },

  getProduct: (id) => {
    return get().listedProducts.find((p) => p.id === id);
  },

  filterProducts: ({ brands, grades, minPrice, maxPrice, keyword }) => {
    return get().listedProducts.filter((p) => {
      if (brands && brands.length > 0 && !brands.includes(p.brand)) return false;
      if (grades && grades.length > 0 && !grades.includes(p.conditionGrade)) return false;
      if (minPrice !== undefined && p.price < minPrice) return false;
      if (maxPrice !== undefined && p.price > maxPrice) return false;
      if (keyword) {
        const kw = keyword.toLowerCase();
        if (
          !p.brand.toLowerCase().includes(kw) &&
          !p.model.toLowerCase().includes(kw)
        )
          return false;
      }
      return true;
    });
  },
}));
