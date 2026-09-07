import React from 'react';
import { Library, QrCode, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenShelfMap: () => void;
  onOpenQrScanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenShelfMap, onOpenQrScanner }) => {
  return (
    <footer className="bg-[#1e140d] text-[#e0d6c5] border-t border-[#c8963e]/30 mt-12 book-spine-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-[#3d2a1c]">
          
          {/* Column 1: Library & Vision */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#c8963e] text-[#241705] flex items-center justify-center font-bold shadow-xs">
                <Library className="w-4 h-4" />
              </div>
              <div className="font-bold text-[#fdfaf5] text-base font-serif-jp">
                リハビリテーション科
              </div>
            </div>
            <div className="text-xs text-[#f5cb74] font-bold font-serif-jp">
              教育委員会 図書・文献情報ポータル
            </div>
            <p className="text-xs text-[#b8a994] leading-relaxed font-serif-jp">
              「臨床の疑問を放置しない道具箱」 ｜ 2026年度 教育委員会 「整える」係
            </p>
            <div className="text-xs text-[#e8f5e9] font-bold bg-[#1d3527] p-2.5 rounded-lg border border-[#3e684d]/60 inline-flex items-center gap-1.5 font-serif-jp">
              <Sparkles className="w-3.5 h-3.5 text-[#f5cb74]" />
              <span>古い本を整理し、最新エビデンスをみんなの手に</span>
            </div>
          </div>

          {/* Column 2: Key Features */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#e6bf70] font-serif-jp">
              図書インフラ機能
            </div>
            <ul className="space-y-2 text-xs text-[#b8a994]">
              <li className="flex items-center gap-2">
                <QrCode className="w-3.5 h-3.5 text-[#e6bf70]" />
                <span>全蔵書QRコード貼付・スマホ要約＆配架確認</span>
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#81c784]" />
                <span>年2回 定期棚卸し実施（毎年9月・3月）</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#e6bf70]" />
                <span>月次 新刊ジャーナル抄読連絡 ＆ 臨床エビデンス検索</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#e6bf70] font-serif-jp">
              クイックアクセス
            </div>
            <div className="flex flex-col space-y-2 text-xs">
              <button
                onClick={onOpenShelfMap}
                className="text-left text-[#b8a994] hover:text-[#f5cb74] transition-colors cursor-pointer"
              >
                ● リハビリ室 配架マップ【準備中】（Rack A〜D）
              </button>
              <button
                onClick={onOpenQrScanner}
                className="text-left text-[#b8a994] hover:text-[#f5cb74] transition-colors cursor-pointer"
              >
                ● QRコード照会・実本スキャナー
              </button>
              <span className="text-[#8f7e68] text-[11px]">
                ● お問い合わせ：リハビリ科 教育委員会 図書係（院内連絡または教育委員会MTG）
              </span>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9e8d78] text-center sm:text-left">
          <div>
            © 2026 リハビリテーション科教育委員会 図書係. All rights reserved. (院内スタッフ専用)
          </div>
          <div className="flex items-center gap-3 text-[#9e8d78] font-medium">
            <span>全蔵書QRコード対応・年2回定期棚卸し実施</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
