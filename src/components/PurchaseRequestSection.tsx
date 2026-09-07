import React, { useState } from 'react';
import { PurchaseRequest } from '../types';
import { BookMarked, Plus, ThumbsUp, CheckCircle2, Clock, MapPin, Sparkles, MessageSquare, AlertCircle, Filter, Bookmark } from 'lucide-react';

interface PurchaseRequestSectionProps {
  requests: PurchaseRequest[];
  onVote: (requestId: string) => void;
  onOpenNewRequest: () => void;
  onOpenShelfMap: () => void;
}

export const PurchaseRequestSection: React.FC<PurchaseRequestSectionProps> = ({
  requests,
  onVote,
  onOpenNewRequest,
  onOpenShelfMap
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterProfession, setFilterProfession] = useState<string>('all');

  const filteredRequests = requests.filter(req => {
    if (filterStatus !== 'all' && req.status !== filterStatus) return false;
    if (filterProfession !== 'all' && req.profession !== filterProfession) return false;
    return true;
  });

  const getStatusBadge = (status: PurchaseRequest['status']) => {
    switch (status) {
      case '配架完了':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-[#edf5ef] text-[#1c4728] border border-[#b8dabf] font-serif-jp">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a3f]" />
            配架完了 (閲覧可)
          </span>
        );
      case '購入決定・発注中':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-[#fcf5e5] text-[#5c3e08] border border-[#e8c872] font-serif-jp">
            <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
            購入決定・発注中
          </span>
        );
      case '審議中':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-[#f0eade] text-[#5c4938] border border-[#d8cfbe] font-serif-jp">
            <Clock className="w-3.5 h-3.5 text-[#8b4513]" />
            教育委員会にて審議中
          </span>
        );
      case '見送り':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-[#eae6df] text-[#6e6355] border border-[#d2ccc0] font-serif-jp">
            見送り
          </span>
        );
    }
  };

  return (
    <section className="space-y-6">
      {/* Section Header: Stately Library Style */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dcd4c3] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#8b4513] text-xs font-bold tracking-wider uppercase mb-1 font-serif-jp">
            <BookMarked className="w-4 h-4 text-[#8b4513]" />
            <span>Staff Book Purchase Requests & Committee Status</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2a1d15] tracking-tight font-serif-jp">
            購入希望リクエスト ＆ 審議ステータス
          </h2>
          <p className="text-[#685848] text-xs sm:text-sm mt-1 font-serif-jp">
            日々の臨床での「疑問」「解決したい課題」に応える専門書をスタッフ誰でも提案できます。賛同の「＋1 投票」が多い本は優先審議されます。
          </p>
        </div>

        <button
          id="btn-open-request-modal"
          onClick={onOpenNewRequest}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c8963e] hover:from-[#dfba44] hover:to-[#d4a249] text-[#241705] font-black text-xs sm:text-sm shadow-xs transition-all shrink-0 cursor-pointer border border-[#d4af37] font-serif-jp min-h-[44px] touch-manipulation"
        >
          <Plus className="w-4 h-4 text-[#241705]" />
          <span>購入希望をリクエストする</span>
        </button>
      </div>

      {/* Rationale policy banner: Classic Library Dark Wood & Gold */}
      <div className="bg-[#241a15] text-[#f7f2e8] rounded-xl p-3.5 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5 sm:gap-4 border border-[#c8963e]/40 shadow-xs book-spine-gold">
        <div className="space-y-1">
          <div className="font-bold text-[#f5cb74] text-sm sm:text-base flex items-center gap-2 font-serif-jp">
            <Bookmark className="w-4 h-4 text-[#f5cb74]" />
            <span>リクエスト選定指針 ｜ 「臨床の疑問を放置しない道具箱」</span>
          </div>
          <p className="text-xs sm:text-[13px] text-[#ded0be] leading-relaxed max-w-3xl font-serif-jp">
            「◯◯疾患のこの病態に対するエビデンスを知りたい」「症例で装具判定に悩むため」など、<strong>具体的な臨床課題</strong>を明記して申請してください。毎月の教育委員会にて審議・発注を行います。
          </p>
        </div>

        <div className="bg-[#3a251b] px-3.5 py-2 rounded-lg text-xs border border-[#c8963e]/50 text-[#f5cb74] shrink-0 font-medium font-serif-jp w-full md:w-auto text-center">
          次回審議予定: <strong className="text-[#fdfaf5] font-bold">毎月第3火曜日</strong>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-[#fcfbf7] border border-[#ded7c8] rounded-xl p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs book-spine-gold">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
          <span className="font-bold text-[#3d2e20] flex items-center gap-1 font-serif-jp shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#8b4513]" />
            <span className="hidden xs:inline">状態:</span>
          </span>
          {['all', '審議中', '購入決定・発注中', '配架完了'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer text-xs font-bold font-serif-jp shrink-0 min-h-[34px] ${
                filterStatus === st
                  ? 'bg-[#3a251b] text-[#f5cb74] shadow-xs border border-[#c8963e]/50'
                  : 'bg-[#f0eade] hover:bg-[#e6dece] text-[#5c4938] border border-[#ded7c8]'
              }`}
            >
              {st === 'all' ? 'すべて' : st}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 font-serif-jp">
          <span className="text-[#7d6c5c] font-medium text-[11px] shrink-0">職種別:</span>
          <select
            value={filterProfession}
            onChange={(e) => setFilterProfession(e.target.value)}
            className="bg-[#faf8f2] border border-[#d8cfbe] rounded-lg px-2.5 py-1.5 text-xs text-[#3d2e20] outline-hidden font-semibold cursor-pointer min-h-[34px]"
          >
            <option value="all">全職種 (PT / OT / ST)</option>
            <option value="PT">PT (理学療法)</option>
            <option value="OT">OT (作業療法)</option>
            <option value="ST">ST (言語聴覚)</option>
          </select>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((req) => {
          return (
            <div
              key={req.id}
              className="bg-[#fdfcf9] border border-[#dcd4c3] hover:border-[#c8963e] rounded-xl p-3.5 sm:p-5 shadow-xs transition-all book-spine-gold"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
                    {getStatusBadge(req.status)}
                    <span className="text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded bg-[#f0eade] text-[#5c4938] border border-[#d8cfbe] font-serif-jp">
                      {req.profession} 申請
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#857462] font-mono">
                      申請日: {req.requestDate} ｜ {req.requesterName}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#24170e] leading-snug font-serif-jp">
                    {req.title}
                  </h3>

                  <div className="text-xs text-[#7d6c5c] mt-0.5 font-serif-jp flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span>著者: <strong className="font-medium text-[#3b2d24]">{req.author}</strong></span>
                    <span>｜ 出版社: {req.publisher}</span>
                    <span>｜ 参考価格: 約 ¥{req.price.toLocaleString()}</span>
                  </div>
                </div>

                {/* Vote button */}
                <div className="shrink-0 flex items-center pt-1 sm:pt-0 border-t sm:border-t-0 border-[#e8e2d4]">
                  <button
                    onClick={() => onVote(req.id)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#fcf7ed] hover:bg-[#faebd1] text-[#3d2005] border border-[#d4af37] text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 font-serif-jp min-h-[40px] touch-manipulation"
                    title="この本がリハ室にあると助かる！に賛同"
                  >
                    <ThumbsUp className="w-4 h-4 text-[#8b4513] shrink-0" />
                    <span>読みたい! 賛同</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#3a251b] text-[#f5cb74] text-[11px] font-black ml-0.5">
                      {req.votes}
                    </span>
                  </button>
                </div>
              </div>

              {/* Rationale boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-xs">
                <div className="bg-[#fcf7ed] border border-[#e9dcbe] rounded-lg p-3">
                  <div className="font-bold text-[#4a2e05] mb-1 flex items-center gap-1.5 font-serif-jp">
                    <AlertCircle className="w-3.5 h-3.5 text-[#8b4513]" />
                    <span>解決したい臨床課題・疑問:</span>
                  </div>
                  <p className="text-[#2d2217] leading-relaxed font-medium font-serif-jp">
                    {req.clinicalProblem}
                  </p>
                </div>

                <div className="bg-[#edf5ef] border border-[#b8dabf] rounded-lg p-3">
                  <div className="font-bold text-[#1a3824] mb-1 flex items-center gap-1.5 font-serif-jp">
                    <Sparkles className="w-3.5 h-3.5 text-[#2d6a3f]" />
                    <span>科内・チームへの波及効果:</span>
                  </div>
                  <p className="text-[#1c4728] leading-relaxed font-medium font-serif-jp">
                    {req.benefitForDepartment}
                  </p>
                </div>
              </div>

              {/* Committee feedback if available */}
              {req.committeeFeedback && (
                <div className="bg-[#edf5ef] border border-[#b8dabf] rounded-lg p-3 text-xs">
                  <div className="font-bold text-[#1a3824] mb-1 flex items-center gap-1.5 font-serif-jp">
                    <MessageSquare className="w-3.5 h-3.5 text-[#2d6a3f]" />
                    <span>教育委員会コメント:</span>
                  </div>
                  <p className="text-[#1c4728] font-medium font-serif-jp">
                    {req.committeeFeedback}
                  </p>
                  {req.shelfLocation && (
                    <div className="mt-2 pt-2 border-t border-[#b8dabf] flex items-center justify-between text-[#1c4728]">
                      <span className="flex items-center gap-1 font-bold font-serif-jp">
                        <MapPin className="w-3.5 h-3.5 text-[#2d6a3f]" />
                        配架場所: {req.shelfLocation}
                      </span>
                      <button
                        onClick={onOpenShelfMap}
                        className="text-[11px] font-bold text-[#8b4513] underline cursor-pointer font-serif-jp"
                      >
                        配架マップを確認
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
