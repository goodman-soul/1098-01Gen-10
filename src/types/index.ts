export type Brand =
  | 'Hermès'
  | 'Chanel'
  | 'Louis Vuitton'
  | 'Gucci'
  | 'Dior'
  | 'Prada'
  | 'Celine'
  | 'Bottega Veneta';

export type ConditionGrade = 'S' | 'A' | 'B' | 'C';

export type AccessoryType =
  | 'dust_bag'
  | 'box'
  | 'receipt'
  | 'card'
  | 'ribbon'
  | 'lock'
  | 'key'
  | 'strap';

export type AppraisalStatus =
  | 'pending'
  | 'valuing'
  | 'shipping'
  | 'appraising'
  | 'passed'
  | 'failed'
  | 'listed';

export interface AppraisalItemCheck {
  name: string;
  result: 'pass' | 'fail' | 'warning';
  remark?: string;
}

export interface ConditionDetail {
  category: string;
  description: string;
  severity: 'none' | 'minor' | 'moderate' | 'severe';
  photoUrl?: string;
}

export interface AppraisalReport {
  reportId: string;
  appraiserName: string;
  appraiserTitle: string;
  appraiserAvatar: string;
  appraisalDate: string;
  isAuthentic: boolean;
  overallConclusion: string;
  itemChecks: AppraisalItemCheck[];
  conditionDetails: ConditionDetail[];
}

export interface Consignment {
  id: string;
  brand: Brand;
  model: string;
  year: number;
  originalPrice: number;
  flawPhotos: string[];
  accessories: AccessoryType[];
  customAccessories: string[];
  status: AppraisalStatus;
  createdAt: string;
  estimatedPriceMin?: number;
  estimatedPriceMax?: number;
  serviceFeeRate?: number;
  appraisalReport?: AppraisalReport;
  conditionGrade?: ConditionGrade;
}

export interface ReturnPolicy {
  hasSevenDayReturn: boolean;
  fakeOnePayThree: boolean;
  nonReturnReasons: string[];
  returnConditions: string[];
}

export interface ListedProduct {
  id: string;
  consignmentId: string;
  brand: Brand;
  model: string;
  year: number;
  conditionGrade: ConditionGrade;
  price: number;
  mainImage: string;
  images: string[];
  appraisalReportId: string;
  appraisalReport: AppraisalReport;
  returnPolicy: ReturnPolicy;
  createdAt: string;
}

export const BRANDS: Brand[] = [
  'Hermès',
  'Chanel',
  'Louis Vuitton',
  'Gucci',
  'Dior',
  'Prada',
  'Celine',
  'Bottega Veneta',
];

export const ACCESSORY_OPTIONS: { value: AccessoryType; label: string }[] = [
  { value: 'dust_bag', label: '防尘袋' },
  { value: 'box', label: '原装盒' },
  { value: 'receipt', label: '购买发票' },
  { value: 'card', label: '品牌卡' },
  { value: 'ribbon', label: '品牌丝带' },
  { value: 'lock', label: '锁扣' },
  { value: 'key', label: '钥匙' },
  { value: 'strap', label: '肩带' },
];

export const CONDITION_GRADE_INFO: Record<ConditionGrade, { label: string; desc: string; color: string }> = {
  S: { label: '新品级', desc: '几乎全新，无使用痕迹', color: '#D4AF37' },
  A: { label: '优品级', desc: '轻微使用痕迹，整体品相优秀', color: '#E9BF42' },
  B: { label: '良品级', desc: '可见使用痕迹，不影响美观', color: '#8A8A8A' },
  C: { label: '实用级', desc: '明显使用痕迹，价格优势显著', color: '#666666' },
};

export const STATUS_STEPS: { status: AppraisalStatus; label: string; desc: string }[] = [
  { status: 'pending', label: '提交申请', desc: '您的寄卖申请已提交' },
  { status: 'valuing', label: '平台估价', desc: 'AI智能系统正在估价' },
  { status: 'shipping', label: '等待寄件', desc: '请将商品寄送至平台' },
  { status: 'appraising', label: '专业鉴定', desc: '鉴定师正在进行鉴定' },
  { status: 'passed', label: '鉴定通过', desc: '鉴定通过，等待上架' },
  { status: 'listed', label: '已上架', desc: '商品已进入公开货架' },
];

export const BRAND_PRICE_FACTOR: Record<Brand, number> = {
  'Hermès': 0.85,
  'Chanel': 0.75,
  'Louis Vuitton': 0.65,
  'Gucci': 0.45,
  'Dior': 0.55,
  'Prada': 0.4,
  'Celine': 0.5,
  'Bottega Veneta': 0.48,
};
