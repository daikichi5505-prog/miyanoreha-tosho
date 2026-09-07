import React, { useState, useMemo } from 'react';
import { AnnouncementItem, Book, JournalIssue, AnnouncementType, Profession } from '../types';
import { 
  Sparkles, 
  BookOpen, 
  MapPin, 
  Search, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  History, 
  Copy, 
  Check, 
  Info,
  Clock,
  Bookmark,
  ExternalLink
} from 'lucide-react';

interface AnnouncementsArchiveSectionProps {
  announcements: AnnouncementItem[];
  books: Book[];
  journals: JournalIssue[];
  onSelectBook: (book: Book) => void;
  onOpenShelfMap: () => void;
  onGoToJournals: () => void;
  onGoToNewBooks: () => void;
  onQuickToggleBorrow: (book: Book) => void;
}

export const AnnouncementsArchiveSection: React.FC<AnnouncementsArchiveSectionProps> = ({
  announcements,
  books,
  journals,
  onSelectBook,
  onOpenShelfMap,
  onGoToJournals,
  onGoToNewBooks,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedProfession, setSelectedProfession] = useState<string>('all');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Extract unique months for filter
  const availableMonths = useMemo(() => {
    const months = Array.from(new Set(announcements.map(a => a.month)));
    return months;
  }, [announcements]);

  // Filter announcements
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(item => {
      // Type filter
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }
      // Month filter
      if (selectedMonth !== 'all' && item.month !== selectedMonth) {
        return false;
      }
      // Profession filter
      if (selectedProfession !== 'all') {
        if (!item.targetProfession || (!item.targetProfession.includes(selectedProfession as any) && !item.targetProfession.includes('全科'))) {
          return false;
        }
      }
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inContent = item.content.toLowerCase().includes(q);
        const inKeyTakeaway = item.keyTakeaway ? item.keyTakeaway.toLowerCase().includes(q) : false;
        const inAuthor = item.authorOrSource ? item.authorOrSource.toLowerCase().includes(q) : false;
        const inTags = item.tags ? item.tags.some(t => t.toLowerCase().includes(q)) : false;

        if (!inTitle && !inContent && !inKeyTakeaway && !inAuthor && !inTags) {
          return false;
        }
      }
      return true;
    });
  }, [announcements, selectedType, selectedMonth, selectedProfession, searchQuery]);

  // Group filtered announcements by month
  const groupedByMonth = useMemo(() => {
    const groups: { [key: string]: AnnouncementItem[] } = {};
    filteredAnnouncements.forEach(item => {
      if (!groups[item.month]) {
        groups[item.month] = [];
      }
      groups[item.month].push(item);
    });
    return groups;
  }, [filteredAnnouncements]);

  // Quick stats
  const totalCount = announcements.length;
  const journalCount = announcements.filter(a => a.type === 'journal').length;
  const bookCount = announcements.filter(a => a.type === 'book').length;
  const requestCount = announcements.filter(a => a.type === 'request_fulfilled').length;

  const handleCopyMorningMeeting = () => {
    const latestItems = announcements.slice(0, 4);
    const textLines = [
      `【リハビリテーション科 図書係からのお知らせ】`,
      `▼ 最近の受入・新刊配架まとめ`,
      ...latestItems.map(item => `・[${item.date}] ${item.title} (${item.shelfLocation || 'リハ室'})`),
      ``,
      `※リハビリ室の蔵書ポータルにて要約・エビデンス詳細を確認できます。`
    ];
    navigator.clipboard.writeText(textLines.join('\n'));
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const getTypeBadge = (type: AnnouncementType) => {
    switch (type) {
      case 'journal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#edf5ef] text-[#1c4728] border border-[#b8dabf] font-serif-jp">
            <BookOpen className="w-3.5 h-3.5 text-[#2d6a3f]" />
            新刊ジャーナル
          </span>
        );
      case 'book':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#3a251b] text-[#f5cb74] border border-[#c8963e]/40 font-serif-jp">
            <Sparkles className="w-3.5 h-3.5 text-[#f5cb74]" />
            購入図書
          </span>
        );
      case 'request_fulfilled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#fcf7ed] text-[#4a2e05] border border-[#e8c872] font-serif-jp">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#8b4513]" />
            リクエスト配架完了
          </span>
        );
      case 'notice':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#f0eade] text-[#5c4938] border border-[#ded7c8] font-serif-jp">
            <Info className="w-3.5 h-3.5 text-[#857462]" />
            図書係方針・連絡
          </span>
        );
    }
  };

  return (
    <section className="space-y-6">
      {/* Section Top Header: Stately Library Chronicle Style */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dcd4c3] pb-5">
        <div>
          <div className="flex items-center gap-2 text-[#8b4513] text-xs font-bold tracking-wider uppercase mb-1 font-serif-jp">
            <History className="w-4 h-4 text-[#8b4513]" />
            <span>Announcements Archive & Series Chronicle</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2a1d15] tracking-tight font-serif-jp">
            新着アナウンス一覧・受入図書録
          </h2>
          <p className="text-[#685848] text-xs sm:text-sm mt-1 max-w-3xl font-serif-jp">
            2026年度に教育委員会・図書係から発信された新刊ジャーナル、購入図書、リクエスト配架完了、図書係連絡の全履歴を一連で閲覧できます。
          </p>
        </div>

        {/* Action Button: Copy Summary for Morning Staff Briefing */}
        <button
          onClick={handleCopyMorningMeeting}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c8963e] hover:from-[#dfba44] hover:to-[#d4a249] text-[#241705] text-xs font-bold shadow-xs transition-all shrink-0 cursor-pointer border border-[#d4af37] font-serif-jp min-h-[42px] touch-manipulation"
        >
          {copiedNotification ? (
            <>
              <Check className="w-4 h-4 text-[#241705]" />
              <span>コピー完了（朝礼・連絡用）</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#241705]" />
              <span>朝礼・連絡用まとめをコピー</span>
            </>
          )}
        </button>
      </div>

      {/* KPI Stats Strip: Classic Library Wood & Leather Palette */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Dark Mahogany */}
        <div className="bg-[#241a15] text-[#f7f2e8] border border-[#c8963e]/40 rounded-xl p-3.5 shadow-xs book-spine-gold">
          <div className="text-xs text-[#d8cfbe] font-medium font-serif-jp">総アナウンス件数</div>
          <div className="text-xl sm:text-2xl font-bold font-serif-jp text-[#fdfaf5] mt-0.5 font-mono">{totalCount} <span className="text-xs font-normal text-[#d8cfbe]">件</span></div>
        </div>

        {/* Forest Green */}
        <div className="bg-[#1e3325] text-[#f7f2e8] border border-[#3e684d] rounded-xl p-3.5 shadow-xs book-spine-gold">
          <div className="text-xs text-[#c0d6c3] font-medium flex items-center gap-1 font-serif-jp">
            <BookOpen className="w-3.5 h-3.5 text-[#f5cb74]" />
            新刊ジャーナル
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif-jp text-[#fdfaf5] mt-0.5 font-mono">{journalCount} <span className="text-xs font-normal text-[#c0d6c3]">号</span></div>
        </div>

        {/* Antique Gold/Leather */}
        <div className="bg-[#3a251b] text-[#f7f2e8] border border-[#c8963e]/50 rounded-xl p-3.5 shadow-xs book-spine-gold">
          <div className="text-xs text-[#f5cb74] font-medium flex items-center gap-1 font-serif-jp">
            <Sparkles className="w-3.5 h-3.5 text-[#f5cb74]" />
            購入図書・新着配架
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif-jp text-[#f5cb74] mt-0.5 font-mono">{bookCount} <span className="text-xs font-normal text-[#f5cb74]">冊</span></div>
        </div>

        {/* Deep Wood */}
        <div className="bg-[#2d1e14] text-[#f7f2e8] border border-[#8b4513]/50 rounded-xl p-3.5 shadow-xs book-spine-gold">
          <div className="text-xs text-[#e0cfbe] font-medium flex items-center gap-1 font-serif-jp">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#f5cb74]" />
            リクエスト配架完了
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif-jp text-[#fdfaf5] mt-0.5 font-mono">{requestCount} <span className="text-xs font-normal text-[#e0cfbe]">件</span></div>
        </div>
      </div>

      {/* Filter and Search Bar: Library Card Index Style */}
      <div className="bg-[#fcfbf7] border border-[#ded7c8] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4 book-spine-gold">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b7a69]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="アナウンス内容、書籍名、ジャーナル名、疾患・手技キーワード（例：脳卒中、TUG、膝OA、エコー）で検索..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#faf8f2] border border-[#d8cfbe] focus:border-[#8b4513] focus:ring-1 focus:ring-[#8b4513] rounded-xl text-xs sm:text-sm outline-hidden text-[#2a1d15] placeholder:text-[#9e8f7e]"
          />
        </div>

        {/* Filter controls row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#e8e2d4] text-xs">
          {/* Type Filter Buttons */}
          <div className="flex items-center gap-1.5 font-serif-jp overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
            <span className="text-[#5c4938] font-bold mr-1 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#8b4513]" />
              <span className="hidden xs:inline">種別:</span>
            </span>
            {[
              { id: 'all', label: 'すべて' },
              { id: 'journal', label: '新刊ジャーナル' },
              { id: 'book', label: '購入図書' },
              { id: 'request_fulfilled', label: 'リクエスト配架' },
              { id: 'notice', label: '図書係連絡' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-colors cursor-pointer shrink-0 min-h-[34px] touch-manipulation ${
                  selectedType === type.id
                    ? 'bg-[#3a251b] text-[#f5cb74] shadow-xs border border-[#c8963e]/50'
                    : 'bg-[#f0eade] text-[#5c4938] hover:bg-[#e6dece] border border-[#ded7c8]'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 font-serif-jp">
            {/* Month Filter Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#5c4938] font-bold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#8b4513]" />
                <span className="hidden xs:inline">発信月:</span>
              </span>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-[#faf8f2] border border-[#d8cfbe] text-[#3d2e20] text-xs rounded-lg px-2.5 py-1.5 font-semibold outline-hidden focus:border-[#8b4513] cursor-pointer min-h-[34px]"
              >
                <option value="all">全期間 (2026年度)</option>
                {availableMonths.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            {/* Profession Tag Filter */}
            <div className="flex items-center gap-1">
              <span className="text-[#5c4938] font-bold text-[11px]">職種:</span>
              {['all', 'PT', 'OT', 'ST'].map(prof => (
                <button
                  key={prof}
                  onClick={() => setSelectedProfession(prof)}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer min-h-[32px] touch-manipulation ${
                    selectedProfession === prof
                      ? 'bg-[#3a251b] text-[#f5cb74] border border-[#c8963e]/40'
                      : 'bg-[#f0eade] text-[#5c4938] hover:bg-[#e6dece] border border-[#ded7c8]'
                  }`}
                >
                  {prof === 'all' ? '全対象' : prof}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Timeline Series */}
      {Object.keys(groupedByMonth).length === 0 ? (
        <div className="bg-[#fcfbf7] border border-[#ded7c8] rounded-2xl p-12 text-center text-[#7d6c5c] font-serif-jp">
          <Info className="w-8 h-8 text-[#9e8f7e] mx-auto mb-2" />
          <p className="font-bold text-[#2a1d15] text-sm">該当するアナウンスが見つかりませんでした</p>
          <p className="text-xs mt-1">検索条件や絞り込みフィルターを変更してお試しください。</p>
        </div>
      ) : (
        <div className="space-y-8">
          {(Object.entries(groupedByMonth) as [string, AnnouncementItem[]][]).map(([month, items]) => (
            <div key={month} className="space-y-4">
              {/* Month Section Sticky Header */}
              <div className="sticky top-28 z-20 flex items-center gap-3 bg-[#f5efe4]/95 backdrop-blur py-2">
                <div className="px-3.5 py-1 rounded-md bg-[#241a15] text-[#f5cb74] font-bold text-xs flex items-center gap-1.5 shadow-xs border border-[#c8963e]/40">
                  <Calendar className="w-3.5 h-3.5 text-[#f5cb74]" />
                  <span className="font-serif-jp">{month} の受入・発信録</span>
                </div>
                <div className="h-px flex-1 bg-[#dcd4c3]" />
                <span className="text-xs text-[#5c4938] font-mono font-bold bg-[#fcfbf7] px-2 py-0.5 rounded border border-[#ded7c8]">{items.length} 件</span>
              </div>

              {/* Items List in this month */}
              <div className="space-y-4 pl-2 sm:pl-4 border-l-2 border-[#c8963e]/40 ml-3 sm:ml-4">
                {items.map((item) => {
                  const matchingBook = item.relatedBookId 
                    ? books.find(b => b.id === item.relatedBookId)
                    : null;
                  const matchingJournal = item.relatedJournalId
                    ? journals.find(j => j.id === item.relatedJournalId)
                    : null;

                  return (
                    <div
                      key={item.id}
                      className="relative bg-[#fdfcf9] border border-[#dcd4c3] hover:border-[#c8963e] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all -ml-[17px] sm:-ml-[25px] book-spine-gold"
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-[#8b4513] border-4 border-[#fcfbf7] shadow-xs" />

                      {/* Card Content Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                          {getTypeBadge(item.type)}
                          <span className="text-xs font-mono font-bold text-[#5c4938] bg-[#f0eade] px-2 py-0.5 rounded border border-[#ded7c8]">
                            {item.date}
                          </span>
                          {item.isLatest && (
                            <span className="px-2 py-0.2 rounded text-[10px] font-black bg-[#e8c872] text-[#2c1b05] border border-[#d4af37] uppercase tracking-wider">
                              NEW
                            </span>
                          )}
                        </div>

                        {item.targetProfession && (
                          <div className="flex items-center gap-1 font-serif-jp">
                            {item.targetProfession.map(p => (
                              <span key={p} className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#f0eade] text-[#5c4938] border border-[#ded7c8]">
                                {p}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Announcement Title */}
                      <h3 className="text-base sm:text-lg font-bold text-[#24170e] mb-1.5 leading-snug font-serif-jp">
                        {item.title}
                      </h3>

                      {/* Source/Author */}
                      {item.authorOrSource && (
                        <div className="text-xs text-[#7d6c5c] mb-3 font-serif-jp">
                          発信元・著者: <span className="font-medium text-[#3b2d24]">{item.authorOrSource}</span>
                        </div>
                      )}

                      {/* Highlight Box (Clinical Takeaway or Key Purpose) */}
                      <div className="bg-[#edf5ef] border border-[#b8dabf] rounded-xl p-3 text-xs mb-3 font-serif-jp">
                        <div className="font-bold text-[#1a3824] flex items-center gap-1.5 mb-1">
                          <Bookmark className="w-3.5 h-3.5 text-[#2d6a3f]" />
                          <span>臨床へのポイント・活用法:</span>
                        </div>
                        <p className="text-[#1c4728] leading-relaxed font-medium">
                          {item.highlight || item.summary}
                        </p>
                      </div>

                      {/* Shelf & Action Links */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e8e2d4] text-xs">
                        {item.shelfLocation && (
                          <div
                            onClick={onOpenShelfMap}
                            className="flex items-center gap-1.5 text-[#4a392b] bg-[#f5efe4] px-3 py-1.5 rounded-lg border border-[#ded7c8] hover:border-[#c8963e] cursor-pointer transition-colors font-serif-jp"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#8b4513]" />
                            <span className="font-bold text-[#2a1d15]">{item.shelfLocation}</span>
                            <span className="text-[10px] text-[#8b4513] underline font-bold">配架図【準備中】</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 font-serif-jp ml-auto">
                          {matchingBook && (
                            <button
                              onClick={() => onSelectBook(matchingBook)}
                              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#c8963e] hover:from-[#dfba44] hover:to-[#d4a249] text-[#241705] font-bold text-xs shadow-2xs border border-[#d4af37] transition-colors cursor-pointer"
                            >
                              図書カルテ・要約を見る
                            </button>
                          )}

                          {matchingJournal && (
                            <button
                              onClick={onGoToJournals}
                              className="px-3 py-1.5 rounded-lg bg-[#1e3325] hover:bg-[#284431] text-[#f7f2e8] font-bold text-xs shadow-2xs border border-[#3e684d] transition-colors cursor-pointer"
                            >
                              新刊ジャーナル一覧で確認
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
