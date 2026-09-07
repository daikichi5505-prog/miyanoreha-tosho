import React from 'react';
import { Sparkles, QrCode, RefreshCw, Smartphone, BookCheck, ArrowRight, ShieldCheck, BookOpen, Search } from 'lucide-react';

interface VisionHeroProps {
  onGoToJournals: () => void;
  onGoToSearch: () => void;
  onGoToPurchasedBooks: () => void;
}

export const VisionHero: React.FC<VisionHeroProps> = ({
  onGoToJournals,
  onGoToSearch,
  onGoToPurchasedBooks
}) => {
  return (
    <section className="bg-gradient-to-br from-[#1e130c] via-[#2c1b12] to-[#16241b] text-[#f7f2e8] rounded-2xl p-4 sm:p-7 md:p-8 mb-5 sm:mb-6 shadow-md border border-[#c8963e]/40 relative overflow-hidden book-spine-gold">
      {/* Subtle library aesthetic warm glow (like a library reading desk lamp) */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-16 w-80 h-80 bg-[#3a5a40]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative antique gold book corner frame */}
      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-l-2 border-[#d4af37]/50 pointer-events-none rounded-tl" />
      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-r-2 border-[#d4af37]/50 pointer-events-none rounded-tr" />
      <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-l-2 border-[#d4af37]/50 pointer-events-none rounded-bl" />
      <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-r-2 border-[#d4af37]/50 pointer-events-none rounded-br" />

      <div className="relative z-10 max-w-5xl">
        {/* Top Tagline */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-bold bg-[#c8963e]/20 text-[#f5cb74] border border-[#c8963e]/40">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f5cb74]" />
            2026年度 教育委員会 「整える」係 方針
          </span>
          <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-[#1d3324] text-[#d6ecd7] border border-[#3e684d]/60">
            <QrCode className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#e6bf70]" />
            全蔵書QR貼付済
          </span>
          <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-[#2a1d2f] text-[#edd5f5] border border-[#6b477b]/50">
            <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#e6bf70]" />
            リハ室常時閲覧可
          </span>
        </div>

        {/* Core Main Slogan */}
        <div className="text-[#e2b85d] text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest mb-1 flex items-center gap-2 font-serif-jp">
          <span>CLINICAL EVIDENCE LIBRARY & JOURNAL PORTAL</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#fdfaf5] mb-4 sm:mb-5 leading-snug font-serif-jp">
          「整える」図書インフラ
          <span className="text-[#d4af37] font-normal mx-1.5 sm:mx-2.5">｜</span>
          <span className="text-[#e8e6e0] block sm:inline mt-1 sm:mt-0">臨床の疑問を放置しない道具箱</span>
        </h1>

        {/* 3 Core Pillars: Classic Library Cloth & Leather Binding */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 mb-4 sm:mb-5 text-xs sm:text-sm">
          {/* Card 1: Warm Leather Brown with 【準備中】 */}
          <div className="bg-[#2c1d14]/90 border border-[#8c5e38]/50 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3 shadow-xs">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#533725]/50 text-[#f5cb74] flex items-center justify-center shrink-0 mt-0.5 border border-[#8c5e38]/60">
              <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f5cb74]" />
            </div>
            <div>
              <div className="font-bold text-[#fcf9f2] mb-0.5 font-serif-jp flex items-center gap-1.5 flex-wrap">
                <span className="text-xs sm:text-sm">スマホで即時検索・配架確認</span>
                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#e8c872] text-[#3d2005] border border-[#d4af37]">
                  【準備中】
                </span>
              </div>
              <p className="text-[#ded0be] text-[11px] sm:text-xs leading-relaxed">
                ベッドサイドやリハ室から棚の位置・要約・目次を10秒でチェック。
              </p>
            </div>
          </div>

          {/* Card 2: Deep Reading Forest Green */}
          <div className="bg-[#14261b]/90 border border-[#3e684d]/50 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3 shadow-xs">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1f3a29]/60 text-[#c8e6c9] flex items-center justify-center shrink-0 mt-0.5 border border-[#3e684d]/60">
              <BookCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#b7e4c7]" />
            </div>
            <div>
              <div className="font-bold text-[#fcf9f2] mb-0.5 font-serif-jp text-xs sm:text-sm">最新エビデンスへ刷新</div>
              <p className="text-[#c7dacb] text-[11px] sm:text-xs leading-relaxed">
                陳腐化した書籍を整理し、最新ガイドライン・RCT・実践書を順次導入。
              </p>
            </div>
          </div>

          {/* Card 3: Deep Burgundy / Antique Amber */}
          <div className="bg-[#2d171a]/90 border border-[#853e49]/50 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3 shadow-xs">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#4a2228]/60 text-[#f7c5cc] flex items-center justify-center shrink-0 mt-0.5 border border-[#853e49]/60">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f7c5cc]" />
            </div>
            <div>
              <div className="font-bold text-[#fcf9f2] mb-0.5 font-serif-jp text-xs sm:text-sm">現場の声から購入決定</div>
              <p className="text-[#e2cbd0] text-[11px] sm:text-xs leading-relaxed">
                臨床での困りごとを「購入希望リクエスト」で投稿。科内で優先購入。
              </p>
            </div>
          </div>
        </div>

        {/* Clear & Simplified Actions: Mobile Optimized Touch Targets */}
        <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
          <button
            id="btn-hero-journals"
            onClick={onGoToJournals}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-2.5 rounded-xl sm:rounded-lg bg-gradient-to-r from-[#d4af37] to-[#c8963e] hover:from-[#e0bd48] hover:to-[#d4a249] text-[#261606] font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer font-serif-jp border border-[#e8c872] min-h-[46px] touch-manipulation"
          >
            <BookOpen className="w-4 h-4 text-[#261606] shrink-0" />
            <span>新刊ジャーナル一覧を見る</span>
            <ArrowRight className="w-4 h-4 text-[#261606] shrink-0" />
          </button>

          <button
            id="btn-hero-search"
            onClick={onGoToSearch}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-2.5 rounded-xl sm:rounded-lg bg-[#203a29] hover:bg-[#182e20] text-[#f7f3ea] border border-[#3e684d] font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer font-serif-jp min-h-[46px] touch-manipulation"
          >
            <Search className="w-4 h-4 text-[#e6bf70] shrink-0" />
            <span>蔵書・エビデンスを検索</span>
          </button>

          <button
            id="btn-hero-purchased"
            onClick={onGoToPurchasedBooks}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-2.5 rounded-xl sm:rounded-lg bg-[#3a2214] hover:bg-[#4a2f1d] text-[#fdf6e6] border border-[#c8963e]/70 font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer font-serif-jp group min-h-[46px] touch-manipulation"
          >
            <Sparkles className="w-4 h-4 text-[#e6bf70] group-hover:rotate-12 transition-transform shrink-0" />
            <span>【購入図書の連絡】</span>
          </button>
        </div>
      </div>
    </section>
  );
};
