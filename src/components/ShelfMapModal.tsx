import React, { useState } from 'react';
import { SHELF_LAYOUT } from '../data/mockData';
import { Book } from '../types';
import { X, MapPin, Layers, BookOpen, Sparkles, CheckCircle2, Bookmark } from 'lucide-react';

interface ShelfMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  onSelectBook: (book: Book) => void;
}

export const ShelfMapModal: React.FC<ShelfMapModalProps> = ({
  isOpen,
  onClose,
  books,
  onSelectBook
}) => {
  if (!isOpen) return null;

  const [selectedRackCode, setSelectedRackCode] = useState<string>('Rack-A');

  const selectedRack = SHELF_LAYOUT.find(r => r.code === selectedRackCode) || SHELF_LAYOUT[0];
  const rackBooks = books.filter(b => b.shelfCode.startsWith(selectedRackCode));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-[#0b1626]/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#fcfdfa] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-amber-500/40 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150 book-spine-blue">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#241a15] via-[#35251d] to-[#241a15] text-[#f7f2e8] p-3.5 sm:p-5 flex items-center justify-between shrink-0 border-b border-[#c8963e]/40">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37] text-[#241705] flex items-center justify-center font-bold shadow-xs shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-[#fcfaf5] font-serif-jp flex items-center gap-2 flex-wrap leading-tight">
                <span>リハビリ室 蔵書配架マップ</span>
                <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded bg-[#e8c872] text-[#3d2005] shadow-2xs border border-[#d4af37]">
                  【準備中】
                </span>
              </h3>
              <p className="text-[10px] sm:text-xs text-[#f5cb74] font-serif-jp mt-0.5">
                リハ室 本棚（Rack A〜D）および雑誌ラックの配置・段別分類
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center shrink-0"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 text-slate-800 text-xs sm:text-sm">
          {/* Preparation Notice */}
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 sm:p-3.5 flex items-center gap-2.5 text-xs text-amber-950">
            <span className="font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950 shrink-0 text-[10px]">
              準備中
            </span>
            <span>現在、2026年度リハビリ室の本棚レイアウト・段別配架コードの最終点検と準備を進めております（順次反映予定）。</span>
          </div>
          {/* Visual Floor Layout Simulation */}
          <div>
            <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center justify-between font-serif-jp">
              <span>リハビリ室 本棚レイアウト図（タップで棚を選択）</span>
              <span className="text-[11px] text-[#1e3a5f] font-bold">リハ室入口・スタッフルーム側</span>
            </div>

            <div className="bg-stone-100 border-2 border-stone-300 rounded-2xl p-4 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {SHELF_LAYOUT.map((rack) => {
                  const isSelected = selectedRackCode === rack.code;
                  return (
                    <button
                      key={rack.code}
                      onClick={() => setSelectedRackCode(rack.code)}
                      className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between h-32 ${
                        isSelected
                          ? 'bg-white border-[#1e3a5f] shadow-md ring-2 ring-amber-400'
                          : 'bg-white/80 border-stone-300 hover:border-amber-400 hover:bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-[#1e3a5f] text-white' : 'bg-stone-200 text-stone-800'
                          }`}>
                            {rack.code}
                          </span>
                        </div>
                        <div className="font-bold text-xs text-slate-900 leading-tight font-serif-jp">
                          {rack.name.split('：')[1] || rack.name}
                        </div>
                      </div>

                      <div className="text-[11px] text-stone-500 border-t border-stone-200 pt-1 font-medium">
                        3段構成 ｜ {rack.levels.length} カテゴリ
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-stone-600 font-semibold">
                <span>← プラットフォーム・平行棒エリア</span>
                <span>｜</span>
                <span>リハ受付・カルテ端末側 →</span>
              </div>
            </div>
          </div>

          {/* Selected Rack Shelf Breakdown */}
          <div className="bg-stone-100/70 border border-stone-300 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-300 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#1e3a5f] uppercase">
                  Selected Rack Details
                </span>
                <h4 className="text-base font-bold text-slate-900 font-serif-jp">
                  {selectedRack.name}
                </h4>
              </div>

              <div className="text-xs text-stone-600">
                この棚の登録図書: <strong className="text-slate-900 font-bold">{rackBooks.length}</strong> 冊
              </div>
            </div>

            {/* Level by level info */}
            <div className="space-y-3">
              {selectedRack.levels.map((lvl, index) => {
                const levelCode = `${selectedRack.code}${index + 1}`;
                const levelBooks = books.filter(b => b.shelfCode.includes(`${selectedRack.code.replace('Rack-', '')}${index + 1}`) || b.shelfLocationName.includes(lvl.level));

                return (
                  <div key={index} className="bg-white border border-stone-300 rounded-xl p-3.5 shadow-2xs">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-950 font-bold text-xs border border-amber-300">
                          {lvl.level}
                        </span>
                        <span className="font-bold text-slate-900 text-xs sm:text-sm font-serif-jp">
                          {lvl.description}
                        </span>
                      </div>
                    </div>

                    {/* Books on this shelf level */}
                    {levelBooks.length > 0 ? (
                      <div className="mt-2 pt-2 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {levelBooks.map((b) => (
                          <div
                            key={b.id}
                            onClick={() => {
                              onClose();
                              onSelectBook(b);
                            }}
                            className="bg-stone-50 hover:bg-amber-50/50 border border-stone-200 hover:border-amber-400 rounded-lg p-2.5 cursor-pointer transition-colors flex items-start justify-between gap-2"
                          >
                            <div>
                              <div className="font-bold text-slate-900 text-xs line-clamp-1 font-serif-jp">
                                {b.title}
                              </div>
                              <div className="text-[10px] text-stone-500">
                                {b.authors} ｜ QR: {b.qrCodeId}
                              </div>
                            </div>

                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 bg-emerald-100 text-emerald-900 border border-emerald-300">
                              配架中
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[11px] text-stone-500 mt-1 font-medium">
                        ※最新エビデンス本へ順次刷新中
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 p-3 px-6 border-t border-stone-300 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-stone-700 hover:text-slate-900 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

