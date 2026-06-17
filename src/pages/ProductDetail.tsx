import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Heart,
  MessageCircle,
  Truck,
  RefreshCw,
  ShieldAlert,
  User,
  Star,
  Info,
  Package,
  Clock,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { CONDITION_GRADE_INFO } from '@/types';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct } = useAppStore();
  const [activeImage, setActiveImage] = useState(0);
  const [expandedSections, setExpandedSections] = useState<string[]>(['appraisal', 'condition', 'return']);
  const [liked, setLiked] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const product = id ? getProduct(id) : undefined;

  if (!product) {
    return (
      <div className="py-32 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-sm bg-burgundy-700/10 border border-burgundy-700/30 mb-6">
          <AlertTriangle className="w-6 h-6 text-burgundy-400" />
          <span className="text-burgundy-300 font-serif-body text-lg">
            商品不存在或已下架
          </span>
        </div>
        <div>
          <Link to="/" className="btn-primary">
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回公开货架
          </Link>
        </div>
      </div>
    );
  }

  const gradeInfo = CONDITION_GRADE_INFO[product.conditionGrade];
  const report = product.appraisalReport;
  const images = [product.mainImage, ...product.images];

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const severityColor = {
    none: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    minor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    moderate: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    severe: 'text-burgundy-400 bg-burgundy-700/10 border-burgundy-700/30',
  };

  const severityLabel = {
    none: '无磨损',
    minor: '轻微',
    moderate: '中度',
    severe: '明显',
  };

  return (
    <div className="page-transition py-8 md:py-12">
      <div className="container max-w-7xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-charcoal-500 hover:text-champagne-400 transition-colors font-serif-body text-base mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回货架
        </button>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3 space-y-4">
            <div className="relative aspect-square rounded-sm overflow-hidden gold-border group">
              <img
                src={images[activeImage]}
                alt={`${product.brand} ${product.model}`}
                className="w-full h-full object-cover transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-champagne-500/30 animate-pulse-gold" />
                  <div className="relative flex items-center gap-1.5 px-3.5 py-2 bg-charcoal-950/90 backdrop-blur-sm rounded-full gold-border">
                    <ShieldCheck className="w-4 h-4 text-champagne-400" strokeWidth={2.5} />
                    <span className="text-[11px] font-medium tracking-widest text-champagne-300 uppercase">
                      鉴定通过
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setLiked(!liked)}
                className={`absolute top-4 right-4 w-11 h-11 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 z-10 ${
                  liked
                    ? 'bg-burgundy-700/90 gold-border'
                    : 'bg-charcoal-950/80 border border-charcoal-700 hover:border-burgundy-600/50'
                }`}
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-300 ${liked ? 'text-champagne-200 fill-champagne-200 scale-110' : 'text-charcoal-400'}`}
                />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative aspect-square rounded-sm overflow-hidden transition-all duration-300 ${
                    activeImage === index
                      ? 'gold-border shadow-gold scale-[1.02]'
                      : 'border border-charcoal-800 hover:border-champagne-600/40'
                  }`}
                >
                  <img src={img} alt={`图 ${index + 1}`} className="w-full h-full object-cover" />
                  {activeImage === index && (
                    <div className="absolute inset-0 bg-champagne-500/10" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] tracking-[0.3em] text-champagne-500 uppercase font-medium">
                  {product.brand}
                </span>
                <span className="w-1 h-1 rounded-full bg-charcoal-600" />
                <span className="text-[11px] tracking-widest text-charcoal-500 uppercase">
                  {product.year}年产
                </span>
                <span className="w-1 h-1 rounded-full bg-charcoal-600" />
                <span className="text-[11px] tracking-widest text-charcoal-500 uppercase">
                  {product.appraisalReportId}
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal-50 mb-4 leading-tight">
                {product.model}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-sm"
                  style={{
                    background: `linear-gradient(135deg, ${gradeInfo.color}22, ${gradeInfo.color}08)`,
                    border: `1px solid ${gradeInfo.color}66`,
                  }}
                >
                  <Award className="w-4 h-4" style={{ color: gradeInfo.color }} />
                  <span className="font-bold text-lg tracking-wide" style={{ color: gradeInfo.color }}>
                    {product.conditionGrade}
                  </span>
                  <span className="text-sm" style={{ color: gradeInfo.color, opacity: 0.85 }}>
                    · {gradeInfo.label}
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-sm bg-gradient-to-br from-champagne-500/10 via-charcoal-900/40 to-charcoal-950/60 gold-border mb-6">
                <div className="text-xs tracking-widest text-champagne-600 uppercase mb-2">
                  平台鉴定售价
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-charcoal-400 font-serif-body text-xl">¥</span>
                  <span className="font-display text-5xl font-black shimmer-text tracking-tight">
                    {product.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal-500 font-serif-body">
                  <span className="inline-flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-champagne-600" />
                    顺丰包邮
                  </span>
                  <span className="w-1 h-1 rounded-full bg-charcoal-700" />
                  <span className="inline-flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5 text-champagne-600" />
                    7天可退
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8">
                <button
                  onClick={() => setShowPurchaseModal(true)}
                  className="btn-gold py-4 text-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  立即购买
                </button>
                <button className="btn-primary py-4 text-lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  咨询客服
                </button>
              </div>
            </div>

            <div className="gold-divider" />

            <div className="space-y-4">
              <AccordionSection
                title="专业鉴定报告"
                icon={ShieldCheck}
                expanded={expandedSections.includes('appraisal')}
                onToggle={() => toggleSection('appraisal')}
                badge={
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wider uppercase">
                    <CheckCircle2 className="w-3 h-3" strokeWidth={3} />
                    正品
                  </span>
                }
              >
                <div className="p-6 rounded-sm bg-charcoal-900/40 border border-charcoal-800 mb-5">
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-charcoal-800">
                    <div className="w-14 h-14 rounded-full overflow-hidden gold-border shrink-0">
                      <img
                        src={report.appraiserAvatar}
                        alt="鉴定师"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-champagne-500" />
                        <span className="font-display text-xl font-bold text-champagne-300">
                          {report.appraiserName}
                        </span>
                      </div>
                      <div className="text-sm text-charcoal-500 font-serif-body">
                        {report.appraiserTitle} · 从业 12 年
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] tracking-widest text-charcoal-600 uppercase mb-1">
                        报告编号
                      </div>
                      <div className="font-mono text-sm text-charcoal-400">{report.reportId}</div>
                      <div className="text-xs text-charcoal-600 mt-0.5">{report.appraisalDate}</div>
                    </div>
                  </div>

                  <p className="text-charcoal-200 font-serif-body text-base leading-relaxed italic">
                    "{report.overallConclusion}"
                  </p>
                </div>

                <div className="text-xs tracking-wider text-champagne-600 uppercase mb-3">
                  分项鉴定明细
                </div>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {report.itemChecks.map((check, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3.5 rounded-sm bg-charcoal-900/30 border border-charcoal-800 hover:border-champagne-600/20 transition-colors"
                    >
                      <span className="font-serif-body text-charcoal-300 text-sm">{check.name}</span>
                      <div className="flex items-center gap-2">
                        {check.result === 'pass' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wide uppercase font-medium">
                            <CheckCircle2 className="w-3 h-3" strokeWidth={3} />
                            通过
                          </span>
                        )}
                        {check.result === 'warning' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-sm bg-amber-500/10 text-amber-400 border border-amber-500/20 tracking-wide uppercase font-medium">
                            <Info className="w-3 h-3" />
                            备注
                          </span>
                        )}
                        {check.result === 'fail' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-sm bg-burgundy-500/10 text-burgundy-400 border border-burgundy-500/20 tracking-wide uppercase font-medium">
                            <XCircle className="w-3 h-3" strokeWidth={3} />
                            异常
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {report.itemChecks.some((c) => c.remark) && (
                  <div className="mt-3 text-xs text-charcoal-500 font-serif-body space-y-1">
                    {report.itemChecks
                      .filter((c) => c.remark)
                      .map((c, i) => (
                        <p key={i} className="flex items-start gap-2">
                          <span className="text-champagne-500 shrink-0 mt-0.5">·</span>
                          <span><strong className="text-charcoal-400">{c.name}：</strong>{c.remark}</span>
                        </p>
                      ))}
                  </div>
                )}
              </AccordionSection>

              <AccordionSection
                title="成色评级详情"
                icon={Award}
                expanded={expandedSections.includes('condition')}
                onToggle={() => toggleSection('condition')}
                badge={
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm font-bold tracking-wider text-sm"
                    style={{
                      background: `linear-gradient(135deg, ${gradeInfo.color}25, ${gradeInfo.color}08)`,
                      border: `1px solid ${gradeInfo.color}55`,
                      color: gradeInfo.color,
                    }}
                  >
                    {product.conditionGrade} · {gradeInfo.label}
                  </span>
                }
              >
                <div className="p-5 rounded-sm bg-charcoal-900/40 border border-charcoal-800 mb-5">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-xs text-charcoal-500 tracking-wider uppercase mb-2">
                        评级标准
                      </div>
                      <p className="text-charcoal-300 font-serif-body text-base leading-relaxed">
                        {gradeInfo.desc}
                      </p>
                    </div>
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: `radial-gradient(circle, ${gradeInfo.color}20, transparent 70%)`,
                        border: `2px solid ${gradeInfo.color}66`,
                      }}
                    >
                      <Star className="w-8 h-8" style={{ color: gradeInfo.color }} fill={gradeInfo.color} fillOpacity={0.3} />
                    </div>
                  </div>
                </div>

                <div className="text-xs tracking-wider text-champagne-600 uppercase mb-3">
                  各部位成色说明
                </div>
                <div className="space-y-2.5">
                  {report.conditionDetails.map((detail, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 rounded-sm bg-charcoal-900/30 border border-charcoal-800"
                    >
                      <span
                        className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-sm border text-[10px] font-bold tracking-wider uppercase ${severityColor[detail.severity]}`}
                      >
                        {severityLabel[detail.severity]}
                      </span>
                      <div className="flex-1">
                        <div className="font-semibold text-charcoal-200 mb-0.5">
                          {detail.category}
                        </div>
                        <p className="text-sm text-charcoal-400 font-serif-body leading-relaxed">
                          {detail.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionSection>

              <AccordionSection
                title="退货规则与保障"
                icon={RefreshCw}
                expanded={expandedSections.includes('return')}
                onToggle={() => toggleSection('return')}
              >
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-4 rounded-sm bg-champagne-500/8 gold-border">
                    <RefreshCw className="w-6 h-6 text-champagne-400 mb-2" />
                    <div className="text-charcoal-100 font-bold mb-1">7 天无理由</div>
                    <div className="text-xs text-charcoal-500 font-serif-body">
                      {product.returnPolicy.hasSevenDayReturn ? '支持签收后7天内申请' : '不支持无理由退货'}
                    </div>
                  </div>
                  <div className="p-4 rounded-sm bg-emerald-500/8 border border-emerald-500/25">
                    <ShieldAlert className="w-6 h-6 text-emerald-400 mb-2" />
                    <div className="text-charcoal-100 font-bold mb-1">假一赔三</div>
                    <div className="text-xs text-charcoal-500 font-serif-body">
                      {product.returnPolicy.fakeOnePayThree ? '鉴定不符全额赔付三倍' : '按实价赔付'}
                    </div>
                  </div>
                </div>

                {product.returnPolicy.returnConditions.length > 0 && (
                  <>
                    <div className="text-xs tracking-wider text-champagne-600 uppercase mb-3">
                      退货条件
                    </div>
                    <ul className="space-y-2 mb-6">
                      {product.returnPolicy.returnConditions.map((cond, i) => (
                        <li key={i} className="flex items-start gap-3 p-3 rounded-sm bg-charcoal-900/30 border border-charcoal-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" strokeWidth={2.5} />
                          <span className="text-sm text-charcoal-300 font-serif-body leading-relaxed">
                            {cond}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {product.returnPolicy.nonReturnReasons.length > 0 && (
                  <>
                    <div className="text-xs tracking-wider text-burgundy-500 uppercase mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      以下情况不予退货
                    </div>
                    <ul className="space-y-2">
                      {product.returnPolicy.nonReturnReasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-3 p-3 rounded-sm bg-burgundy-700/5 border border-burgundy-700/20">
                          <XCircle className="w-4 h-4 text-burgundy-500 mt-0.5 shrink-0" strokeWidth={2} />
                          <span className="text-sm text-charcoal-300 font-serif-body leading-relaxed">
                            {reason}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </AccordionSection>

              <AccordionSection
                title="配送与服务"
                icon={Package}
                expanded={expandedSections.includes('shipping')}
                onToggle={() => toggleSection('shipping')}
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-sm bg-charcoal-900/30 border border-charcoal-800 flex items-start gap-3">
                    <Truck className="w-5 h-5 text-champagne-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-charcoal-200 mb-1">顺丰包邮</div>
                      <div className="text-xs text-charcoal-500 font-serif-body leading-relaxed">
                        全程保价，预计 1-3 个工作日送达，需本人签收
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-sm bg-charcoal-900/30 border border-charcoal-800 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-champagne-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-charcoal-200 mb-1">极速发货</div>
                      <div className="text-xs text-charcoal-500 font-serif-body leading-relaxed">
                        付款后 24 小时内出库，下单即赠全程物流险
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-sm bg-charcoal-900/30 border border-charcoal-800 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-champagne-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-charcoal-200 mb-1">双重包装</div>
                      <div className="text-xs text-charcoal-500 font-serif-body leading-relaxed">
                        品牌原包装 + 平台定制防护箱，双重保障商品完好
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-sm bg-charcoal-900/30 border border-charcoal-800 flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-champagne-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-charcoal-200 mb-1">专属客服</div>
                      <div className="text-xs text-charcoal-500 font-serif-body leading-relaxed">
                        7×24 小时在线，资深顾问一对一解答所有疑问
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionSection>
            </div>
          </div>
        </div>
      </div>

      {showPurchaseModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-charcoal-950/90 backdrop-blur-md"
            onClick={() => setShowPurchaseModal(false)}
          />
          <div className="relative card-luxury p-8 w-full max-w-md animate-fade-up">
            <button
              onClick={() => setShowPurchaseModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-charcoal-500 hover:text-champagne-400 hover:bg-champagne-500/10 transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-champagne-500/15 gold-border mb-4">
                <ShieldCheck className="w-8 h-8 text-champagne-400" strokeWidth={2} />
              </div>
              <h3 className="font-display text-2xl font-bold text-charcoal-50 mb-2">
                确认购买
              </h3>
              <p className="text-charcoal-500 font-serif-body">
                您即将购买这件经过专业鉴定的 {product.brand} 商品
              </p>
            </div>

            <div className="p-5 rounded-sm bg-charcoal-900/50 gold-border mb-6">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-charcoal-800">
                <div className="w-16 h-16 rounded-sm overflow-hidden gold-border shrink-0">
                  <img src={product.mainImage} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs tracking-widest text-champagne-500 uppercase mb-0.5">
                    {product.brand}
                  </div>
                  <div className="font-display text-lg font-bold text-charcoal-100 truncate">
                    {product.model}
                  </div>
                  <div className="text-xs text-charcoal-500 mt-0.5">
                    成色 {product.conditionGrade} · {gradeInfo.label}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-charcoal-400 font-serif-body">应付金额</span>
                <span className="font-display text-3xl font-bold shimmer-text">
                  ¥{product.price.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="btn-gold w-full py-4 text-lg">
                <ShieldCheck className="w-5 h-5 mr-2" />
                确认支付（正品保障）
              </button>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="w-full py-3 text-charcoal-500 hover:text-champagne-400 transition-colors font-serif-body text-sm"
              >
                再想想，继续浏览
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface AccordionSectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  expanded: boolean;
  onToggle: () => void;
  badge?: React.ReactNode;
  children: React.ReactNode;
}

function AccordionSection({ title, icon: Icon, expanded, onToggle, badge, children }: AccordionSectionProps) {
  return (
    <div className="rounded-sm overflow-hidden border border-charcoal-800 bg-charcoal-900/20 hover:border-charcoal-700 transition-colors">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-5 text-left hover:bg-charcoal-900/30 transition-colors"
      >
        <div className="w-9 h-9 rounded-full bg-champagne-500/10 flex items-center justify-center gold-border shrink-0">
          <Icon className="w-4.5 h-4.5 text-champagne-400" />
        </div>
        <span className="flex-1 font-display text-lg font-semibold text-charcoal-100 tracking-wide">
          {title}
        </span>
        {badge}
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-champagne-500 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-charcoal-500 shrink-0" />
        )}
      </button>
      {expanded && (
        <div className="px-5 pb-5 border-t border-charcoal-800 pt-5 animate-fade-up">
          {children}
        </div>
      )}
    </div>
  );
}
