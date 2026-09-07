import React from 'react';
import { ShieldCheck, BookOpen, Sparkles, QrCode, RefreshCw, CheckCircle2, Info, Smartphone } from 'lucide-react';

export const RulesPolicySection: React.FC = () => {
  return (
    <section className="space-y-8">
      {/* Section Header: Stately Library Style */}
      <div className="border-b border-[#dcd4c3] pb-4">
        <div className="flex items-center gap-2 text-[#8b4513] text-xs font-bold tracking-wider uppercase mb-1 font-serif-jp">
          <ShieldCheck className="w-4 h-4 text-[#8b4513]" />
          <span>Library Management Policy & Department Guidelines</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#2a1d15] tracking-tight font-serif-jp">
          利用案内 ＆ 図書係活動方針
        </h2>
        <p className="text-[#685848] text-xs sm:text-sm mt-1 font-serif-jp">
          リハビリテーション科 教育委員会 図書係の理念と、リハビリ室内での蔵書利用ルールをご案内します。
        </p>
      </div>

      {/* Notice regarding lending: Currently in-house reading only */}
      <div className="bg-[#fcf7ed] border border-[#e8c872] rounded-xl p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#c8963e] text-[#241705] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm">
          <h3 className="font-bold text-[#3d2005] font-serif-jp">
            【図書管理について】現在は貸出管理を行っていません（リハ室での閲覧・活用）
          </h3>
          <p className="text-[#5c4938] leading-relaxed font-serif-jp">
            現在、外部への貸出登録システムは運用しておらず、<strong>「リハビリ室内での自由閲覧・ベッドサイド前の確認」</strong>を基本としています。
            他のスタッフも急な臨床疑問の解決に訪れるため、利用後は速やかに元の所定の棚（Rack-A〜D）へお戻しくださいますようご協力をお願いいたします。
          </p>
        </div>
      </div>

      {/* Core Policy Manifesto Banner: Classic Library Wood & Leather */}
      <div className="bg-gradient-to-br from-[#1e130c] via-[#2c1b12] to-[#16241b] text-[#f7f2e8] rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-[#c8963e]/40 shadow-xl book-spine-gold">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#c8963e]/20 text-[#f5cb74] border border-[#c8963e]/40 font-serif-jp">
            <Sparkles className="w-3.5 h-3.5 text-[#f5cb74]" />
            2026年度 教育委員会 「整える」係 スローガン
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#fdfaf5] leading-snug font-serif-jp">
            「整える」図書インフラ
            <span className="text-[#d4af37] font-normal mx-2">｜</span>
            <span className="text-[#f5cb74]">臨床の疑問を放置しない道具箱</span>
          </h3>

          <div className="bg-white/10 backdrop-blur-xs border border-[#d4af37]/30 rounded-xl p-5 text-[#f5ede0] text-sm sm:text-base leading-relaxed space-y-3 font-serif-jp">
            <p className="font-bold text-[#f5cb74] text-base">
              リハビリ室の蔵書を、いつでもスマホから瞬時に検索・エビデンス確認。
            </p>
            <p className="text-[#dcd0bf]">
              2026年度図書係は、古い書籍を整理し最新エビデンス本へ刷新。全蔵書へのQRコード貼付により、臨床現場での「困った」その瞬間に配架場所と要約を確認できる環境を整えています。
            </p>
            <div className="pt-2 text-xs sm:text-sm text-[#f5cb74] font-bold flex flex-wrap items-center gap-4">
              <span>● 全蔵書QRコード対応・スマホ即時検索</span>
              <span>● 年2回定期棚卸し実施（9月・3月）</span>
              <span>● 古い本を整理し、最新エビデンスをみんなの手に</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Step In-house Reading Flow */}
      <div>
        <h3 className="text-lg font-bold text-[#2a1d15] mb-4 flex items-center gap-2 font-serif-jp">
          <Smartphone className="w-5 h-5 text-[#8b4513]" />
          <span>リハビリ室での利用ステップ</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#fdfcf9] border border-[#ded7c8] rounded-xl p-4.5 shadow-2xs relative book-spine-gold">
            <div className="w-7 h-7 rounded-full bg-[#3a251b] text-[#f5cb74] font-bold text-xs flex items-center justify-center mb-3 font-mono border border-[#c8963e]/40">
              1
            </div>
            <h4 className="font-bold text-[#24170e] text-sm mb-1 font-serif-jp">
              スマホで検索・配架棚を確認
            </h4>
            <p className="text-xs text-[#6e5e50] leading-relaxed font-serif-jp">
              疑問に思った疾患名や手技でポータルを検索。該当する棚（Rack-A〜D）の段番号を確認して本を手に取ります。
            </p>
          </div>

          <div className="bg-[#fdfcf9] border border-[#ded7c8] rounded-xl p-4.5 shadow-2xs relative book-spine-gold">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#d4af37] to-[#c8963e] text-[#241705] font-bold text-xs flex items-center justify-center mb-3 font-mono shadow-2xs">
              2
            </div>
            <h4 className="font-bold text-[#24170e] text-sm mb-1 font-serif-jp">
              背表紙QRで要約・目次を確認
            </h4>
            <p className="text-xs text-[#6e5e50] leading-relaxed font-serif-jp">
              背表紙のQRコードをスマホカメラで読み取ると、目次や臨床エビデンスのポイントを即座に手元で確認できます。
            </p>
          </div>

          <div className="bg-[#fdfcf9] border border-[#ded7c8] rounded-xl p-4.5 shadow-2xs relative book-spine-gold">
            <div className="w-7 h-7 rounded-full bg-[#1e3325] text-[#d6ecd7] font-bold text-xs flex items-center justify-center mb-3 font-mono border border-[#3e684d]">
              3
            </div>
            <h4 className="font-bold text-[#24170e] text-sm mb-1 font-serif-jp">
              利用後は速やかに元の段へ戻す
            </h4>
            <p className="text-xs text-[#6e5e50] leading-relaxed font-serif-jp">
              他のスタッフも臨床の合間に参照するため、使い終わったら元の本棚・指定の段へ確実にお戻しください。
            </p>
          </div>
        </div>
      </div>

      {/* Rules Detail Table & Inventory info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Utilization Rules */}
        <div className="bg-[#fdfcf9] border border-[#ded7c8] rounded-xl p-4 sm:p-5 shadow-2xs space-y-3.5 sm:space-y-4 book-spine-gold">
          <h4 className="font-bold text-[#24170e] text-base flex items-center gap-2 border-b border-[#ded7c8] pb-2 font-serif-jp">
            <CheckCircle2 className="w-4 h-4 text-[#8b4513]" />
            <span>リハビリ室 蔵書利用のルール</span>
          </h4>

          <ul className="space-y-3 text-xs text-[#4a392b] font-serif-jp">
            <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2.5">
              <span className="font-bold text-[#24170e] shrink-0 sm:w-24">利用対象者:</span>
              <span className="text-[#3b2d22]">リハビリテーション科 スタッフ全員（PT / OT / ST / 医師 / 実習生）</span>
            </li>
            <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2.5">
              <span className="font-bold text-[#24170e] shrink-0 sm:w-24">利用場所:</span>
              <span className="text-[#3b2d22]">リハビリ室内での閲覧・カンファレンス時の参照を基本としています。</span>
            </li>
            <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2.5">
              <span className="font-bold text-[#24170e] shrink-0 sm:w-24">返却マナー:</span>
              <span className="text-[#3b2d22]">本棚の各段に貼付された分類ラベル（運動器、脳血管、心肺等）に従い、元の場所へ確実にお戻しください。</span>
            </li>
            <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2.5">
              <span className="font-bold text-[#24170e] shrink-0 sm:w-24">書き込み・破損:</span>
              <span className="text-[#3b2d22]">付箋をご利用いただき、直接のペン書き込みはご遠慮ください。ページ破損時は図書係へご一報を。</span>
            </li>
          </ul>
        </div>

        {/* Committee Action Roadmap */}
        <div className="bg-[#fdfcf9] border border-[#ded7c8] rounded-xl p-4 sm:p-5 shadow-2xs space-y-3.5 sm:space-y-4 book-spine-gold">
          <h4 className="font-bold text-[#24170e] text-base flex items-center gap-2 border-b border-[#ded7c8] pb-2 font-serif-jp">
            <RefreshCw className="w-4 h-4 text-[#2d6a3f]" />
            <span>2026年度 図書係アクション予定</span>
          </h4>

          <div className="space-y-3 text-xs font-serif-jp">
            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-[#faf8f2] border border-[#ded7c8]">
              <span className="px-2 py-0.5 rounded bg-[#3a251b] text-[#f5cb74] text-[10px] font-bold shrink-0 font-mono">
                通年
              </span>
              <div>
                <div className="font-bold text-[#24170e]">全蔵書QRコード貼付 ＆ スマホ要約連動</div>
                <div className="text-[#6e5e50] text-[11px] mt-0.5">現場で10秒以内に要約・エビデンスを確認できる仕組みを維持・拡充。</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-[#faf8f2] border border-[#ded7c8]">
              <span className="px-2 py-0.5 rounded bg-[#8b4513] text-white text-[10px] font-bold shrink-0 font-mono">
                毎月
              </span>
              <div>
                <div className="font-bold text-[#24170e]">新刊ジャーナル抄読・配架更新</div>
                <div className="text-[#6e5e50] text-[11px] mt-0.5">理学療法ジャーナル等、定期購読誌の最新号受入・テーマ周知。</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-[#faf8f2] border border-[#ded7c8]">
              <span className="px-2 py-0.5 rounded bg-[#1e3325] text-[#d6ecd7] text-[10px] font-bold shrink-0 font-mono">
                年2回
              </span>
              <div>
                <div className="font-bold text-[#24170e]">定期蔵書棚卸し（9月・3月）</div>
                <div className="text-[#6e5e50] text-[11px] mt-0.5">所在不明本の確認と、旧版の除籍・新版入替審議。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
