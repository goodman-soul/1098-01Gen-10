import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PackagePlus,
  ChevronRight,
  CheckCircle2,
  Check,
  Plus,
  X,
  Info,
  Calendar,
  Tag,
  Camera,
  FolderCheck,
  ShieldAlert,
} from 'lucide-react';
import PhotoUpload from '@/components/PhotoUpload';
import { useAppStore } from '@/store/useAppStore';
import type { Brand, AccessoryType } from '@/types';
import { BRANDS, ACCESSORY_OPTIONS } from '@/types';

const STEPS = [
  { label: '基础信息', icon: Tag },
  { label: '瑕疵照片', icon: Camera },
  { label: '附件清单', icon: FolderCheck },
  { label: '确认提交', icon: CheckCircle2 },
];

export default function Consign() {
  const navigate = useNavigate();
  const { addConsignment, consignments } = useAppStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [brand, setBrand] = useState<Brand | ''>('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [flawPhotos, setFlawPhotos] = useState<string[]>([]);
  const [accessories, setAccessories] = useState<AccessoryType[]>([]);
  const [customAccessory, setCustomAccessory] = useState('');
  const [customAccessories, setCustomAccessories] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleAccessory = (type: AccessoryType) => {
    setAccessories((prev) =>
      prev.includes(type) ? prev.filter((a) => a !== type) : [...prev, type]
    );
  };

  const addCustomAccessory = () => {
    if (customAccessory.trim()) {
      setCustomAccessories([...customAccessories, customAccessory.trim()]);
      setCustomAccessory('');
    }
  };

  const removeCustomAccessory = (index: number) => {
    setCustomAccessories(customAccessories.filter((_, i) => i !== index));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return brand && model.trim() && year && year > 2000 && year <= new Date().getFullYear() && originalPrice && originalPrice > 0;
      case 1:
        return flawPhotos.length >= 1;
      case 2:
        return true;
      case 3:
        return agreed;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!canProceed() || !brand || !year || !originalPrice) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    const id = addConsignment({
      brand,
      model: model.trim(),
      year: Number(year),
      originalPrice: Number(originalPrice),
      flawPhotos,
      accessories,
      customAccessories,
    });
    setSubmitting(false);
    navigate(`/process/${id}`);
  };

  const nextStep = () => {
    if (currentStep < 3 && canProceed()) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => thisYear - i);

  return (
    <div className="page-transition py-12 md:py-16">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gold-border bg-charcoal-900/50 mb-6">
            <PackagePlus className="w-4 h-4 text-champagne-400" />
            <span className="text-sm text-champagne-300 tracking-wider font-serif-body">
              开始您的寄卖之旅
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal-50 mb-4">
            提交 <span className="shimmer-text">寄卖申请</span>
          </h1>
          <p className="text-charcoal-400 font-serif-body text-lg max-w-xl mx-auto">
            填写商品信息，平台将在 24 小时内为您出具专业估价
          </p>
        </div>

        <div className="card-luxury p-6 md:p-10 mb-10">
          <div className="relative">
            <div className="hidden md:block absolute top-5 left-12 right-12 h-px bg-charcoal-700">
              <div
                className="h-full bg-gradient-to-r from-champagne-500 to-champagne-400 transition-all duration-500"
                style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const done = index < currentStep;
                const active = index === currentStep;
                return (
                  <div key={index} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                        done
                          ? 'bg-champagne-500/20 border-2 border-champagne-400 shadow-gold'
                          : active
                          ? 'bg-charcoal-800 border-2 border-champagne-400'
                          : 'bg-charcoal-900 border-2 border-charcoal-700'
                      }`}
                    >
                      {done ? (
                        <Check className="w-5 h-5 text-champagne-400" strokeWidth={3} />
                      ) : (
                        <Icon
                          className={`w-4 h-4 md:w-5 md:h-5 ${
                            active ? 'text-champagne-400' : 'text-charcoal-500'
                          }`}
                        />
                      )}
                    </div>
                    <div
                      className={`mt-2 md:mt-3 text-[10px] md:text-xs font-serif-body text-center tracking-wide ${
                        active
                          ? 'text-champagne-300 font-semibold'
                          : done
                          ? 'text-charcoal-300'
                          : 'text-charcoal-600'
                      }`}
                    >
                      {step.label}
                    </div>
                    <div className="md:hidden text-[9px] text-charcoal-600 mt-1">
                      Step {index + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card-luxury p-6 md:p-10 mb-8">
          {currentStep === 0 && (
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal-50 mb-2">
                  商品基础信息
                </h2>
                <p className="text-charcoal-500 font-serif-body text-base">
                  请准确填写以下信息，以便我们为您提供更精准的估价服务
                </p>
              </div>

              <div className="gold-divider" />

              <div className="space-y-8">
                <div>
                  <label className="flex items-center gap-2 font-serif-body text-lg text-charcoal-200 tracking-wide mb-3">
                    <Tag className="w-4 h-4 text-champagne-500" />
                    奢侈品牌
                    <span className="text-burgundy-400 text-sm">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {BRANDS.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBrand(b)}
                        className={`p-4 rounded-sm text-center font-serif-body transition-all duration-300 ${
                          brand === b
                            ? 'bg-champagne-500/15 text-champagne-300 gold-border shadow-gold'
                            : 'bg-charcoal-900/40 text-charcoal-400 border border-charcoal-700 hover:border-champagne-600/40 hover:text-champagne-500'
                        }`}
                      >
                        <div className="font-display text-base font-semibold">{b}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 font-serif-body text-lg text-charcoal-200 tracking-wide mb-3">
                      款式型号
                      <span className="text-burgundy-400 text-sm">*</span>
                    </label>
                    <input
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="例如：Birkin 30、Classic Flap..."
                      className="input-luxury"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-serif-body text-lg text-charcoal-200 tracking-wide mb-3">
                      <Calendar className="w-4 h-4 text-champagne-500" />
                      购买年份
                      <span className="text-burgundy-400 text-sm">*</span>
                    </label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value ? Number(e.target.value) : '')}
                      className="input-luxury appearance-none cursor-pointer pr-10"
                    >
                      <option value="">请选择购买年份</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y} 年
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 font-serif-body text-lg text-charcoal-200 tracking-wide mb-3">
                    购买原价（人民币）
                    <span className="text-burgundy-400 text-sm">*</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] tracking-wider bg-charcoal-800 rounded text-charcoal-500 ml-2">
                      <Info className="w-3 h-3" />
                      用于参考估价
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-champagne-500 font-display text-xl">
                      ¥
                    </span>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) =>
                        setOriginalPrice(e.target.value ? Number(e.target.value) : '')
                      }
                      placeholder="请输入购买时的价格"
                      className="input-luxury pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal-50 mb-2">
                  瑕疵照片上传
                </h2>
                <p className="text-charcoal-500 font-serif-body text-base">
                  真实的瑕疵描述有助于加速鉴定流程，提升估价准确性
                </p>
              </div>

              <div className="gold-divider" />

              <div className="p-5 rounded-sm bg-burgundy-700/5 border border-burgundy-700/20 flex gap-4">
                <ShieldAlert className="w-6 h-6 text-burgundy-400 shrink-0 mt-0.5" />
                <div className="text-sm text-charcoal-300 font-serif-body leading-relaxed space-y-1">
                  <p className="text-burgundy-300 font-semibold">拍摄建议：</p>
                  <p>• 整体外观：正面、背面、侧面各一张</p>
                  <p>• 细节部位：四角磨损、五金划痕、污渍、脱线等请特写拍摄</p>
                  <p>• 内里情况：内衬是否有污渍、破损、异味</p>
                  <p>• 特殊情况：若有染色、变形、维修史，请务必详细记录</p>
                </div>
              </div>

              <PhotoUpload photos={flawPhotos} onChange={setFlawPhotos} maxPhotos={12} />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal-50 mb-2">
                  附件清单
                </h2>
                <p className="text-charcoal-500 font-serif-body text-base">
                  完整的附件可以显著提升商品的最终售价
                </p>
              </div>

              <div className="gold-divider" />

              <div>
                <label className="font-serif-body text-lg text-charcoal-200 tracking-wide mb-4 block">
                  请勾选您一并寄售的附件
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {ACCESSORY_OPTIONS.map((opt) => {
                    const active = accessories.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => toggleAccessory(opt.value)}
                        className={`p-4 rounded-sm text-left transition-all duration-300 relative ${
                          active
                            ? 'bg-champagne-500/12 gold-border shadow-gold'
                            : 'bg-charcoal-900/40 border border-charcoal-700 hover:border-champagne-600/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`font-serif-body text-base ${
                              active ? 'text-champagne-300' : 'text-charcoal-300'
                            }`}
                          >
                            {opt.label}
                          </span>
                          {active && (
                            <Check className="w-4 h-4 text-champagne-400" strokeWidth={3} />
                          )}
                        </div>
                        <div
                          className={`text-[10px] tracking-wider uppercase ${
                            active ? 'text-champagne-600' : 'text-charcoal-600'
                          }`}
                        >
                          {opt.value.replace('_', ' ')}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-serif-body text-lg text-charcoal-200 tracking-wide mb-3 block">
                  其他附件（可选）
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={customAccessory}
                    onChange={(e) => setCustomAccessory(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAccessory())}
                    placeholder="例如：保养凭证、购物袋、额外肩带等"
                    className="input-luxury flex-1"
                  />
                  <button
                    onClick={addCustomAccessory}
                    disabled={!customAccessory.trim()}
                    className="px-5 py-3.5 rounded-sm gold-border text-champagne-400 hover:bg-champagne-500/10 disabled:opacity-40 disabled:hover:bg-transparent transition-all duration-300 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    添加
                  </button>
                </div>
                {customAccessories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {customAccessories.map((item, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-champagne-500/10 gold-border"
                      >
                        <span className="text-champagne-300 font-serif-body text-sm">
                          {item}
                        </span>
                        <button
                          onClick={() => removeCustomAccessory(index)}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-charcoal-500 hover:text-burgundy-400 hover:bg-burgundy-700/20 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-5 rounded-sm bg-champagne-500/5 border border-champagne-500/15">
                <p className="text-sm font-serif-body text-charcoal-300">
                  <span className="text-champagne-400 font-semibold">您已选择：</span>
                  {accessories.length === 0 && customAccessories.length === 0 ? (
                    <span className="text-charcoal-500 ml-2">暂未选择任何附件</span>
                  ) : (
                    <span className="text-charcoal-200 ml-2">
                      {[
                        ...accessories.map(
                          (a) => ACCESSORY_OPTIONS.find((o) => o.value === a)?.label
                        ),
                        ...customAccessories,
                      ]
                        .filter(Boolean)
                        .join('、')}
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal-50 mb-2">
                  确认并提交
                </h2>
                <p className="text-charcoal-500 font-serif-body text-base">
                  请仔细核对以下信息，提交后平台将在 24 小时内出具专业估价
                </p>
              </div>

              <div className="gold-divider" />

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-sm bg-charcoal-900/50 gold-border">
                    <div className="text-xs tracking-wider text-champagne-600 uppercase mb-2">
                      品牌
                    </div>
                    <div className="font-display text-2xl font-bold text-charcoal-100">
                      {brand}
                    </div>
                  </div>
                  <div className="p-5 rounded-sm bg-charcoal-900/50 gold-border">
                    <div className="text-xs tracking-wider text-champagne-600 uppercase mb-2">
                      款式 / 年份
                    </div>
                    <div className="font-display text-xl font-bold text-charcoal-100">
                      {model}
                      <span className="text-charcoal-500 text-base font-normal ml-2">
                        {year}年
                      </span>
                    </div>
                  </div>
                  <div className="p-5 rounded-sm bg-charcoal-900/50 gold-border">
                    <div className="text-xs tracking-wider text-champagne-600 uppercase mb-2">
                      购买原价
                    </div>
                    <div className="font-display text-2xl font-bold shimmer-text">
                      ¥{Number(originalPrice).toLocaleString()}
                    </div>
                  </div>
                  <div className="p-5 rounded-sm bg-charcoal-900/50 gold-border">
                    <div className="text-xs tracking-wider text-champagne-600 uppercase mb-2">
                      瑕疵照片 / 附件
                    </div>
                    <div className="font-display text-xl font-bold text-charcoal-100">
                      {flawPhotos.length} 张照片
                      <span className="text-charcoal-500 text-base font-normal mx-2">·</span>
                      {accessories.length + customAccessories.length} 件附件
                    </div>
                  </div>
                </div>

                {flawPhotos.length > 0 && (
                  <div className="p-5 rounded-sm bg-charcoal-900/30 border border-charcoal-800">
                    <div className="text-sm font-serif-body text-charcoal-400 mb-3 tracking-wide">
                      已上传瑕疵照片预览（前4张）
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {flawPhotos.slice(0, 4).map((photo, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-sm overflow-hidden gold-border"
                        >
                          <img
                            src={photo}
                            alt={`预览 ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 rounded-sm bg-charcoal-900/60 border border-charcoal-700">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div
                    className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                      agreed
                        ? 'bg-champagne-500 border-champagne-500'
                        : 'border-charcoal-600 group-hover:border-champagne-500/60'
                    }`}
                    onClick={() => setAgreed(!agreed)}
                  >
                    {agreed && <Check className="w-4 h-4 text-charcoal-950" strokeWidth={3} />}
                  </div>
                  <div
                    className="text-sm font-serif-body leading-relaxed text-charcoal-400"
                    onClick={() => setAgreed(!agreed)}
                  >
                    我已阅读并同意
                    <span className="text-champagne-400 mx-1 hover:underline cursor-pointer">
                      《VERITAS寄卖服务协议》
                    </span>
                    和
                    <span className="text-champagne-400 mx-1 hover:underline cursor-pointer">
                      《隐私政策》
                    </span>
                    。我确认所提供的信息真实有效，所寄售商品为本人合法所有，并知悉平台有权拒绝涉嫌非法来源的商品。
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed order-2 sm:order-1"
          >
            ← 上一步
          </button>

          {currentStep < 3 ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none order-1 sm:order-2 w-full sm:w-auto"
            >
              下一步
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || submitting}
              className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none order-1 sm:order-2 w-full sm:w-auto"
            >
              {submitting ? (
                <>
                  <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  提交中...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  确认提交申请
                </>
              )}
            </button>
          )}
        </div>

        {consignments.length > 0 && (
          <div className="mt-12 pt-8 border-t border-charcoal-800/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-charcoal-300 tracking-wide">
                我的寄卖记录
              </h3>
              <span className="text-sm text-charcoal-500 font-serif-body">
                共 {consignments.length} 条
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {consignments.slice(0, 3).map((c) => (
                <button
                  key={c.id}
                  onClick={() => navigate(`/process/${c.id}`)}
                  className="p-4 rounded-sm bg-charcoal-900/40 border border-charcoal-800 hover:border-champagne-600/40 hover:bg-charcoal-900/60 text-left transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-display text-base font-bold text-charcoal-100 group-hover:text-champagne-300 transition-colors">
                        {c.brand} {c.model}
                      </div>
                      <div className="text-xs text-charcoal-500 tracking-wider">
                        {c.year}年 · {c.id}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-champagne-500 tracking-wider uppercase mt-2">
                    {c.status === 'valuing' && '估价中'}
                    {c.status === 'shipping' && '等待寄件'}
                    {c.status === 'appraising' && '鉴定中'}
                    {c.status === 'passed' && '鉴定通过'}
                    {c.status === 'listed' && '已上架'}
                    {c.status === 'failed' && '鉴定未通过'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
