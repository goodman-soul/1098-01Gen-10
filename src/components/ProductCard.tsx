import { Link } from 'react-router-dom';
import { ShieldCheck, Award } from 'lucide-react';
import type { ListedProduct } from '@/types';
import { CONDITION_GRADE_INFO } from '@/types';

interface ProductCardProps {
  product: ListedProduct;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const gradeInfo = CONDITION_GRADE_INFO[product.conditionGrade];

  return (
    <Link
      to={`/product/${product.id}`}
      className="card-luxury group relative overflow-hidden"
      style={{
        animation: `fade-up 0.7s ease-out ${index * 0.08}s both`,
      }}
    >
      <div className="relative aspect-square overflow-hidden gold-border">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal-950/60 z-10 pointer-events-none" />
        <img
          src={product.mainImage}
          alt={`${product.brand} ${product.model}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-champagne-500/30 animate-pulse-gold" />
            <div className="relative flex items-center gap-1.5 px-3 py-1.5 bg-charcoal-950/90 backdrop-blur-sm rounded-full gold-border">
              <ShieldCheck className="w-3.5 h-3.5 text-champagne-400" strokeWidth={2.5} />
              <span className="text-[10px] font-medium tracking-wider text-champagne-300 uppercase">
                鉴定通过
              </span>
            </div>
          </div>
        </div>
        <div className="absolute top-3 right-3 z-20">
          <div
            className="flex items-center gap-1 px-3 py-1.5 backdrop-blur-sm rounded-full"
            style={{
              background: `linear-gradient(135deg, ${gradeInfo.color}22 0%, ${gradeInfo.color}08 100%)`,
              border: `1px solid ${gradeInfo.color}55`,
            }}
          >
            <Award className="w-3.5 h-3.5" style={{ color: gradeInfo.color }} />
            <span
              className="text-[11px] font-bold tracking-widest"
              style={{ color: gradeInfo.color }}
            >
              {product.conditionGrade} · {gradeInfo.label}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="text-[11px] tracking-[0.25em] uppercase text-champagne-600 mb-1.5 font-medium">
              {product.brand}
            </div>
            <h3 className="font-display text-xl font-semibold text-charcoal-100 truncate group-hover:text-champagne-300 transition-colors duration-300">
              {product.model}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] text-charcoal-500 tracking-wider mb-1">
              {product.year}年产
            </div>
            <div className="font-display text-2xl font-bold shimmer-text">
              ¥{product.price.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="gold-divider my-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-charcoal-400 font-serif-body">
            <span className="text-champagne-600/80">鉴定编号</span>
            <span className="tracking-wider">{product.appraisalReportId}</span>
          </div>
          <div className="flex items-center gap-1.5 text-champagne-400 text-sm font-serif-body group-hover:gap-2.5 transition-all duration-300">
            <span>查看详情</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
