import { create } from 'zustand';
import type {
  Consignment,
  ListedProduct,
  Brand,
  AccessoryType,
  AppraisalStatus,
  ConditionGrade,
  AppraisalReport,
  ReturnPolicy,
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

  completeAppraisal: (id: string, passed: boolean) => void;

  listToShelf: (id: string) => void;

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

const generateAppraisalReport = (brand: string, model: string, passed: boolean): { report: AppraisalReport; grade: ConditionGrade } => {
  const grades: ConditionGrade[] = ['S', 'A', 'B'];
  const grade = grades[Math.floor(Math.random() * grades.length)];

  const report: AppraisalReport = {
    reportId: `AR-${Date.now().toString(36).toUpperCase()}`,
    appraiserName: '陈鉴定师',
    appraiserTitle: '高级奢侈品鉴定师',
    appraiserAvatar:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20chinese%20female%20appraiser%20portrait%20luxury%20brand%20expert%20formal%20elegant&image_size=square',
    appraisalDate: new Date().toISOString().slice(0, 10),
    isAuthentic: passed,
    overallConclusion: passed
      ? `经专业鉴定，此${brand} ${model}为正品。整体品相优良，五金件光泽度良好，皮革质地柔韧，缝线工艺符合品牌标准。建议作为优品级流通。`
      : `经多维度专业鉴定，此${brand} ${model}不符合正品特征。LOGO刻印工艺、皮革材质、缝线密度等多项指标与品牌标准存在差异，不予通过。`,
    itemChecks: [
      { name: 'LOGO刻印', result: passed ? 'pass' : 'fail', remark: passed ? '刻印深浅均匀，字体符合品牌特征' : '刻印深浅不一，字体比例异常' },
      { name: '五金件', result: passed ? 'pass' : 'warning', remark: passed ? '镀层均匀，无明显氧化' : '镀层工艺粗糙，色泽偏黄' },
      { name: '皮革材质', result: passed ? 'pass' : 'fail', remark: passed ? '手感细腻，纹理自然' : '皮质偏硬，纹理不自然' },
      { name: '缝线工艺', result: passed ? 'pass' : 'fail', remark: passed ? '针距均匀，走线工整' : '针距不一致，线头外露' },
      { name: '内标序列号', result: passed ? 'pass' : 'warning', remark: passed ? '序列号格式正确，与生产年份匹配' : '序列号格式存疑，需进一步核验' },
      { name: '气味检测', result: passed ? 'pass' : 'fail', remark: passed ? '无刺鼻异味，皮革香气自然' : '有明显化学胶水气味' },
    ],
    conditionDetails: passed
      ? [
          { category: '包身整体', description: '包型挺括，无明显变形', severity: 'none' },
          { category: '四角磨损', description: grade === 'S' ? '无任何使用痕迹' : '底部边角有轻微使用痕迹', severity: grade === 'S' ? 'none' : 'minor' },
          { category: '五金件', description: grade === 'S' ? '全新亮泽，无划痕' : '锁扣处有细微划痕，不影响使用', severity: grade === 'S' ? 'none' : 'minor' },
          { category: '内里', description: '内衬干净，无污渍破损', severity: 'none' },
          { category: '手柄/肩带', description: '手柄处有自然使用色泽变化', severity: 'minor' },
        ]
      : [
          { category: '工艺整体', description: '多处工艺与品牌标准不符', severity: 'severe' },
          { category: '材质异常', description: '皮革与五金材质不符合品牌供应链标准', severity: 'severe' },
        ],
  };

  return { report, grade };
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

  completeAppraisal: (id, passed) => {
    set((state) => {
      const target = state.consignments.find((c) => c.id === id);
      if (!target) return state;
      const { report, grade } = generateAppraisalReport(
        target.brand,
        target.model,
        passed
      );
      return {
        consignments: state.consignments.map((c) =>
          c.id === id
            ? {
                ...c,
                status: (passed ? 'passed' : 'failed') as AppraisalStatus,
                appraisalReport: report,
                conditionGrade: passed ? grade : undefined,
              }
            : c
        ),
      };
    });
  },

  listToShelf: (id) => {
    set((state) => {
      const target = state.consignments.find((c) => c.id === id);
      if (!target || !target.appraisalReport || !target.conditionGrade) return state;

      const listPrice = Math.round(
        ((target.estimatedPriceMin || 0) + (target.estimatedPriceMax || 0)) / 2
      );

      const returnPolicy: ReturnPolicy = {
        hasSevenDayReturn: true,
        fakeOnePayThree: true,
        nonReturnReasons: [
          '商品已使用且造成明显磨损',
          '鉴定证书、防伪标签已拆毁',
          '商品配件不完整影响二次销售',
        ],
        returnConditions: [
          '签收后7天内可申请无理由退货',
          '需保持商品原状态，未使用未损伤',
          '所有附件（防尘袋、包装盒等）需一并退回',
          '退货运费由买家承担',
        ],
      };

      const newProduct: ListedProduct = {
        id: `LP-${Date.now().toString(36).toUpperCase()}`,
        consignmentId: id,
        brand: target.brand,
        model: target.model,
        year: target.year,
        conditionGrade: target.conditionGrade,
        price: listPrice,
        mainImage:
          target.flawPhotos[0] ||
          `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20${encodeURIComponent(target.brand)}%20${encodeURIComponent(target.model)}%20handbag%20studio%20shot&image_size=square_hd`,
        images: target.flawPhotos.slice(1),
        appraisalReportId: target.appraisalReport.reportId,
        appraisalReport: target.appraisalReport,
        returnPolicy,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      return {
        consignments: state.consignments.map((c) =>
          c.id === id ? { ...c, status: 'listed' as AppraisalStatus } : c
        ),
        listedProducts: [newProduct, ...state.listedProducts],
      };
    });
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
