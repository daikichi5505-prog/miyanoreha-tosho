import React, { useState } from 'react';
import { Book } from '../types';
import { X, MapPin, QrCode, ExternalLink, Bookmark, Sparkles, Check, Copy, HelpCircle, FileText } from 'lucide-react';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  onOpenShelfMap: () => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onOpenShelfMap,
}) => {
  const [copied, setCopied] = useState(false);

  if (!book) return null;

  const handleCopyQr = () => {
    navigator.clipboard.writeText(`https://rehab-library.local/qr/${book.qrCodeId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-[#140d08]/85 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#fcfbf7] rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#c8963e]/40 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150 book-spine-gold">
        
        {/* Modal Header: Stately Library Wood & Gold */}
        <div className="bg-gradient-to-r from-[#241a15] via-[#35251d] to-[#241a15] text-[#f7f2e8] p-3.5 sm:p-5 flex items-start justify-between gap-3 shrink-0 border-b border-[#c8963e]/40">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded bg-[#d4af37] text-[#241705] shadow-2xs font-serif-jp">
                {book.category}
              </span>
              <span className="text-[11px] sm:text-xs text-[#f5cb74] font-mono">
                管理台帳番号: {book.id}
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-bold text-[#fdfaf5] leading-snug font-serif-jp">
              {book.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#d8cfbe] hover:text-[#fdfaf5] p-2 rounded-lg hover:bg-white/10 transition-colors shrink-0 cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Parchment Library Card */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 text-[#24170e] text-xs sm:text-sm">
          {/* Status & Shelf location bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#f5efe4] border border-[#e2d8c7] rounded-xl p-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold bg-[#edf5ef] text-[#1c4728] border border-[#b8dabf] font-serif-jp">
                <Bookmark className="w-3.5 h-3.5 text-[#2d6a3f]" />
                リハビリ室配架中（館内閲覧可）
              </span>
            </div>

            {/* Shelf Location Link */}
            <div
              onClick={() => {
                onClose();
                onOpenShelfMap();
              }}
              className="flex items-center justify-between sm:justify-start gap-1.5 text-xs text-[#4a392b] bg-[#fdfcf9] px-3 py-2 rounded-lg border border-[#ded7c8] hover:border-[#c8963e] cursor-pointer transition-colors shadow-2xs font-serif-jp min-h-[38px] touch-manipulation"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#8b4513] shrink-0" />
                <span className="font-bold text-[#2a1d15]">{book.shelfCode}</span>
                <span className="text-[#5c4938] text-[11px] sm:text-xs">{book.shelfLocationName}</span>
              </div>
              <span className="text-[10px] text-[#8b4513] underline font-bold ml-1 shrink-0">配架図</span>
            </div>
          </div>

          {/* Book Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#faf8f2] p-3.5 rounded-xl border border-[#ded7c8] text-xs font-serif-jp">
            <div>
              <span className="text-stone-500 block text-[11px]">著者・編者</span>
              <span className="font-bold text-[#24170e]">{book.authors}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[11px]">出版社</span>
              <span className="font-bold text-[#24170e]">{book.publisher}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[11px]">出版年</span>
              <span className="font-bold text-[#24170e] font-mono">{book.publishedYear}年</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[11px]">ISBN</span>
              <span className="font-bold text-[#24170e] font-mono">{book.isbn}</span>
            </div>
          </div>

          {/* Publisher Official Website / Table of Contents Link */}
          {book.publisherUrl && (
            <div className="bg-[#fcf7ed] border border-[#e8c872]/80 rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#c8963e] text-[#241705] flex items-center justify-center shrink-0 shadow-2xs">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#3d2005] font-serif-jp">
                    出版社 公式書籍情報 ＆ 目次詳細
                  </div>
                  <div className="text-[11px] text-[#6b4716] truncate font-serif-jp">
                    章ごとの詳細目次・立ち読み・購入元情報をご覧いただけます
                  </div>
                </div>
              </div>

              <a
                href={book.publisherUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#d4af37] to-[#c8963e] hover:from-[#dfba44] hover:to-[#d4a249] text-[#241705] text-xs font-black rounded-lg transition-all shrink-0 shadow-xs border border-[#d4af37] cursor-pointer font-serif-jp"
              >
                <span>公式目次を開く</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Clinical Questions Solved */}
          {book.clinicalQuestions && book.clinicalQuestions.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#4a2e05] flex items-center gap-1.5 font-serif-jp">
                <HelpCircle className="w-4 h-4 text-[#8b4513]" />
                解決できる臨床の疑問 (Clinical Questions):
              </span>
              <div className="bg-[#fcf7ed] border border-[#e9dcbe] rounded-xl p-3.5 space-y-1.5">
                {book.clinicalQuestions.map((cq, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-serif-jp">
                    <span className="text-[#8b4513] font-bold shrink-0">Q{i + 1}.</span>
                    <span className="text-[#2d2217] font-medium leading-relaxed">{cq}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Evidence Highlights */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[#1a3824] flex items-center gap-1.5 font-serif-jp">
              <Sparkles className="w-4 h-4 text-[#2d6a3f]" />
              臨床エビデンス・要点ハイライト:
            </span>
            <div className="bg-[#edf5ef] border border-[#b8dabf] rounded-xl p-3.5 text-xs text-[#1c4728] leading-relaxed font-serif-jp">
              {book.evidenceHighlights}
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-stone-500 font-serif-jp">全体概要:</span>
            <p className="text-xs text-[#4a3a2d] leading-relaxed bg-[#faf8f2] p-3 rounded-lg border border-[#ded7c8] font-serif-jp">
              {book.summary}
            </p>
          </div>

          {/* QR Code Identification Card */}
          <div className="bg-[#241a15] text-[#f7f2e8] p-3.5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[#c8963e]/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0">
                <QrCode className="w-full h-full text-[#24170e]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#f5cb74] font-serif-jp">
                  リハ室 背表紙QRコード貼付済
                </div>
                <div className="text-[11px] text-[#d8cfbe] font-mono">
                  ID: {book.qrCodeId}
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyQr}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-[#f5cb74] border border-white/20 transition-colors shrink-0 cursor-pointer font-serif-jp min-h-[38px] touch-manipulation"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#81c784]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'URLコピー完了' : 'QR用URLコピー'}</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#f0eade] p-3 px-4 sm:px-6 border-t border-[#ded7c8] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold bg-[#3a251b] hover:bg-[#4a3124] text-[#f5cb74] rounded-lg transition-colors cursor-pointer shadow-xs border border-[#c8963e]/40 font-serif-jp min-h-[42px] touch-manipulation"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
