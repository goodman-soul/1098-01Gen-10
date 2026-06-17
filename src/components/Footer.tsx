import { ShieldCheck, Award, Truck, Headphones } from 'lucide-react';

export default function Footer() {
  const features = [
    {
      icon: ShieldCheck,
      title: '专业鉴定',
      desc: '中检认证鉴定师',
    },
    {
      icon: Award,
      title: '假一赔三',
      desc: '正品保障承诺',
    },
    {
      icon: Truck,
      title: '顺丰包邮',
      desc: '全程保价运输',
    },
    {
      icon: Headphones,
      title: '专属客服',
      desc: '7×24小时服务',
    },
  ];

  return (
    <footer className="mt-24 border-t border-charcoal-800/80">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-charcoal-800/60 flex items-center justify-center gold-border shrink-0">
                  <Icon className="w-5 h-5 text-champagne-400" />
                </div>
                <div>
                  <div className="font-display text-base font-semibold text-champagne-300">
                    {feature.title}
                  </div>
                  <div className="text-sm text-charcoal-500 font-serif-body">
                    {feature.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="gold-divider mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-champagne-400 via-champagne-500 to-champagne-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-charcoal-950" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-display text-xl font-bold tracking-widest shimmer-text">
                  VERITAS
                </div>
                <div className="text-[10px] tracking-[0.3em] text-champagne-600/70 uppercase">
                  Luxury Authentication
                </div>
              </div>
            </div>
            <p className="text-charcoal-400 font-serif-body text-base leading-relaxed max-w-md">
              专注于高端奢侈品的鉴定、估价与寄卖服务。我们以专业的鉴定团队和严谨的流程，
              为每一位客户提供值得信赖的交易体验。
            </p>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold text-champagne-300 mb-4 tracking-wide">
              快速链接
            </h4>
            <ul className="space-y-2.5 text-sm font-serif-body">
              {['关于我们', '鉴定流程', '寄卖协议', '费用说明', '帮助中心'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-charcoal-400 hover:text-champagne-400 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold text-champagne-300 mb-4 tracking-wide">
              联系我们
            </h4>
            <ul className="space-y-2.5 text-sm font-serif-body text-charcoal-400">
              <li>客服热线：400-888-0000</li>
              <li>服务时间：09:00 - 21:00</li>
              <li>邮箱：service@veritas.com</li>
              <li>地址：上海市静安区南京西路1788号</li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mt-10 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-charcoal-600 font-serif-body tracking-wider">
            © 2015-2026 VERITAS. All Rights Reserved. 沪ICP备15008888号
          </p>
          <div className="flex items-center gap-6 text-xs text-charcoal-600 font-serif-body">
            <a href="#" className="hover:text-champagne-500 transition-colors">
              隐私政策
            </a>
            <a href="#" className="hover:text-champagne-500 transition-colors">
              服务条款
            </a>
            <a href="#" className="hover:text-champagne-500 transition-colors">
              网站地图
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
