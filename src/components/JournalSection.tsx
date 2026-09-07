import React, { useState, useMemo } from 'react';
import { JournalIssue } from '../types';
import { BookOpen, MapPin, Calendar, Search, BookmarkCheck, ExternalLink, Archive } from 'lucide-react';

interface JournalSectionProps {
  journals: JournalIssue[];
  onOpenShelfMap: () => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({ journals, onOpenShelfMap }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<string>('current'); // 'current', 'all', '2026年8月', '2026年7月', etc.
  const [selectedPublisher, setSelectedPublisher] = useState<string>('all');
  const [selectedProfession, setSelectedProfession] = useState<string>('all');

  // Months available
  const availableMonths = useMemo(() => {
    const list: string[] = [];
    journals.forEach(j => {
      const m = j.month || '2026年8月';
      if (!list.includes(m)) list.push(m);
    });
    return list;
  }, [journals]);

  // Publishers available
  const availablePublishers = useMemo(() => {
    const pubs = new Set<string>();
    journals.forEach(j => {
      if (j.publisher) pubs.add(j.publisher);
    });
    return Array.from(pubs);
  }, [journals]);

  // Counts
  const currentMonthCount = journals.filter(j => j.isLatest).length;
  const pastMonthsCount = journals.filter(j => !j.isLatest).length;

  const filteredJournals = journals.filter(j => {
    // Month filter
    if (selectedMonth === 'current') {
      if (!j.isLatest) return false;
    } else if (selectedMonth !== 'all') {
      if (j.month !== selectedMonth) return false;
    }

    // Publisher filter
    if (selectedPublisher !== 'all') {
      if (j.publisher !== selectedPublisher) return false;
    }

    // Profession filter
    if (selectedProfession !== 'all') {
      if (!j.targetProfession || (!j.targetProfession.includes(selectedProfession as any) && !j.targetProfession.includes('全科'))) {
        return false;
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = j.journalName.toLowerCase().includes(q);
      const matchTheme = j.theme.toLowerCase().includes(q);
      const matchIssue = j.issue.toLowerCase().includes(q);
      const matchPub = (j.publisher || '').toLowerCase().includes(q);
      if (!matchName && !matchTheme && !matchIssue && !matchPub) {
        return false;
      }
    }

    return true;
  });

  return (
    <section className="space-y-6">
      {/* Header with Title and Bookish Library Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dcd4c3] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8b4513] uppercase tracking-wider mb-1 font-serif-jp">
            <BookOpen className="w-4 h-4 text-[#8b4513]" />
            <span>New Arrivals ＆ Serial Publications</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2a1d15] tracking-tight font-serif-jp">
            新刊ジャーナル一覧
          </h2>
          <p className="text-[#685848] text-xs sm:text-sm mt-1 font-serif-jp">
            リハビリ室に配架された新刊ジャーナル（①ジャーナルの名前、②巻と号、③ジャーナルのテーマ）を表示しています。
          </p>
        </div>

        <div className="bg-[#1e3325] border border-[#3e684d]/70 rounded-xl px-3.5 py-2 text-xs text-[#e4ede5] shrink-0 shadow-xs">
          <span className="font-bold flex items-center gap-1.5 text-[#f5cb74] font-serif-jp">
            <BookmarkCheck className="w-3.5 h-3.5 text-[#f5cb74]" />
            2026年度 購読誌アーカイブ
          </span>
          <span className="text-[11px] text-[#c0d6c3] block mt-0.5 font-mono">
            当月最新 {currentMonthCount}誌 ｜ 過去号保管 {pastMonthsCount}誌（全{journals.length}誌）
          </span>
        </div>
      </div>

      {/* Month Filter Tabs (当月【NEW】 vs バックナンバー保管): Classic Library Card Style */}
      <div className="bg-[#fcfbf7] border border-[#ded7c8] rounded-xl p-3.5 sm:p-4 shadow-xs space-y-3 book-spine-gold">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#e8e2d4] pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 scroll-smooth max-w-full">
            <span className="text-xs font-bold text-[#5c4938] flex items-center gap-1 mr-1 font-serif-jp shrink-0">
              <Calendar className="w-3.5 h-3.5 text-[#8b4513]" />
              <span className="hidden xs:inline">表示期間:</span>
            </span>

            <button
              onClick={() => setSelectedMonth('current')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-serif-jp shrink-0 min-h-[36px] ${
                selectedMonth === 'current'
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#c8963e] text-[#241705] shadow-xs ring-2 ring-[#c8963e]/40 border border-[#e8c872]'
                  : 'bg-[#f0eade] text-[#5c4938] hover:bg-[#e6dece]'
              }`}
            >
              <span className="px-1.5 py-0.2 rounded bg-[#241705] text-[#f5cb74] text-[10px] font-black">NEW</span>
              <span>当月最新号 (8月受入)</span>
              <span className="text-[10px] opacity-85 font-mono">({currentMonthCount})</span>
            </button>

            <button
              onClick={() => setSelectedMonth('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer font-serif-jp shrink-0 min-h-[36px] ${
                selectedMonth === 'all'
                  ? 'bg-[#1e3325] text-[#f7f2e8] shadow-xs border border-[#3e684d]'
                  : 'bg-[#f0eade] text-[#5c4938] hover:bg-[#e6dece]'
              }`}
            >
              <span>全期間 (4〜8月)</span>
              <span className="text-[10px] opacity-85 ml-1 font-mono">({journals.length})</span>
            </button>

            {/* Individual month buttons */}
            {availableMonths.filter(m => m !== '2026年8月').map(month => {
              const count = journals.filter(j => j.month === month).length;
              return (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer font-serif-jp shrink-0 min-h-[36px] ${
                    selectedMonth === month
                      ? 'bg-[#3a251b] text-[#f5cb74] font-bold shadow-xs border border-[#c8963e]/50'
                      : 'bg-[#f0eade] text-[#5c4938] hover:bg-[#e6dece]'
                  }`}
                >
                  <span>{month.replace('2026年', '')}保管</span>
                  <span className="text-[10px] opacity-85 ml-1 font-mono">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Quick status text */}
          <div className="text-[11px] text-[#7d6c5c] font-mono shrink-0 flex items-center justify-between sm:justify-end">
            <span>該当ジャーナル:</span>
            <strong className="text-[#2a1d15] ml-1">{filteredJournals.length}</strong> 誌
          </div>
        </div>

        {/* Search input + Publisher filter */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-0.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8b7a69] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="誌名・テーマ・キーワードで絞り込み..."
              className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-[#faf8f2] border border-[#d8cfbe] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8b4513]/30 focus:border-[#8b4513] transition-colors placeholder:text-[#9e8f7e] text-[#2a1d15] min-h-[42px]"
            />
          </div>

          {/* Publisher filter dropdown */}
          <select
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(e.target.value)}
            className="px-3 py-2.5 text-xs sm:text-sm bg-[#faf8f2] border border-[#d8cfbe] rounded-lg text-[#3d2e20] focus:outline-hidden focus:ring-2 focus:ring-[#8b4513]/30 cursor-pointer font-serif-jp min-h-[42px]"
          >
            <option value="all">すべての出版社・学会</option>
            {availablePublishers.map(pub => (
              <option key={pub} value={pub}>{pub}</option>
            ))}
          </select>

          {/* Profession filter */}
          <select
            value={selectedProfession}
            onChange={(e) => setSelectedProfession(e.target.value)}
            className="px-3 py-2.5 text-xs sm:text-sm bg-[#faf8f2] border border-[#d8cfbe] rounded-lg text-[#3d2e20] focus:outline-hidden focus:ring-2 focus:ring-[#8b4513]/30 cursor-pointer font-serif-jp min-h-[42px]"
          >
            <option value="all">すべての対象職種 (PT/OT/ST)</option>
            <option value="PT">PT（理学療法）関連</option>
            <option value="OT">OT（作業療法）関連</option>
            <option value="ST">ST（言語聴覚）関連</option>
          </select>
        </div>
      </div>

      {/* Journal List: Only 3 requested items displayed */}
      {filteredJournals.length === 0 ? (
        <div className="bg-[#fcfbf7] border border-[#ded7c8] rounded-2xl p-10 text-center space-y-3">
          <BookOpen className="w-8 h-8 text-[#9e8f7e] mx-auto" />
          <p className="text-sm text-[#6e5e50] font-serif-jp">条件に一致するジャーナルは見つかりませんでした。</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedMonth('all');
              setSelectedPublisher('all');
              setSelectedProfession('all');
            }}
            className="text-xs text-[#8b4513] underline font-bold cursor-pointer font-serif-jp"
          >
            検索条件をリセットする
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJournals.map((journal) => {
            return (
              <div
                key={journal.id}
                className="bg-[#fdfcf9] border border-[#dcd4c3] hover:border-[#c8963e] rounded-2xl shadow-xs overflow-hidden transition-all book-spine-gold"
              >
                {/* Journal Card Header: Dignified Library Style */}
                <div className="p-3.5 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4">
                  <div className="space-y-2.5 sm:space-y-3 flex-1 min-w-0">
                    {/* Badges: Status, Publisher, Shelf, Date */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {journal.isLatest ? (
                        <span className="px-2 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-black bg-[#e8c872] text-[#2c1b05] border border-[#d4af37] uppercase tracking-wider shadow-2xs">
                          【NEW】当月最新号
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#f0eade] text-[#5c4938] border border-[#d8cfbe] flex items-center gap-1 font-serif-jp">
                          <Archive className="w-3 h-3 text-[#8b7a69]" />
                          <span>{journal.month || '過去受入'} 保管</span>
                        </span>
                      )}

                      {journal.publisher && (
                        <span className="px-2 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-[#edf5ef] text-[#1c4728] border border-[#b8dabf] font-serif-jp">
                          {journal.publisher}
                        </span>
                      )}

                      <span className="text-[10px] sm:text-[11px] text-[#857462] font-mono">
                        配架: {journal.publishedDate}
                      </span>
                    </div>

                    {/* ONLY 3 ITEMS DISPLAY: ① ジャーナルの名前, ② 巻と号, ③ ジャーナルのテーマ */}
                    <div className="space-y-2 sm:space-y-2.5 pt-1 border-t border-[#e8e2d4]">
                      {/* ① ジャーナルの名前 */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-[#2e1d14] text-[#f5cb74] self-start sm:self-auto shrink-0 font-mono shadow-2xs border border-[#c8963e]/30">
                          ① ジャーナル名
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-[#24170e] font-serif-jp tracking-tight leading-snug">
                          {journal.journalName}
                        </h3>
                      </div>

                      {/* ② 巻と号 */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-[#4f3d32] text-[#f2ebe1] self-start sm:self-auto shrink-0 font-mono">
                          ② 巻と号
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-[#3b2d24] font-mono">
                          {journal.issue}
                        </p>
                      </div>

                      {/* ③ ジャーナルのテーマ */}
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2.5 pt-0.5">
                        <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-[#8b4513] text-[#fff9ed] self-start sm:self-auto shrink-0 font-mono sm:mt-0.5 shadow-2xs">
                          ③ テーマ
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-[#1a3824] font-serif-jp leading-relaxed">
                          {journal.theme}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Official Publisher Link & Shelf Location */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-nowrap md:flex-col items-stretch md:items-end gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#e8e2d4] w-full md:w-auto">
                    {journal.url && (
                      <a
                        href={journal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c8963e] hover:from-[#dfba44] hover:to-[#d4a249] text-[#241705] text-xs font-bold transition-all shadow-xs border border-[#d4af37] cursor-pointer font-serif-jp min-h-[40px] touch-manipulation"
                        title="出版社の公式ページ・目次詳細を別タブで開きます"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#241705] shrink-0" />
                        <span>公式・目次詳細URL</span>
                      </a>
                    )}

                    <button
                      onClick={onOpenShelfMap}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl bg-[#f0eade] hover:bg-[#e5ddcf] text-xs font-bold text-[#4a3a2d] border border-[#d8cfbe] transition-colors cursor-pointer font-serif-jp min-h-[40px] touch-manipulation"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#8b4513] shrink-0" />
                      <span>{journal.shelfLocation}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
