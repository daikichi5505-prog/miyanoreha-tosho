import React from 'react';
import { BookOpen, Search, QrCode, Library, BookMarked, Compass, Bookmark, ShieldCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQrScanner: () => void;
  onOpenShelfMap: () => void;
  totalBooks: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenQrScanner,
  onOpenShelfMap,
  totalBooks
}) => {
  const tabs = [
    { id: 'journals', label: '新刊ジャーナル一覧', icon: BookOpen, tag: '配架中', tagColor: 'bg-[#2d4a3e] text-[#f4ecd8]' },
    { id: 'search', label: '蔵書・エビデンス検索', icon: Search },
    { id: 'purchased', label: '購入図書の連絡', icon: Sparkles, tag: '新着', tagColor: 'bg-[#8b4513] text-[#fdfaf5]' },
    { id: 'requests', label: '購入希望リクエスト', icon: BookMarked },
    { id: 'policy', label: '利用案内・図書係方針', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur border-b border-[#ded7c8] shadow-xs">
      {/* Top hospital & committee identification bar: Classic Library Wood & Leather theme */}
      <div className="bg-[#241a15] text-[#eee7da] px-3 sm:px-4 py-1.5 sm:py-2 text-xs border-b border-[#c8963e]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 font-medium min-w-0">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#c8963e]/20 text-[#f5cb74] font-mono text-[10px] sm:text-[11px] rounded-sm border border-[#c8963e]/40 shrink-0">
              <Bookmark className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#f5cb74]" />
              リハ室専用
            </span>
            <span className="tracking-wide text-[#f0e9dc] font-serif-jp text-[11px] sm:text-xs truncate">
              リハビリテーション科 教育委員会 図書係
            </span>
            <span className="hidden lg:inline text-[#c8963e]/50">|</span>
            <span className="hidden lg:inline font-serif-jp text-[#e6bf70]">「臨床の疑問を放置しない道具箱」</span>
          </div>

          <div className="flex items-center gap-2 text-[#d8cfbe] shrink-0">
            <span className="hidden md:inline text-xs">2026年度 「整える」係</span>
            <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-[#1d3527] px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] text-[#e0eedd] border border-[#3e684d]/60 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#52b788] animate-pulse"></span>
              <span>配架 {totalBooks} 冊/誌</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation and quick tool buttons */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0" onClick={() => setActiveTab('journals')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#3a251b] border border-[#c8963e]/50 text-[#f5cb74] flex items-center justify-center shadow-sm group-hover:bg-[#4a3124] transition-colors shrink-0">
              <Library className="w-4 h-4 sm:w-5 sm:h-5 text-[#f5cb74]" />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-lg font-bold text-[#2a1d15] tracking-tight flex items-center gap-1.5 font-serif-jp truncate">
                <span>リハ科 図書・文献ポータル</span>
                <span className="text-[10px] font-sans font-bold px-1.5 py-0.2 rounded-full bg-[#ebdcc2] text-[#53381a] border border-[#cca868]/50 hidden md:inline-block">
                  2026年度版
                </span>
              </div>
              <p className="text-[11px] text-[#6e5e50] font-medium hidden sm:block font-serif-jp truncate">
                リハビリ室蔵書管理 ＆ 臨床エビデンス検索
              </p>
            </div>
          </div>

          {/* Quick Action Tools: Clean & library styled */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              id="btn-nav-shelf-map"
              onClick={onOpenShelfMap}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#42291d] bg-[#f0e7d8] hover:bg-[#e7dcba] rounded-lg transition-colors border border-[#d8c8b0] shadow-2xs cursor-pointer font-serif-jp min-h-[36px]"
              title="本棚・配架マップ（準備中）"
            >
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8b5a2b] shrink-0" />
              <span className="hidden xs:inline">配架マップ</span>
              <span className="xs:hidden">配架図</span>
              <span className="text-[9px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.2 rounded bg-[#e8c872] text-[#4a2e05] border border-[#d4af37]/60">
                準備中
              </span>
            </button>

            <button
              id="btn-nav-qr-scan"
              onClick={onOpenQrScanner}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-[#fcfaf5] bg-[#223d2e] hover:bg-[#1a3124] border border-[#3e684d] rounded-lg shadow-xs transition-colors cursor-pointer font-serif-jp min-h-[36px]"
              title="本棚QR読取・照会"
            >
              <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e6bf70] shrink-0" />
              <span>QR読取</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation: Smooth horizontal scroll on mobile */}
        <div className="relative">
          <div className="flex overflow-x-auto no-scrollbar border-t border-[#ded7c8] -mb-px gap-1 scroll-smooth py-0.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer shrink-0 min-h-[42px] touch-manipulation ${
                    isActive
                      ? 'border-[#8b4513] text-[#3d2012] bg-[#f2ebd9] font-bold shadow-2xs'
                      : 'border-transparent text-[#6e5e50] hover:text-[#2d1c13] hover:border-[#b8a892]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-[#8b4513]' : 'text-[#9c8b78]'}`} />
                  <span className={isActive ? 'font-serif-jp' : ''}>{tab.label}</span>
                  {tab.tag && (
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold shrink-0 ${tab.tagColor || 'bg-[#2d4a3e] text-white'}`}>
                      {tab.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
