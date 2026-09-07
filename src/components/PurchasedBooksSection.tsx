import React from 'react';
import { Book } from '../types';
import { Sparkles, MapPin, BookOpen, HelpCircle, ArrowRight, Bookmark } from 'lucide-react';

interface PurchasedBooksSectionProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onQuickToggleBorrow?: (book: Book) => void;
  onOpenShelfMap: () => void;
  onOpenNewRequest: () => void;
}

export const PurchasedBooksSection: React.FC<PurchasedBooksSectionProps> = ({
  books,
  onSelectBook,
  onOpenShelfMap,
  onOpenNewRequest
}) => {
  // Filter new books purchased in 2026 or marked as new
  const newBooks = books.filter(b => b.isNewPurchase);

  return (
    <section className="space-y-6">
      {/* Section Header: Stately Library Style */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[#dcd4c3] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#8b4513] text-xs font-bold tracking-wider uppercase mb-1 font-serif-jp">
            <Sparkles className="w-4 h-4 text-[#8b4513]" />
            <span>2026 New Acquisitions & Clinical Recommendations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2a1d15] tracking-tight font-serif-jp">
            購入図書の連絡 ｜ 2026年度 新着・推薦蔵書
          </h2>
          <p className="text-[#685848] text-xs sm:text-sm mt-1 font-serif-jp">
            教育委員会「整える」係が現場の臨床課題・リクエストに基づき厳選購入した最新実践図書です。
          </p>
        </div>

        <button
          onClick={onOpenNewRequest}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c8963e] hover:from-[#dfba44] hover:to-[#d4a249] text-[#241705] text-xs font-black shadow-xs transition-all shrink-0 cursor-pointer border border-[#d4af37] font-serif-jp"
        >
          <span className="text-[#241705] font-black">＋</span>
          <span>欲しい本をリクエストする</span>
        </button>
      </div>

      {/* Intro policy alert: Library Quality Standard */}
      <div className="bg-[#fcfbf7] border border-[#ded7c8] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 book-spine-gold shadow-2xs">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#c8963e] text-[#241705] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-[#2a1d15] font-serif-jp">
              古い書籍を順次整理し、最新エビデンス本へ刷新しています
            </div>
            <p className="text-xs text-[#6e5e50] mt-1 leading-relaxed font-serif-jp">
              リハビリテーション科では、ガイドライン改訂や最新RCT知見を反映した実践書を優先配架。全蔵書に貼付されたQRコードから、スマホでいつでも要約と臨床疑問の解決例を確認できます。
            </p>
          </div>
        </div>
      </div>

      {/* New Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newBooks.map((book) => {
          return (
            <div
              key={book.id}
              className="bg-[#fdfcf9] border border-[#dcd4c3] hover:border-[#c8963e] rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between book-spine-gold"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded text-[11px] sm:text-xs font-black bg-[#e8c872] text-[#2c1b05] border border-[#d4af37] font-serif-jp shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#2c1b05]" />
                    {book.purchaseMonth || '2026年 配架'}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded bg-[#edf5ef] text-[#1c4728] border border-[#b8dabf] font-serif-jp">
                    <Bookmark className="w-3 h-3 text-[#2d6a3f]" />
                    配架中（館内閲覧可）
                  </span>
                </div>

                {/* Title */}
                <h3
                  onClick={() => onSelectBook(book)}
                  className="text-base sm:text-lg font-bold text-[#24170e] hover:text-[#8b4513] transition-colors cursor-pointer mb-2 leading-snug font-serif-jp"
                >
                  {book.title}
                </h3>

                <div className="text-xs text-[#7d6c5c] mb-3 flex flex-wrap items-center gap-1.5 sm:gap-2 font-serif-jp">
                  <span className="font-medium text-[#3b2d24]">{book.authors}</span>
                  <span>/</span>
                  <span>{book.publisher}</span>
                  <span>({book.publishedYear}年)</span>
                </div>

                {/* Target Audience / Recommendation */}
                {book.recommendedFor && (
                  <div className="bg-[#f0eade] rounded-lg px-3 py-1.5 text-xs text-[#5c4938] mb-3 flex items-center gap-2 border border-[#ded7c8] font-serif-jp">
                    <span className="font-bold text-[#2a1d15] shrink-0">推薦対象:</span>
                    <span className="text-[#3d2e20]">{book.recommendedFor}</span>
                  </div>
                )}

                {/* Shelf Location Bar */}
                <div
                  onClick={onOpenShelfMap}
                  className="bg-[#f5efe4] border border-[#e2d8c7] hover:border-[#c8963e] rounded-lg px-3 py-2 text-xs flex items-center justify-between text-[#4a392b] mb-3 cursor-pointer hover:bg-[#ede3d1] transition-colors font-serif-jp min-h-[38px]"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#8b4513] shrink-0" />
                    <span className="font-bold text-[#2a1d15]">{book.shelfCode}</span>
                    <span className="text-[#5c4938] text-[11px] sm:text-xs">{book.shelfLocationName}</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#8b4513] underline shrink-0 ml-1">配架図【準備中】</span>
                </div>

                {/* Evidence Highlight */}
                <div className="bg-[#edf5ef] border border-[#b8dabf] rounded-xl p-3 text-xs mb-3 font-serif-jp">
                  <div className="font-bold text-[#1a3824] flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#2d6a3f]" />
                    <span>最新エビデンス・購入の狙い:</span>
                  </div>
                  <p className="text-[#1c4728] font-medium leading-relaxed text-xs">
                    {book.evidenceHighlights}
                  </p>
                </div>

                {/* Clinical questions */}
                {book.clinicalQuestions && (
                  <div className="space-y-1.5 mb-4 text-xs bg-[#fcf7ed] border border-[#e9dcbe] rounded-xl p-3 font-serif-jp">
                    <div className="font-bold text-[#4a2e05] flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-[#8b4513]" />
                      <span>現場の「困った」解決ポイント:</span>
                    </div>
                    <ul className="space-y-1 pl-4 text-[#2d2217] list-disc text-xs">
                      {book.clinicalQuestions.map((q, idx) => (
                        <li key={idx} className="leading-relaxed font-medium">
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action bar - Simple, single clear action to view detail */}
              <div className="pt-3 border-t border-[#e8e2d4] flex items-center justify-between gap-3 text-xs font-serif-jp">
                <button
                  onClick={() => onSelectBook(book)}
                  className="w-full inline-flex items-center justify-between py-2 px-3.5 rounded-lg bg-[#f0eade] hover:bg-[#e5ddcf] text-[#8b4513] font-bold transition-colors cursor-pointer border border-[#ded7c8] min-h-[42px] touch-manipulation"
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#8b4513] shrink-0" />
                    <span>目次・QRコード・臨床エビデンス詳細</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
