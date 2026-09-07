import React from 'react';
import { AnnouncementItem, Book, JournalIssue } from '../types';
import { Sparkles, BookOpen, MapPin, ArrowRight, History, ChevronRight, FileText, BookmarkCheck, Bookmark } from 'lucide-react';

interface LatestAnnouncementsBannerProps {
  announcements: AnnouncementItem[];
  books: Book[];
  journals: JournalIssue[];
  onSelectBook: (book: Book) => void;
  onGoToAnnouncementsArchive: () => void;
  onOpenShelfMap: () => void;
  onGoToJournals: () => void;
  onGoToNewBooks: () => void;
}

export const LatestAnnouncementsBanner: React.FC<LatestAnnouncementsBannerProps> = ({
  announcements,
  books,
  journals,
  onSelectBook,
  onGoToAnnouncementsArchive,
  onOpenShelfMap,
  onGoToJournals,
}) => {
  // Get latest announcements
  const latestAnnouncements = announcements.filter(a => a.isLatest).slice(0, 3);
  const latestJournal = journals.find(j => j.isLatest) || journals[0];
  const latestBook = books.find(b => b.isNewPurchase) || books[0];

  return (
    <section className="mb-8 space-y-4">
      {/* Prominent Header with Archive Jump Button: Classic Library Wood & Gold */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-[#241a15] via-[#35251d] to-[#1c2c20] text-[#f7f2e8] p-3.5 sm:p-5 rounded-2xl border border-[#c8963e]/40 shadow-md relative overflow-hidden book-spine-gold">
        <div className="flex items-center gap-3 relative z-10 min-w-0 pr-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c8963e] text-[#241705] flex items-center justify-center font-extrabold shadow-sm shrink-0 border border-[#d4af37]">
            <Sparkles className="w-5 h-5 text-[#241705]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black bg-[#e8c872] text-[#2c1b05] border border-[#d4af37] uppercase tracking-wider">
                2026年8月〜9月 最新着
              </span>
              <span className="text-xs text-[#f5cb74] font-medium hidden sm:inline font-serif-jp">
                リハ室 配架＆定期購読アップデート
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-bold text-[#fdfaf5] mt-0.5 font-serif-jp leading-tight">
              最新の新刊ジャーナル・購入図書アナウンス
            </h2>
          </div>
        </div>

        <button
          id="btn-jump-announcements-archive"
          onClick={onGoToAnnouncementsArchive}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c8963e] hover:from-[#dfba44] hover:to-[#d4a249] text-[#241705] font-black text-xs sm:text-sm shadow-sm transition-all shrink-0 cursor-pointer group relative z-10 font-serif-jp border border-[#d4af37] min-h-[44px] touch-manipulation"
        >
          <History className="w-4 h-4 text-[#241705] group-hover:-rotate-12 transition-transform shrink-0" />
          <span>これまでのアナウンス履歴・一覧を見る</span>
          <ArrowRight className="w-4 h-4 text-[#241705] shrink-0" />
        </button>
      </div>

      {/* 2-Column Spotlight: Latest Journal (Forest Green theme) vs Latest Purchased Book (Classic Wood theme) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Spotlight 1: Latest Journal */}
        {latestJournal && (
          <div className="bg-[#fdfcf9] border border-[#dcd4c3] hover:border-[#c8963e] rounded-2xl p-3.5 sm:p-5 shadow-xs transition-all flex flex-col justify-between book-spine-green relative">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#1e3325] text-[#e4ede5] border border-[#3e684d] shadow-2xs font-serif-jp">
                  <BookOpen className="w-3.5 h-3.5 text-[#f5cb74]" />
                  新刊ジャーナル最新号
                </span>
                <span className="text-xs font-mono text-[#5c4938] font-bold bg-[#f0eade] px-2 py-0.5 rounded border border-[#ded7c8]">
                  {latestJournal.publishedDate} 到着
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#24170e] hover:text-[#1c4728] transition-colors font-serif-jp">
                {latestJournal.journalName}
              </h3>
              <div className="text-xs text-[#2d6a3f] font-bold mt-0.5 mb-2.5 flex items-center gap-1.5 font-serif-jp">
                <Bookmark className="w-3.5 h-3.5 text-[#2d6a3f]" />
                <span>{latestJournal.issue}</span>
              </div>

              <div className="bg-[#faf8f2] rounded-lg p-2.5 text-xs text-[#3d2e20] font-medium mb-3 border border-[#ded7c8] font-serif-jp">
                <span className="font-bold text-[#24170e]">特集テーマ: </span>
                {latestJournal.theme}
              </div>

              {/* Key Article Highlight if available */}
              {latestJournal.keyArticles && latestJournal.keyArticles[0] && (
                <div className="bg-[#edf5ef] border border-[#b8dabf] rounded-xl p-3 text-xs mb-3 font-serif-jp">
                  <div className="flex items-center gap-1.5 font-bold text-[#1a3824] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
                    <span>注目論文 & 臨床への直結ポイント:</span>
                  </div>
                  <div className="font-semibold text-[#24170e] text-xs mb-1">
                    {latestJournal.keyArticles[0].title}
                  </div>
                  <p className="text-[#1c4728] text-xs leading-relaxed font-medium">
                    👉 {latestJournal.keyArticles[0].clinicalTakeaway}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#e8e2d4] flex flex-wrap items-center justify-between gap-2 text-xs font-serif-jp">
              <div
                onClick={onOpenShelfMap}
                className="flex items-center gap-1.5 text-[#5c4938] hover:text-[#2d6a3f] font-medium cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#8b4513]" />
                <span>配架: <strong className="text-[#24170e]">{latestJournal.shelfLocation}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                {latestJournal.url && (
                  <a
                    href={latestJournal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#241705] bg-gradient-to-r from-[#d4af37] to-[#c8963e] hover:from-[#dfba44] hover:to-[#d4a249] px-2.5 py-1 rounded-md transition-all text-[11px] border border-[#d4af37]"
                  >
                    <span>公式URL</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={onGoToJournals}
                  className="inline-flex items-center gap-1 font-bold text-[#1c4728] hover:text-[#112d19] cursor-pointer bg-[#edf5ef] hover:bg-[#dbeee0] px-2.5 py-1 rounded-md transition-colors border border-[#b8dabf]"
                >
                  <span>ジャーナル一覧へ</span>
                  <ChevronRight className="w-4 h-4 text-[#1c4728]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Spotlight 2: Latest Purchased Book */}
        {latestBook && (
          <div className="bg-[#fdfcf9] border border-[#dcd4c3] hover:border-[#c8963e] rounded-2xl p-3.5 sm:p-5 shadow-xs transition-all flex flex-col justify-between book-spine-gold relative">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#3a251b] text-[#f5cb74] border border-[#c8963e]/40 shadow-2xs font-serif-jp">
                  <Sparkles className="w-3.5 h-3.5 text-[#f5cb74]" />
                  最新購入図書 ({latestBook.purchaseMonth || '2026年8月'})
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#edf5ef] text-[#1c4728] border border-[#b8dabf] font-serif-jp">
                  <BookmarkCheck className="w-3 h-3 text-[#2d6a3f]" />
                  配架中（館内閲覧可）
                </span>
              </div>

              <h3
                onClick={() => onSelectBook(latestBook)}
                className="text-base sm:text-lg font-bold text-[#24170e] hover:text-[#8b4513] transition-colors cursor-pointer leading-snug font-serif-jp"
              >
                {latestBook.title}
              </h3>
              <div className="text-xs text-[#7d6c5c] mt-0.5 mb-2.5 font-serif-jp">
                {latestBook.authors} ｜ {latestBook.publisher} ({latestBook.publishedYear}年)
              </div>

              {/* Evidence & Purchase Purpose */}
              <div className="bg-[#fcf7ed] border border-[#e9dcbe] rounded-xl p-3 text-xs mb-3 font-serif-jp">
                <div className="flex items-center gap-1.5 font-bold text-[#4a2e05] mb-1">
                  <BookmarkCheck className="w-3.5 h-3.5 text-[#8b4513]" />
                  <span>最新エビデンス・購入の狙い:</span>
                </div>
                <p className="text-[#2d2217] text-xs leading-relaxed mb-1.5 font-medium">
                  {latestBook.evidenceHighlights}
                </p>
                {latestBook.clinicalQuestions && latestBook.clinicalQuestions[0] && (
                  <div className="text-[#2d2217] text-[11px] bg-white/90 p-1.5 rounded border border-[#e9dcbe]">
                    <span className="font-bold text-[#4a2e05]">解決できる疑問: </span>
                    {latestBook.clinicalQuestions[0]}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#e8e2d4] flex items-center justify-between text-xs font-serif-jp">
              <div
                onClick={onOpenShelfMap}
                className="flex items-center gap-1.5 text-[#5c4938] hover:text-[#8b4513] font-medium cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#8b4513]" />
                <span>配架: <strong className="text-[#24170e]">{latestBook.shelfLocationName}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectBook(latestBook)}
                  className="inline-flex items-center gap-1 font-bold text-[#8b4513] hover:text-[#5c2e0b] bg-[#f0eade] hover:bg-[#e5ddcf] px-2.5 py-1 rounded-md transition-colors cursor-pointer border border-[#ded7c8]"
                >
                  <span>詳細・目次・QR</span>
                  <ChevronRight className="w-4 h-4 text-[#8b4513]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Chronological Ticker / Recent Bulletins in chic library ledger style */}
      <div className="bg-[#fcfbf7] border border-[#ded7c8] rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs book-spine-gold">
        <div className="flex items-center gap-2 text-[#5c4938] shrink-0 font-serif-jp">
          <span className="font-bold flex items-center gap-1 text-[#24170e]">
            <FileText className="w-3.5 h-3.5 text-[#8b4513]" />
            直近のアナウンス速報:
          </span>
        </div>

        <div className="flex-1 flex flex-wrap items-center gap-2 font-serif-jp">
          {latestAnnouncements.map((item) => (
            <span
              key={item.id}
              onClick={onGoToAnnouncementsArchive}
              className="inline-flex items-center gap-1.5 bg-[#fdfcf9] border border-[#ded7c8] hover:border-[#c8963e] hover:bg-[#fcf7ed] px-2.5 py-1 rounded-md text-[#3d2e20] cursor-pointer transition-colors shadow-2xs"
            >
              <span className="font-mono text-[10px] text-[#857462] font-bold">{item.date.slice(5)}</span>
              <span className="font-medium truncate max-w-[200px] sm:max-w-xs">{item.title}</span>
            </span>
          ))}
        </div>

        <button
          onClick={onGoToAnnouncementsArchive}
          className="text-xs text-[#8b4513] font-bold hover:underline shrink-0 flex items-center gap-1 cursor-pointer font-serif-jp"
        >
          <span>すべて見る（アーカイブ）</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#8b4513]" />
        </button>
      </div>
    </section>
  );
};
