import React, { useState, useMemo } from 'react';
import { Book, BookCategory } from '../types';
import { Search, Filter, MapPin, Sparkles, QrCode, ArrowUpDown, ChevronRight, HelpCircle, Bookmark, BookOpen } from 'lucide-react';

interface BookSearchSectionProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onOpenQrScanner: () => void;
  onOpenShelfMap: () => void;
  onOpenNewRequest: () => void;
}

const CATEGORIES: BookCategory[] = [
  'すべて',
  '運動器疾患',
  '脳血管・神経系',
  '心肺・内部障害',
  '作業療法・高次脳',
  '言語聴覚・嚥下',
  '評価法・統計・研究',
  'ガイドライン・エビデンス'
];

export const BookSearchSection: React.FC<BookSearchSectionProps> = ({
  books,
  onSelectBook,
  onOpenQrScanner,
  onOpenShelfMap,
  onOpenNewRequest
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>('すべて');
  const [onlyNew, setOnlyNew] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'title' | 'shelf'>('newest');

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Category filter
        if (selectedCategory !== 'すべて' && book.category !== selectedCategory) {
          return false;
        }
        // New filter
        if (onlyNew && !book.isNewPurchase) {
          return false;
        }
        // Query search
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        const inTitle = book.title.toLowerCase().includes(q);
        const inAuthors = book.authors.toLowerCase().includes(q);
        const inPublisher = book.publisher.toLowerCase().includes(q);
        const inShelf = book.shelfLocationName.toLowerCase().includes(q) || book.shelfCode.toLowerCase().includes(q);
        const inSummary = book.summary.toLowerCase().includes(q);
        const inTags = book.tags.some(t => t.toLowerCase().includes(q));
        const inQuestions = book.clinicalQuestions.some(cq => cq.toLowerCase().includes(q));
        const inEvidence = book.evidenceHighlights.toLowerCase().includes(q);

        return inTitle || inAuthors || inPublisher || inShelf || inSummary || inTags || inQuestions || inEvidence;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return b.publishedYear - a.publishedYear;
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title, 'ja');
        }
        if (sortBy === 'shelf') {
          return a.shelfCode.localeCompare(b.shelfCode);
        }
        return 0;
      });
  }, [books, selectedCategory, onlyNew, searchQuery, sortBy]);

  const quickQuestions = [
    '大腿骨頚部骨折 術後',
    '脳卒中 片麻痺 上肢機能',
    '誤嚥性肺炎 摂食嚥下',
    '心不全 心臓リハビリ',
    'サルコペニア 栄養',
    'FIM 評価'
  ];

  return (
    <section className="space-y-6">
      {/* Section Header: Dignified Library Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dcd4c3] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8b4513] uppercase tracking-wider mb-1 font-serif-jp">
            <BookOpen className="w-4 h-4 text-[#8b4513]" />
            <span>Search Catalog ＆ Clinical Evidence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2a1d15] tracking-tight font-serif-jp">
            蔵書 ＆ 臨床エビデンス検索
          </h2>
          <p className="text-[#685848] text-xs sm:text-sm mt-1 font-serif-jp">
            疾患名・症状・知りたい疑問から、リハビリ室の本棚の位置と要約を素早く探せます。
          </p>
        </div>

        {/* Action Button: Purchase request link */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNewRequest}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c8963e] hover:from-[#dfba44] hover:to-[#d4a249] text-[#241705] text-xs font-bold transition-all shadow-xs border border-[#d4af37] cursor-pointer font-serif-jp"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#241705]" />
            <span>欲しい本を購入リクエスト</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls: Library Card Box */}
      <div className="bg-[#fcfbf7] border border-[#ded7c8] rounded-xl p-3.5 sm:p-5 shadow-xs space-y-3.5 sm:space-y-4 book-spine-gold">
        {/* Main Search Input */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#8b7a69] absolute left-3 sm:left-3.5 pointer-events-none shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="疾患名、著者、キーワード、臨床の疑問で検索..."
            className="w-full pl-9 sm:pl-11 pr-24 sm:pr-28 py-2.5 sm:py-3 bg-[#faf8f2] border border-[#d8cfbe] rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#8b4513]/30 focus:border-[#8b4513] transition-colors placeholder:text-[#9e8f7e] text-[#2a1d15] min-h-[44px]"
          />
          <div className="absolute right-2 flex items-center gap-1">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[11px] text-[#8b7a69] hover:text-[#2a1d15] px-1.5 py-1 cursor-pointer font-serif-jp"
              >
                消去
              </button>
            )}
            <button
              onClick={onOpenQrScanner}
              title="スマホカメラでQRコード読み取り"
              className="px-2 sm:px-2.5 py-1.5 bg-gradient-to-r from-[#d4af37] to-[#c8963e] hover:from-[#dfba44] hover:to-[#d4a249] text-[#241705] text-[11px] sm:text-xs font-black rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-2xs border border-[#d4af37] font-serif-jp min-h-[32px]"
            >
              <QrCode className="w-3.5 h-3.5 shrink-0" />
              <span>QR読取</span>
            </button>
          </div>
        </div>

        {/* Quick query tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs text-[#5c4938]">
          <span className="font-bold text-[#5c4938] flex items-center gap-1 font-serif-jp shrink-0">
            <HelpCircle className="w-3.5 h-3.5 text-[#8b4513]" />
            <span className="hidden xs:inline">よく調べる:</span>
          </span>
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => setSearchQuery(q)}
              className="px-2.5 py-1 rounded-full bg-[#f0eade] hover:bg-[#e8c872]/40 hover:text-[#2a1d15] border border-[#d8cfbe] text-[#5c4938] transition-colors text-[11px] font-medium cursor-pointer font-serif-jp shrink-0 min-h-[30px]"
            >
              #{q}
            </button>
          ))}
        </div>

        {/* Category Pills Filter */}
        <div className="pt-2 border-t border-[#e8e2d4]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#2a1d15] flex items-center gap-1.5 font-serif-jp">
              <Filter className="w-3.5 h-3.5 text-[#8b4513]" />
              専門領域カテゴリー
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`filter-cat-${cat}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer font-serif-jp shrink-0 min-h-[36px] ${
                    isSelected
                      ? 'bg-[#3a251b] text-[#f5cb74] shadow-xs border border-[#c8963e]/50'
                      : 'bg-[#f0eade] text-[#5c4938] hover:bg-[#e6dece] border border-[#ded7c8]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-Filters & Sort Controls */}
        <div className="pt-2 border-t border-[#e8e2d4] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer select-none text-[#3d2e20] font-medium font-serif-jp min-h-[32px]">
              <input
                type="checkbox"
                checked={onlyNew}
                onChange={(e) => setOnlyNew(e.target.checked)}
                className="w-4 h-4 rounded text-[#8b4513] focus:ring-[#8b4513] border-[#d8cfbe]"
              />
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
                2026年 新着・受入図書のみ
              </span>
            </label>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 text-[#5c4938]">
            <div className="flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8b7a69]" />
              <span className="text-[#8b7a69] font-medium font-serif-jp text-[11px]">並び替え:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 bg-[#faf8f2] border border-[#d8cfbe] rounded-lg text-xs text-[#3d2e20] focus:outline-hidden focus:ring-1 focus:ring-[#8b4513] cursor-pointer font-serif-jp min-h-[34px]"
            >
              <option value="newest">出版年が新しい順</option>
              <option value="title">タイトル順 (五十音)</option>
              <option value="shelf">本棚・配架位置順</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result Count and Quick Stats */}
      <div className="flex items-center justify-between text-xs text-[#7d6c5c] px-1 font-serif-jp">
        <div>
          該当蔵書: <strong className="text-[#2a1d15] font-mono text-sm">{filteredBooks.length}</strong> 冊
          {selectedCategory !== 'すべて' && (
            <span className="ml-1 text-[#8b4513]">（{selectedCategory}）</span>
          )}
        </div>
        {onlyNew && (
          <span className="bg-[#ebdcc2] text-[#53381a] px-2 py-0.5 rounded font-bold border border-[#cca868]/50">
            2026年 受入図書に限定中
          </span>
        )}
      </div>

      {/* Book Grid Cards: Library Style Binding */}
      {filteredBooks.length === 0 ? (
        <div className="bg-[#fcfbf7] border border-[#ded7c8] rounded-2xl p-12 text-center space-y-4">
          <BookOpen className="w-10 h-10 text-[#a89988] mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#2a1d15] font-serif-jp">条件に一致する蔵書が見つかりませんでした</h3>
            <p className="text-xs text-[#7d6c5c] font-serif-jp">
              検索ワードを変えるか、カテゴリーを「すべて」に変更してお試しください。
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('すべて');
              setOnlyNew(false);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#f0eade] hover:bg-[#e5ddcf] text-xs font-bold text-[#3d2e20] rounded-lg border border-[#d8cfbe] transition-colors cursor-pointer font-serif-jp"
          >
            検索条件をリセット
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBooks.map((book) => {
            return (
              <div
                key={book.id}
                className="bg-[#fdfcf9] border border-[#dcd4c3] hover:border-[#c8963e] rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group book-spine-gold"
              >
                {/* Card Top / Body */}
                <div className="p-4 sm:p-5 flex-1">
                  {/* Category & Status Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#f0eade] text-[#5c4938] border border-[#d8cfbe] font-serif-jp">
                      {book.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {book.isNewPurchase && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded bg-[#e8c872] text-[#2c1b05] border border-[#d4af37] shadow-2xs">
                          <Sparkles className="w-2.5 h-2.5 text-[#2c1b05]" />
                          新刊
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#edf5ef] text-[#1c4728] border border-[#b8dabf] font-serif-jp">
                        <Bookmark className="w-3 h-3 text-[#2d6a3f]" />
                        配架中（館内閲覧可）
                      </span>
                    </div>
                  </div>

                  {/* Title & Author */}
                  <h3
                    onClick={() => onSelectBook(book)}
                    className="text-base font-bold text-[#24170e] group-hover:text-[#8b4513] transition-colors leading-snug mb-1.5 cursor-pointer line-clamp-2 font-serif-jp"
                  >
                    {book.title}
                  </h3>

                  <div className="text-xs text-[#7d6c5c] mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-serif-jp">
                    <span className="font-medium text-[#3b2d24]">{book.authors}</span>
                    <span>•</span>
                    <span>{book.publisher} ({book.publishedYear}年)</span>
                  </div>

                  {/* Shelf Location Bar */}
                  <div
                    onClick={onOpenShelfMap}
                    className="bg-[#f5efe4] hover:bg-[#ede3d1] border border-[#e2d8c7] rounded-lg px-3 py-2 text-xs flex items-center justify-between text-[#4a392b] mb-3 cursor-pointer transition-colors font-serif-jp"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#8b4513] shrink-0" />
                      <span className="font-bold text-[#2a1d15]">{book.shelfCode}</span>
                      <span className="text-[#5c4938]">{book.shelfLocationName}</span>
                    </div>
                    <span className="text-[10px] text-[#8b4513] font-bold underline">配架図【準備中】</span>
                  </div>

                  {/* Solved Clinical Questions */}
                  {book.clinicalQuestions && book.clinicalQuestions.length > 0 && (
                    <div className="bg-[#fcf7ed] border border-[#e9dcbe] rounded-lg p-2.5 mb-3 text-xs">
                      <div className="font-bold text-[#4a2e05] flex items-center gap-1 mb-1 font-serif-jp">
                        <HelpCircle className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                        <span>解決できる臨床の疑問:</span>
                      </div>
                      <ul className="space-y-1 text-[#2d2217] list-disc list-inside font-serif-jp">
                        {book.clinicalQuestions.map((q, idx) => (
                          <li key={idx} className="line-clamp-1 leading-relaxed text-[11px] font-medium">
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Summary */}
                  <p className="text-xs text-[#615243] leading-relaxed line-clamp-2 mb-3 font-serif-jp">
                    {book.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-1">
                    {book.tags.map((tag) => (
                      <span
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="text-[10px] bg-[#f0eade] hover:bg-[#e8c872]/40 hover:text-[#241705] text-[#5c4938] px-2 py-0.5 rounded cursor-pointer transition-colors border border-[#ded7c8] font-serif-jp"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom: Single Clean Action */}
                <div className="bg-[#f5efe4]/80 border-t border-[#e8dfd0] px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onSelectBook(book)}
                    className="w-full inline-flex items-center justify-between text-[#8b4513] hover:text-[#5c2e0b] font-bold py-2 sm:py-1 cursor-pointer font-serif-jp min-h-[40px] touch-manipulation"
                  >
                    <span>要約・臨床エビデンス・目次詳細を見る</span>
                    <ChevronRight className="w-4 h-4 text-[#8b4513] shrink-0 ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
