import React, { useState } from 'react';
import { Book } from '../types';
import { X, QrCode } from 'lucide-react';

interface QrCodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  onSelectBook: (book: Book) => void;
}

export const QrCodeScannerModal: React.FC<QrCodeScannerModalProps> = ({
  isOpen,
  onClose,
  books,
  onSelectBook
}) => {
  if (!isOpen) return null;

  const [inputCode, setInputCode] = useState('');
  const [matchedBook, setMatchedBook] = useState<Book | null>(null);
  const [isScanningActive, setIsScanningActive] = useState(false);

  const handleLookup = (code: string) => {
    const clean = code.trim().toLowerCase();
    const found = books.find(b => 
      b.qrCodeId.toLowerCase() === clean ||
      b.id.toLowerCase() === clean ||
      b.title.toLowerCase().includes(clean)
    );
    setMatchedBook(found || null);
  };

  const handleSimulateScan = (book: Book) => {
    setIsScanningActive(true);
    setTimeout(() => {
      setIsScanningActive(false);
      onClose();
      onSelectBook(book);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-[#140d08]/85 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#fcfbf7] rounded-2xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#c8963e]/40 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150 book-spine-gold">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#241a15] via-[#35251d] to-[#241a15] text-[#f7f2e8] p-3.5 sm:p-5 flex items-center justify-between border-b border-[#c8963e]/40 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#c8963e] text-[#241705] flex items-center justify-center font-bold shadow-xs shrink-0">
              <QrCode className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-[#fdfaf5] font-serif-jp leading-tight">
                全蔵書 QRコード照会・スキャナー
              </h3>
              <p className="text-[10px] sm:text-xs text-[#f5cb74] font-serif-jp mt-0.5">
                本に貼付されたQRステッカーを読み取り・即時検索
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#d8cfbe] hover:text-[#fdfaf5] p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center shrink-0"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-5 text-[#24170e] text-xs sm:text-sm overflow-y-auto">
          {/* Camera Frame Simulation */}
          <div className="relative bg-[#241a15] rounded-xl p-6 text-center text-[#f7f2e8] overflow-hidden border border-[#c8963e]/40 flex flex-col items-center justify-center min-h-[160px]">
            <div className="w-24 h-24 border-2 border-dashed border-[#d4af37] rounded-lg flex items-center justify-center relative mb-2">
              <QrCode className={`w-12 h-12 text-[#f5cb74] ${isScanningActive ? 'animate-pulse scale-110' : ''}`} />
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#d4af37] animate-bounce"></div>
            </div>
            <p className="text-xs text-[#ded0be] font-bold font-serif-jp">
              {isScanningActive ? 'スキャン解析中...' : 'スマホカメラを本のQRステッカーにかざしてください'}
            </p>
            <p className="text-[11px] text-[#f5cb74] mt-0.5 font-serif-jp">
              配架場所・要約・臨床エビデンスが1秒で表示されます
            </p>
          </div>

          {/* Direct Code Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#24170e] font-serif-jp">
              またはQRコードID / 書籍IDを直接入力:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value);
                  handleLookup(e.target.value);
                }}
                placeholder="例: QR-JN-2026-08-01 または BK-2026-001"
                className="flex-1 px-3 py-2.5 bg-[#faf8f2] border border-[#d8cfbe] rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-[#8b4513] text-[#2a1d15] placeholder:text-[#9e8f7e] min-h-[40px]"
              />
              <button
                onClick={() => handleLookup(inputCode)}
                className="px-4 py-2.5 bg-[#3a251b] text-[#f5cb74] rounded-lg text-xs font-bold hover:bg-[#4a3124] transition-colors cursor-pointer border border-[#c8963e]/40 font-serif-jp min-h-[40px] touch-manipulation"
              >
                照会
              </button>
            </div>
          </div>

          {/* Matched book if entered */}
          {matchedBook && (
            <div className="bg-[#edf5ef] border border-[#b8dabf] rounded-xl p-3.5 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold text-[#1c4728] font-serif-jp">
                  {matchedBook.shelfCode} ｜ {matchedBook.shelfLocationName}
                </div>
                <div className="text-xs font-bold text-[#24170e] line-clamp-1 font-serif-jp">
                  {matchedBook.title}
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onSelectBook(matchedBook);
                }}
                className="px-3.5 py-2 bg-[#1e3325] text-[#f7f2e8] text-xs font-bold rounded-lg hover:bg-[#284431] transition-colors shrink-0 cursor-pointer font-serif-jp border border-[#3e684d] min-h-[38px] touch-manipulation"
              >
                開く →
              </button>
            </div>
          )}

          {/* Sample quick test QR stickers */}
          <div className="space-y-2 pt-2 border-t border-[#ded7c8]">
            <span className="text-[11px] font-bold text-[#5c4938] uppercase tracking-wider block font-serif-jp">
              タップしてQR読み取りをテスト（実本サンプル）:
            </span>
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {books.slice(0, 4).map((b) => (
                <button
                  key={b.id}
                  onClick={() => handleSimulateScan(b)}
                  className="w-full text-left bg-[#faf8f2] hover:bg-[#fcf7ed] border border-[#ded7c8] hover:border-[#c8963e] rounded-lg p-2.5 transition-colors flex items-center justify-between text-xs cursor-pointer shadow-2xs font-serif-jp min-h-[44px] touch-manipulation"
                >
                  <div className="flex items-center gap-2 min-w-0 mr-2">
                    <QrCode className="w-4 h-4 text-[#8b4513] shrink-0" />
                    <div className="min-w-0">
                      <div className="font-bold text-[#24170e] truncate">
                        {b.title}
                      </div>
                      <div className="text-[10px] text-[#7d6c5c] font-mono">
                        {b.qrCodeId} ｜ {b.shelfCode}
                      </div>
                    </div>
                  </div>
                  <span className="text-[#8b4513] text-[11px] font-bold shrink-0">
                    体験 →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#f0eade] p-3 px-4 sm:px-6 border-t border-[#ded7c8] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-[#5c4938] hover:text-[#24170e] hover:bg-[#e6dece] rounded-lg transition-colors cursor-pointer font-serif-jp min-h-[40px] text-center touch-manipulation"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
