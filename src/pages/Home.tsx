import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, SlidersHorizontal, ArrowRight, Tag } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useAppStore } from '@/store/useAppStore';
import type { Brand, ConditionGrade } from '@/types';
import { BRANDS, CONDITION_GRADE_INFO } from '@/types';

export default function Home() {
  const { listedProducts, filterProducts } = useAppStore();
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<ConditionGrade[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredProducts = useMemo(
    () =>
      filterProducts({
        brands: selectedBrands.length > 0 ? selectedBrands : undefined,
        grades: selectedGrades.length > 0 ? selectedGrades : undefined,
        minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
        maxPrice: priceRange[1] < 200000 ? priceRange[1] : undefined,
        keyword: searchKeyword || undefined,
      }),
    [selectedBrands, selectedGrades, priceRange, searchKeyword, filterProducts]
  );

  const toggleBrand = (brand: Brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleGrade = (grade: ConditionGrade) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  return (
    <div className="page-transition">
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-champagne-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-burgundy-700/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gold-border bg-charcoal-900/50 mb-8" style={{ animation: 'fade-up 0.6s 0.1s ease-out both' }}>
              <Sparkles className="w-4 h-4 text-champagne-400" />
              <span className="text-sm text-champagne-300 tracking-wider font-serif-body">
                每件商品均通过中检认证鉴定师专业鉴定
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold text-charcoal-50 mb-6 leading-tight">
              甄选 <span className="shimmer-text">奢品</span>
              <br />
              传承 <span className="text-champagne-400 italic font-light">隽永</span> 价值
            </h1>

            <p className="text-lg md:text-xl text-charcoal-400 font-serif-body mb-10 max-w-2xl mx-auto leading-relaxed">
              专业鉴定 · 透明估价 · 安全寄售
              <br />
              连接每一件值得传承的奢侈品与懂得欣赏它的人
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/consign" className="btn-gold w-full sm:w-auto">
                <Tag className="w-5 h-5 mr-2" />
                立即寄卖我的奢品
              </Link>
              <a href="#products" className="btn-primary w-full sm:w-auto">
                浏览公开货架
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-charcoal-800/60">
              {[
                { num: '12,800+', label: '成功寄售' },
                { num: '100%', label: '正品保障' },
                { num: '48h', label: '极速鉴定' },
              ].map((stat, i) => (
                <div key={i} style={{ animation: `fade-up 0.6s ${0.3 + i * 0.1}s ease-out both` }}>
                  <div className="font-display text-3xl md:text-4xl font-bold shimmer-text mb-1">
                    {stat.num}
                  </div>
                  <div className="text-sm text-charcoal-500 tracking-wider font-serif-body">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="gold-divider container max-w-5xl" />

      <section id="products" className="py-16 md:py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs tracking-[0.3em] text-champagne-500 uppercase mb-3 font-medium">
                Curated Collection
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal-50">
                公开 <span className="text-champagne-400">货架</span>
              </h2>
              <p className="text-charcoal-400 font-serif-body text-lg mt-3">
                共 <span className="text-champagne-400 font-semibold">{listedProducts.length}</span> 件甄选奢品，均已通过专业鉴定
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="搜索品牌、款式..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="input-luxury pl-12"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="card-luxury p-6 md:p-8 mb-10">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal className="w-5 h-5 text-champagne-400" />
              <span className="font-display text-lg font-semibold text-champagne-300 tracking-wide">
                筛选条件
              </span>
              {(selectedBrands.length > 0 || selectedGrades.length > 0 || priceRange[0] > 0 || priceRange[1] < 200000 || searchKeyword) && (
                <button
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedGrades([]);
                    setPriceRange([0, 200000]);
                    setSearchKeyword('');
                  }}
                  className="ml-auto text-sm text-charcoal-400 hover:text-burgundy-400 font-serif-body transition-colors"
                >
                  清除所有
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-sm text-charcoal-400 mb-3 font-serif-body tracking-wide">
                  品牌
                </div>
                <div className="flex flex-wrap gap-2">
                  {BRANDS.map((brand) => {
                    const active = selectedBrands.includes(brand);
                    return (
                      <button
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className={`px-4 py-2 rounded-sm text-sm font-serif-body transition-all duration-300 ${
                          active
                            ? 'bg-champagne-500/20 text-champagne-300 gold-border shadow-gold'
                            : 'bg-charcoal-800/60 text-charcoal-400 border border-charcoal-700 hover:border-champagne-600/40 hover:text-champagne-500'
                        }`}
                      >
                        {brand}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-charcoal-400 mb-3 font-serif-body tracking-wide">
                    成色等级
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(CONDITION_GRADE_INFO) as ConditionGrade[]).map((grade) => {
                      const info = CONDITION_GRADE_INFO[grade];
                      const active = selectedGrades.includes(grade);
                      return (
                        <button
                          key={grade}
                          onClick={() => toggleGrade(grade)}
                          className={`px-4 py-2 rounded-sm text-sm font-serif-body transition-all duration-300 flex items-center gap-2 ${
                            active
                              ? 'shadow-gold'
                              : 'bg-charcoal-800/60 border border-charcoal-700 hover:border-champagne-600/40'
                          }`}
                          style={
                            active
                              ? {
                                  background: `linear-gradient(135deg, ${info.color}22, ${info.color}08)`,
                                  border: `1px solid ${info.color}88`,
                                  color: info.color,
                                }
                              : { color: info.color }
                          }
                        >
                          <span className="font-bold">{grade}</span>
                          <span className="text-xs opacity-80">·</span>
                          <span className="text-xs">{info.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-charcoal-400 mb-3 font-serif-body tracking-wide">
                    价格区间：¥{priceRange[0].toLocaleString()} - ¥{priceRange[1].toLocaleString()}
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Math.max(0, Number(e.target.value)), priceRange[1]])
                      }
                      className="input-luxury text-sm py-2.5"
                      placeholder="最低"
                    />
                    <span className="text-charcoal-600">—</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Math.max(priceRange[0], Number(e.target.value))])
                      }
                      className="input-luxury text-sm py-2.5"
                      placeholder="最高"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-charcoal-400 font-serif-body">
                  找到 <span className="text-champagne-400 font-semibold">{filteredProducts.length}</span> 件符合条件的商品
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          ) : (
            <div className="card-luxury py-20 text-center">
              <div className="text-6xl mb-6 opacity-30">🔍</div>
              <h3 className="font-display text-2xl font-semibold text-charcoal-300 mb-3">
                暂无匹配商品
              </h3>
              <p className="text-charcoal-500 font-serif-body mb-6">
                请尝试调整筛选条件，或
                <button
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedGrades([]);
                    setPriceRange([0, 200000]);
                    setSearchKeyword('');
                  }}
                  className="text-champagne-400 hover:text-champagne-300 mx-1 transition-colors"
                >
                  清除筛选
                </button>
                浏览全部商品
              </p>
              <Link to="/consign" className="btn-primary">
                <Tag className="w-4 h-4 mr-2" />
                我要寄卖
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
