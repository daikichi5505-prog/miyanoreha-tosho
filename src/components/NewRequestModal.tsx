import React, { useState } from 'react';
import { Profession, PurchaseRequest } from '../types';
import { X, BookMarked, Sparkles, HelpCircle, CheckCircle2, Bookmark } from 'lucide-react';

interface NewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: Omit<PurchaseRequest, 'id' | 'votes' | 'votedUserIds' | 'status' | 'requestDate'>) => void;
}

export const NewRequestModal: React.FC<NewRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [price, setPrice] = useState('');
  const [requesterName, setRequesterName] = useState('');
  const [profession, setProfession] = useState<Profession>('PT');
  const [clinicalProblem, setClinicalProblem] = useState('');
  const [benefitForDepartment, setBenefitForDepartment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !requesterName.trim() || !clinicalProblem.trim()) return;

    onSubmit({
      title: title.trim(),
      author: author.trim() || '未定 / 著者記載なし',
      publisher: publisher.trim() || '医学書系出版社',
      price: parseInt(price, 10) || 5000,
      requesterName: requesterName.trim(),
      profession,
      clinicalProblem: clinicalProblem.trim(),
      benefitForDepartment: benefitForDepartment.trim() || '科内勉強会および症例検討で共有活用'
    });

    // Reset & close
    setTitle('');
    setAuthor('');
    setPublisher('');
    setPrice('');
    setClinicalProblem('');
    setBenefitForDepartment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-[#140d08]/85 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#fcfbf7] rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#c8963e]/40 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150 book-spine-gold">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#241a15] via-[#35251d] to-[#241a15] text-[#f7f2e8] p-3.5 sm:p-5 flex items-center justify-between shrink-0 border-b border-[#c8963e]/40">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#c8963e] text-[#241705] flex items-center justify-center font-bold shadow-xs shrink-0">
              <BookMarked className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-[#fdfaf5] font-serif-jp leading-tight">
                図書購入希望リクエスト
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[#f5cb74] font-serif-jp mt-0.5">
                次回審議予定：毎月第3火曜日
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-3.5 sm:p-6 overflow-y-auto space-y-3.5 sm:space-y-4 text-xs">
          {/* Policy Guide Note */}
          <div className="bg-[#fcf7ed] border border-[#e9dcbe] rounded-xl p-3 flex items-start gap-2.5">
            <Bookmark className="w-4 h-4 text-[#8b4513] shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-[#3d2e20] leading-relaxed font-serif-jp">
              <span className="font-bold text-[#4a2e05]">選定基準のポイント:</span>
              <p className="text-[11px] text-[#5c4938]">
                「日常の臨床でどんな疑問が生じ、どう解決したいか」を具体的に記載してください。
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#24170e] mb-1 font-serif-jp">
              希望書籍タイトル <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：運動器超音波ガイド下注射・リハビリテーション実践手引き"
              className="w-full px-3 py-2.5 bg-[#faf8f2] border border-[#d8cfbe] rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-[#8b4513] focus:border-[#8b4513] text-[#2a1d15] placeholder:text-[#9e8f7e] min-h-[40px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#24170e] mb-1 font-serif-jp">
                著者・編者
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="例：皆川 洋至 ほか"
                className="w-full px-3 py-2.5 bg-[#faf8f2] border border-[#d8cfbe] rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-[#8b4513] focus:border-[#8b4513] text-[#2a1d15] placeholder:text-[#9e8f7e] min-h-[40px]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#24170e] mb-1 font-serif-jp">
                出版社
              </label>
              <input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="例：メジカルビュー社"
                className="w-full px-3 py-2.5 bg-[#faf8f2] border border-[#d8cfbe] rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-[#8b4513] focus:border-[#8b4513] text-[#2a1d15] placeholder:text-[#9e8f7e] min-h-[40px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#24170e] mb-1 font-serif-jp">
                参考定価 (円)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="5500"
                className="w-full px-3 py-2.5 bg-[#faf8f2] border border-[#d8cfbe] rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-[#8b4513] focus:border-[#8b4513] text-[#2a1d15] placeholder:text-[#9e8f7e] min-h-[40px]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#24170e] mb-1 font-serif-jp">
                申請者職種 <span className="text-rose-600">*</span>
              </label>
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value as Profession)}
                className="w-full px-3 py-2.5 bg-[#faf8f2] border border-[#d8cfbe] rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-[#8b4513] cursor-pointer text-[#2a1d15] font-serif-jp min-h-[40px]"
              >
                <option value="PT">PT (理学療法)</option>
                <option value="OT">OT (作業療法)</option>
                <option value="ST">ST (言語聴覚)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#24170e] mb-1 font-serif-jp">
                申請者氏名 <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
                placeholder="例：山田（PT）"
                className="w-full px-3 py-2.5 bg-[#faf8f2] border border-[#d8cfbe] rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-[#8b4513] focus:border-[#8b4513] text-[#2a1d15] placeholder:text-[#9e8f7e] min-h-[40px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#24170e] mb-1 font-serif-jp">
              解決したい臨床の疑問・課題 <span className="text-rose-600">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={clinicalProblem}
              onChange={(e) => setClinicalProblem(e.target.value)}
              placeholder="例：外来での肩関節周囲炎患者で夜間痛の除痛肢位やエコー描出に難渋しており、病態別の実践的アプローチを深めたい。"
              className="w-full px-3 py-2.5 bg-[#faf8f2] border border-[#d8cfbe] rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-[#8b4513] focus:border-[#8b4513] text-[#2a1d15] placeholder:text-[#9e8f7e]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#24170e] mb-1 font-serif-jp">
              科内・チームへの波及効果
            </label>
            <textarea
              rows={2}
              value={benefitForDepartment}
              onChange={(e) => setBenefitForDepartment(e.target.value)}
              placeholder="例：運動器チーム全員でエコー評価と徒手手技の標準化が図れ、新人指導にも即活用できる。"
              className="w-full px-3 py-2.5 bg-[#faf8f2] border border-[#d8cfbe] rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-[#8b4513] focus:border-[#8b4513] text-[#2a1d15] placeholder:text-[#9e8f7e]"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-[#ded7c8] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-[#5c4938] hover:bg-[#e6dece] rounded-lg transition-colors cursor-pointer font-serif-jp text-center min-h-[40px]"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-[#241705] bg-gradient-to-r from-[#d4af37] to-[#c8963e] hover:from-[#dfba44] hover:to-[#d4a249] rounded-lg shadow-xs transition-all cursor-pointer border border-[#d4af37] font-serif-jp text-center min-h-[42px] touch-manipulation"
            >
              リクエストを送信する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
