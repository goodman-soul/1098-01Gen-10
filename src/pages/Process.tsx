import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  TrendingUp,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Truck,
  MapPin,
  Copy,
  Clock,
  User,
  Award,
  AlertTriangle,
  Package,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import ProcessTimeline from '@/components/ProcessTimeline';
import { useAppStore } from '@/store/useAppStore';
import { CONDITION_GRADE_INFO, ACCESSORY_OPTIONS } from '@/types';

export default function Process() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getConsignment, confirmValuation, updateConsignmentStatus, completeAppraisal, listToShelf } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const consignment = id ? getConsignment(id) : undefined;

  if (!consignment) {
    return (
      <div className="py-32 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-sm bg-burgundy-700/10 border border-burgundy-700/30 mb-6">
          <AlertTriangle className="w-6 h-6 text-burgundy-400" />
          <span className="text-burgundy-300 font-serif-body text-lg">
            未找到对应的寄卖记录
          </span>
        </div>
        <div>
          <Link to="/consign" className="btn-primary">
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回寄卖页面
          </Link>
        </div>
      </div>
    );
  }

  const gradeInfo = consignment.conditionGrade
    ? CONDITION_GRADE_INFO[consignment.conditionGrade]
    : null;

  const hasEstimate =
    consignment.estimatedPriceMin !== undefined &&
    consignment.estimatedPriceMax !== undefined;

  const showValuation = ['valuing', 'shipping', 'appraising', 'passed', 'failed', 'listed'].includes(
    consignment.status
  );

  const handleConfirm = async () => {
    setConfirming(true);
    await new Promise((r) => setTimeout(r, 800));
    confirmValuation(consignment.id);
    setConfirming(false);
  };

  const handleSimulateProgress = async () => {
    if (consignment.status === 'shipping') {
      await new Promise((r) => setTimeout(r, 600));
      updateConsignmentStatus(consignment.id, 'appraising');
    } else if (consignment.status === 'appraising') {
      await new Promise((r) => setTimeout(r, 1200));
      completeAppraisal(consignment.id, true);
    }
  };

  const trackingCode = `VT${consignment.id.slice(-6).toUpperCase()}CN`;

  return (
    <div className="page-transition py-12 md:py-16">
      <div className="container max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-charcoal-500 hover:text-champagne-400 transition-colors font-serif-body text-base mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          返回上一页
        </button>

        <div className="card-luxury p-6 md:p-10 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="px-3 py-1 rounded-sm bg-champagne-500/15 gold-border">
                  <span className="text-xs text-champagne-400 tracking-widest font-medium">
                    寄卖单号 {consignment.id}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-charcoal-500 font-serif-body">
                  <Clock className="w-3.5 h-3.5" />
                  提交于 {consignment.createdAt}
                </div>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal-50 mb-2">
                {consignment.brand}
                <span className="text-champagne-400 mx-3">·</span>
                {consignment.model}
              </h1>
              <p className="text-charcoal-400 font-serif-body text-lg">
                {consignment.year} 年款 · 原价 ¥{consignment.originalPrice.toLocaleString()}
              </p>
            </div>
            <div className="shrink-0">
              <div className="badge-gold text-sm py-2 px-4">
                {consignment.status === 'pending' && <>待处理</>}
                {consignment.status === 'valuing' && <><Sparkles className="w-3.5 h-3.5" />AI 估价中</>}
                {consignment.status === 'shipping' && <><Truck className="w-3.5 h-3.5" />等待寄送</>}
                {consignment.status === 'appraising' && <><ShieldCheck className="w-3.5 h-3.5" />鉴定师鉴定中</>}
                {consignment.status === 'passed' && <><CheckCircle2 className="w-3.5 h-3.5" />鉴定通过</>}
                {consignment.status === 'failed' && <><XCircle className="w-3.5 h-3.5" />鉴定未通过</>}
                {consignment.status === 'listed' && <><Package className="w-3.5 h-3.5" />已上架出售</>}
              </div>
            </div>
          </div>

          <ProcessTimeline currentStatus={consignment.status} />
        </div>

        {showValuation && (
          <div className="card-luxury p-6 md:p-10 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-champagne-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-champagne-500/15 flex items-center justify-center gold-border">
                  <TrendingUp className="w-6 h-6 text-champagne-400" />
                </div>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal-50">
                    平台 AI 估价区间
                  </h2>
                  <p className="text-charcoal-500 font-serif-body text-base mt-1">
                    基于品牌保值率、年份、市场行情及附件完整度综合评估
                  </p>
                </div>
              </div>

              {hasEstimate ? (
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="md:col-span-2 p-6 md:p-8 rounded-sm gold-border bg-gradient-to-br from-charcoal-800/60 via-charcoal-900/40 to-charcoal-950/60">
                    <div className="text-xs tracking-[0.3em] text-champagne-600 uppercase mb-4">
                      Estimated Price Range
                    </div>
                    <div className="flex items-end gap-4 mb-6">
                      <div>
                        <span className="text-charcoal-500 font-serif-body text-lg">¥</span>
                        <span className="font-display text-4xl md:text-5xl font-bold shimmer-text">
                          {consignment.estimatedPriceMin?.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-charcoal-600 text-3xl font-light mb-2">—</div>
                      <div>
                        <span className="text-charcoal-500 font-serif-body text-lg">¥</span>
                        <span className="font-display text-4xl md:text-5xl font-bold shimmer-text">
                          {consignment.estimatedPriceMax?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-champagne-500/10 border border-champagne-500/25 rounded-sm text-champagne-400 font-serif-body tracking-wide">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        保真服务
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-charcoal-800/80 border border-charcoal-700 rounded-sm text-charcoal-400 font-serif-body tracking-wide">
                        服务费 {(consignment.serviceFeeRate || 0.08) * 100}%
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-charcoal-800/80 border border-charcoal-700 rounded-sm text-charcoal-400 font-serif-body tracking-wide">
                        预计到手 ¥
                        {Math.round(
                          (consignment.estimatedPriceMin || 0) *
                            (1 - (consignment.serviceFeeRate || 0.08))
                        ).toLocaleString()}
                        {' ~ '}
                        ¥
                        {Math.round(
                          (consignment.estimatedPriceMax || 0) *
                            (1 - (consignment.serviceFeeRate || 0.08))
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 rounded-sm bg-charcoal-900/50 border border-charcoal-800">
                      <div className="text-xs text-charcoal-500 tracking-wider uppercase mb-2">
                        估价参考
                      </div>
                      <ul className="space-y-2 text-sm font-serif-body text-charcoal-400">
                        <li className="flex items-start gap-2">
                          <span className="text-champagne-500 mt-1">·</span>
                          <span>品牌保值率：{consignment.brand}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-champagne-500 mt-1">·</span>
                          <span>年份：{new Date().getFullYear() - consignment.year} 年</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-champagne-500 mt-1">·</span>
                          <span>
                            附件完整度：{consignment.accessories.length + consignment.customAccessories.length}/8
                          </span>
                        </li>
                      </ul>
                    </div>

                    {consignment.status === 'valuing' && (
                      <button
                        onClick={handleConfirm}
                        disabled={confirming}
                        className="btn-gold w-full"
                      >
                        {confirming ? (
                          <>
                            <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            确认中...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            确认并寄送
                          </>
                        )}
                      </button>
                    )}

                    {consignment.status === 'shipping' && (
                      <button
                        onClick={handleSimulateProgress}
                        className="btn-gold w-full"
                      >
                        <Truck className="w-5 h-5 mr-2" />
                        模拟已寄出
                      </button>
                    )}

                    {consignment.status === 'appraising' && (
                      <button
                        onClick={handleSimulateProgress}
                        className="btn-primary w-full"
                      >
                        <ShieldCheck className="w-5 h-5 mr-2" />
                        模拟完成鉴定
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full gold-border bg-charcoal-900/50 mb-4">
                    <svg className="w-5 h-5 text-champagne-400 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="text-champagne-300 font-serif-body">AI 智能估价系统正在分析...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {consignment.status === 'shipping' && (
          <div className="card-luxury p-6 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-champagne-500/15 flex items-center justify-center gold-border">
                <MapPin className="w-6 h-6 text-champagne-400" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-charcoal-50">
                  寄送至 VERITAS 鉴定中心
                </h2>
                <p className="text-charcoal-500 font-serif-body mt-1">
                  请在 72 小时内寄出商品，我们收到后将在 48 小时内完成鉴定
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 rounded-sm bg-charcoal-900/50 gold-border">
                <div className="text-xs tracking-wider text-champagne-500 uppercase mb-3">
                  收货地址
                </div>
                <div className="text-charcoal-200 font-serif-body leading-relaxed">
                  <p className="font-semibold mb-1">VERITAS 上海鉴定中心</p>
                  <p className="text-charcoal-400">上海市静安区南京西路1788号</p>
                  <p className="text-charcoal-400">国金中心 T2 座 38 层</p>
                  <p className="text-charcoal-400">收件人：鉴收专员 · 400-888-0000</p>
                  <p className="text-charcoal-400">邮编：200040</p>
                </div>
              </div>
              <div className="p-5 rounded-sm bg-charcoal-900/50 gold-border">
                <div className="text-xs tracking-wider text-champagne-500 uppercase mb-3">
                  运单标识
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="font-mono text-2xl font-bold tracking-widest text-champagne-300">
                    {trackingCode}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(trackingCode);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="w-9 h-9 rounded-sm flex items-center justify-center gold-border text-champagne-400 hover:bg-champagne-500/10 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {copied && (
                  <div className="text-xs text-champagne-500 mb-3">✓ 已复制到剪贴板</div>
                )}
                <div className="p-3 rounded-sm bg-burgundy-700/5 border border-burgundy-700/20">
                  <p className="text-xs text-burgundy-300 font-serif-body leading-relaxed">
                    <strong>重要提示：</strong>请在快递面单显眼处标注运单标识，以便我们快速识别您的包裹。建议使用顺丰保价服务。
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-sm bg-charcoal-900/30 border border-charcoal-800">
              <div className="text-sm font-serif-body text-charcoal-300 leading-relaxed space-y-2">
                <p className="flex items-start gap-2">
                  <Package className="w-4 h-4 text-champagne-500 mt-0.5 shrink-0" />
                  <span><strong>包装建议：</strong>请使用气泡膜充分包裹商品，装入硬纸盒以防止运输过程中造成二次损伤。</span>
                </p>
                <p className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-champagne-500 mt-0.5 shrink-0" />
                  <span><strong>安全保障：</strong>平台提供最高 50 万元保价，任何运输异常由平台全额承担。</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {(consignment.status === 'passed' || consignment.status === 'listed') &&
          consignment.appraisalReport && (
            <div className="card-luxury p-6 md:p-10 mb-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-champagne-500/15 flex items-center justify-center gold-border">
                  <Award className="w-6 h-6 text-champagne-400" />
                </div>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal-50">
                    专业鉴定报告
                  </h2>
                  <p className="text-charcoal-500 font-serif-body text-base mt-1">
                    报告编号：{consignment.appraisalReport.reportId} ·{' '}
                    {consignment.appraisalReport.appraisalDate}
                  </p>
                </div>
              </div>

              <div
                className="relative p-8 md:p-12 rounded-sm gold-border mb-8"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(26,26,26,0.9) 0%, rgba(13,13,13,0.95) 100%)',
                }}
              >
                <div className="absolute top-6 right-6 opacity-20">
                  <ShieldCheck className="w-32 h-32 text-champagne-500" strokeWidth={1} />
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-champagne-500/20">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden gold-border">
                        <img
                          src={consignment.appraisalReport.appraiserAvatar}
                          alt="鉴定师"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-champagne-500" />
                          <span className="font-display text-xl font-bold text-champagne-300">
                            {consignment.appraisalReport.appraiserName}
                          </span>
                        </div>
                        <div className="text-sm text-charcoal-400 font-serif-body tracking-wide">
                          {consignment.appraisalReport.appraiserTitle} · 从业 12 年
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" strokeWidth={2.5} />
                        <span className="font-display text-lg font-bold text-emerald-300 tracking-wide">
                          正品保证
                        </span>
                      </div>
                    </div>
                  </div>

                  {gradeInfo && (
                    <div className="mb-8">
                      <div className="text-xs tracking-wider text-champagne-600 uppercase mb-3">
                        综合成色评级
                      </div>
                      <div className="flex items-center gap-4">
                        <div
                          className="w-20 h-20 rounded-full flex items-center justify-center gold-border shadow-gold"
                          style={{
                            background: `radial-gradient(circle, ${gradeInfo.color}15 0%, transparent 70%)`,
                          }}
                        >
                          <span
                            className="font-display text-4xl font-black"
                            style={{ color: gradeInfo.color }}
                          >
                            {consignment.conditionGrade}
                          </span>
                        </div>
                        <div>
                          <div
                            className="font-display text-2xl font-bold mb-1"
                            style={{ color: gradeInfo.color }}
                          >
                            {gradeInfo.label}
                          </div>
                          <div className="text-sm text-charcoal-400 font-serif-body">
                            {gradeInfo.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mb-8">
                    <div className="text-xs tracking-wider text-champagne-600 uppercase mb-4">
                      鉴定师综合评语
                    </div>
                    <p className="text-charcoal-200 font-serif-body text-lg leading-relaxed italic">
                      "{consignment.appraisalReport.overallConclusion}"
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="text-xs tracking-wider text-champagne-600 uppercase mb-4">
                      分项鉴定结果
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {consignment.appraisalReport.itemChecks.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 rounded-sm bg-charcoal-900/40 border border-charcoal-800"
                        >
                          <span className="font-serif-body text-charcoal-300">{item.name}</span>
                          <div className="flex items-center gap-2">
                            {item.result === 'pass' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <CheckCircle2 className="w-3 h-3" />
                                通过
                              </span>
                            )}
                            {item.result === 'warning' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-sm bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                <AlertTriangle className="w-3 h-3" />
                                备注
                              </span>
                            )}
                            {item.result === 'fail' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-sm bg-burgundy-500/10 text-burgundy-400 border border-burgundy-500/20">
                                <XCircle className="w-3 h-3" />
                                异常
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-champagne-500/15">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-xs text-charcoal-500 mb-1">鉴定师电子签名</div>
                        <div
                          className="font-display text-2xl italic text-champagne-400"
                          style={{ fontFamily: 'cursive' }}
                        >
                          {consignment.appraisalReport.appraiserName}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-20 h-20 rounded-full border-4 border-dashed border-emerald-500/30 flex items-center justify-center animate-pulse">
                          <div className="text-center">
                            <ShieldCheck className="w-6 h-6 text-emerald-500 mx-auto mb-0.5" strokeWidth={2} />
                            <div className="text-[8px] text-emerald-400 tracking-widest">
                              VERIFIED
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {consignment.status === 'passed' && (
                <div className="text-center">
                  <p className="text-charcoal-400 font-serif-body mb-4">
                    商品通过鉴定，已评定成色等级。即将进入公开货架...
                  </p>
                  <button
                    onClick={() => listToShelf(consignment.id)}
                    className="btn-gold"
                  >
                    立即上架至公开货架
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </button>
                </div>
              )}

              {consignment.status === 'listed' && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-4">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 text-sm font-serif-body">
                      商品已成功上架至公开货架
                    </span>
                  </div>
                  <div>
                    <Link to="/" className="btn-primary">
                      前往公开货架查看
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

        {consignment.status === 'failed' && (
          <div className="card-luxury p-6 md:p-10 mb-8 text-center border-burgundy-700/30">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-burgundy-700/10 border-2 border-burgundy-700/40 mb-6">
              <XCircle className="w-10 h-10 text-burgundy-500" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-3xl font-bold text-burgundy-400 mb-4">
              很遗憾，鉴定未通过
            </h2>
            <p className="text-charcoal-400 font-serif-body text-lg max-w-lg mx-auto mb-8 leading-relaxed">
              经平台专业鉴定师多维度鉴定，该商品不符合正品标准。
              我们已将商品妥善保管，将按照您提供的地址原路退回。
            </p>
            <div className="p-5 rounded-sm bg-burgundy-700/5 border border-burgundy-700/20 max-w-xl mx-auto text-left mb-8">
              <p className="text-sm font-serif-body text-charcoal-300 leading-relaxed space-y-2">
                <span className="text-burgundy-400 font-semibold">退回说明：</span>
                <br />
                · 退回运费由平台承担，将使用顺丰到付方式寄回
                <br />
                · 预计 3-5 个工作日内寄出，请保持手机畅通
                <br />
                · 如对鉴定结果有异议，可在 7 天内申请复检
              </p>
            </div>
            <Link to="/consign" className="btn-primary">
              <ArrowLeft className="w-5 h-5 mr-2" />
              提交其他商品寄卖
            </Link>
          </div>
        )}

        <div className="card-luxury p-6 md:p-8">
          <h3 className="font-display text-xl font-bold text-charcoal-200 mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-champagne-500" />
            商品信息详情
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-sm bg-charcoal-900/40 border border-charcoal-800">
              <div className="text-xs tracking-wider text-champagne-600 uppercase mb-2">
                基本信息
              </div>
              <dl className="space-y-1.5 text-sm font-serif-body">
                <div className="flex justify-between">
                  <dt className="text-charcoal-500">品牌</dt>
                  <dd className="text-charcoal-200 font-semibold">{consignment.brand}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-charcoal-500">型号</dt>
                  <dd className="text-charcoal-200">{consignment.model}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-charcoal-500">年份</dt>
                  <dd className="text-charcoal-200">{consignment.year} 年</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-charcoal-500">原价</dt>
                  <dd className="text-champagne-300 font-semibold">
                    ¥{consignment.originalPrice.toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="p-4 rounded-sm bg-charcoal-900/40 border border-charcoal-800">
              <div className="text-xs tracking-wider text-champagne-600 uppercase mb-2">
                附件清单 ({consignment.accessories.length + consignment.customAccessories.length} 件)
              </div>
              {consignment.accessories.length > 0 || consignment.customAccessories.length > 0 ? (
                <ul className="text-sm font-serif-body text-charcoal-300 space-y-1">
                  {consignment.accessories.map((a) => (
                    <li key={a} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-champagne-500" strokeWidth={2.5} />
                      {ACCESSORY_OPTIONS.find((o) => o.value === a)?.label}
                    </li>
                  ))}
                  {consignment.customAccessories.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-champagne-500" strokeWidth={2.5} />
                      {c}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-charcoal-500 font-serif-body">未附带任何附件</p>
              )}
            </div>

            {consignment.flawPhotos.length > 0 && (
              <div className="p-4 rounded-sm bg-charcoal-900/40 border border-charcoal-800 md:col-span-2">
                <div className="text-xs tracking-wider text-champagne-600 uppercase mb-3">
                  瑕疵照片 ({consignment.flawPhotos.length} 张)
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {consignment.flawPhotos.map((photo, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-sm overflow-hidden gold-border"
                    >
                      <img src={photo} alt={`瑕疵 ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
