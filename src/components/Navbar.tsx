import { NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Tag, ShieldCheck, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/', label: '公开货架', icon: ShoppingBag },
    { to: '/consign', label: '我要寄卖', icon: Tag },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-charcoal-800/80 backdrop-blur-xl bg-charcoal-950/70">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-sm bg-gradient-to-br from-champagne-400 via-champagne-500 to-champagne-700 flex items-center justify-center shadow-gold">
              <ShieldCheck className="w-6 h-6 text-charcoal-950" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-widest shimmer-text">
                VERITAS
              </span>
              <span className="text-[10px] tracking-[0.3em] text-champagne-600/80 uppercase mt-0.5">
                Est. 2015 · Luxury Authentication
              </span>
            </div>
          </NavLink>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`relative flex items-center gap-2 px-6 py-3 rounded-sm font-serif-body text-lg tracking-wide transition-all duration-300 group ${
                    isActive
                      ? 'text-champagne-400'
                      : 'text-charcoal-300 hover:text-champagne-300'
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 transition-transform duration-300 ${
                    isActive ? 'text-champagne-400' : 'text-champagne-600 group-hover:scale-110'
                  }`} />
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-champagne-400 to-transparent" />
                  )}
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-3 px-5 py-2.5 gold-border rounded-sm text-charcoal-400 hover:text-champagne-300 hover:border-champagne-500/50 transition-all duration-300 font-serif-body text-base">
              <Search className="w-4 h-4" />
              <span className="tracking-wide">搜索品牌 / 款式</span>
            </button>
            <div className="hidden md:flex items-center gap-2 w-11 h-11 rounded-full gold-border bg-charcoal-900/50 hover:bg-charcoal-800/50 transition-colors cursor-pointer">
              <div className="w-full flex items-center justify-center">
                <span className="font-display text-lg text-champagne-400">V</span>
              </div>
            </div>
            <button
              className="md:hidden p-2 text-champagne-400"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-charcoal-800 bg-charcoal-950/95 backdrop-blur-xl">
          <div className="container py-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-sm font-serif-body text-lg ${
                    isActive
                      ? 'bg-champagne-500/10 text-champagne-300 gold-border'
                      : 'text-charcoal-300 hover:bg-charcoal-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
