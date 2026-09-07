import { Book, JournalIssue, PurchaseRequest, AnnouncementItem, BookCategory } from '../types';

export const INITIAL_JOURNALS: JournalIssue[] = [
  // === 8月 (当月：【NEW】最新号) ===
  {
    id: 'JN-2026-08-01',
    journalName: '作業療法ジャーナル',
    issue: '60巻8号 (増刊号)',
    publishedDate: '2026-08-25',
    month: '2026年8月',
    publisher: '三輪書店',
    url: 'https://shop.miwapubl.com/products/detail/2946',
    shelfLocation: '雑誌ラック 1段目（最新号コーナー）',
    theme: '訪問作業療法',
    isLatest: true,
    coverAccent: 'amber',
    targetProfession: ['OT', '全科']
  },
  {
    id: 'JN-2026-08-02',
    journalName: 'J. of Clinical Rehabilitation (臨床リハビリテーション)',
    issue: '35巻8号 (最新号)',
    publishedDate: '2026-08-18',
    month: '2026年8月',
    publisher: '医歯薬出版',
    url: 'https://www.ishiyaku.co.jp/magazines/cr/',
    shelfLocation: '雑誌ラック 1段目（最新号コーナー）',
    theme: '慢性・進行性疾患の最新薬物治療',
    isLatest: true,
    coverAccent: 'teal',
    targetProfession: ['PT', 'OT', 'ST', '全科']
  },
  {
    id: 'JN-2026-08-03',
    journalName: '理学療法',
    issue: '43巻4号（2026年8月号）',
    publishedDate: '2026-08-10',
    month: '2026年8月',
    publisher: '文光堂',
    url: 'https://www.bunkodo.co.jp/magazine/NLM46P2PAG.html',
    shelfLocation: '雑誌ラック 1段目（最新号コーナー）',
    theme: 'デジタル理学療法の現状と課題',
    isLatest: true,
    coverAccent: 'emerald',
    targetProfession: ['PT', '全科']
  },

  // === 7月 (前月保管・バックナンバー) ===
  {
    id: 'JN-2026-07-01',
    journalName: 'J. of Clinical Rehabilitation (臨床リハビリテーション)',
    issue: '35巻8号',
    publishedDate: '2026-07-28',
    month: '2026年7月',
    publisher: '医歯薬出版',
    url: 'https://www.ishiyaku.co.jp/search/details?bookcode=083508',
    shelfLocation: '雑誌ラック 2段目（直近期保管コーナー）',
    theme: '慢性・進行性疾患の最新薬物治療',
    isLatest: false,
    coverAccent: 'teal',
    targetProfession: ['PT', 'OT', 'ST', '全科']
  },
  {
    id: 'JN-2026-07-02',
    journalName: '作業療法ジャーナル',
    issue: '60巻7号',
    publishedDate: '2026-07-20',
    month: '2026年7月',
    publisher: '三輪書店',
    url: 'https://shop.miwapubl.com/products/detail/2941',
    shelfLocation: '雑誌ラック 2段目（直近期保管コーナー）',
    theme: '2040年を見据えて',
    isLatest: false,
    coverAccent: 'amber',
    targetProfession: ['OT', '全科']
  },
  {
    id: 'JN-2026-07-03',
    journalName: '理学療法ジャーナル',
    issue: 'Vol.60 No.7（2026年7月号）',
    publishedDate: '2026-07-15',
    month: '2026年7月',
    publisher: '医学書院',
    url: 'https://www.igaku-shoin.co.jp/journal/detail/42357',
    shelfLocation: '雑誌ラック 2段目（直近期保管コーナー）',
    theme: 'ERAS時代の大腿骨近位部骨折ケア',
    isLatest: false,
    coverAccent: 'blue',
    targetProfession: ['PT', '全科']
  },
  {
    id: 'JN-2026-07-04',
    journalName: '理学療法ジャーナル',
    issue: 'Vol.60 No.6（2026年6月号）',
    publishedDate: '2026-07-10',
    month: '2026年7月',
    publisher: '医学書院',
    url: 'https://www.igaku-shoin.co.jp/journal/detail/42356',
    shelfLocation: '雑誌ラック 2段目（直近期保管コーナー）',
    theme: '栄養診断としての骨格筋量評価 up to date',
    isLatest: false,
    coverAccent: 'blue',
    targetProfession: ['PT', '全科']
  },
  {
    id: 'JN-2026-07-05',
    journalName: '理学療法',
    issue: '43巻3号（2026年7月号）',
    publishedDate: '2026-07-05',
    month: '2026年7月',
    publisher: '文光堂',
    url: 'https://www.bunkodo.co.jp/magazine/I39JOKSYH4.html',
    shelfLocation: '雑誌ラック 2段目（直近期保管コーナー）',
    theme: '地域理学療法における要介護高齢者の評価の再考',
    isLatest: false,
    coverAccent: 'emerald',
    targetProfession: ['PT', '全科']
  },

  // === 6月 (前月保管・バックナンバー) ===
  {
    id: 'JN-2026-06-01',
    journalName: 'J. of Clinical Rehabilitation (臨床リハビリテーション)',
    issue: '臨時増刊号第35巻7号',
    publishedDate: '2026-06-25',
    month: '2026年6月',
    publisher: '医歯薬出版',
    url: 'https://www.ishiyaku.co.jp/magazines/cr/',
    shelfLocation: '雑誌ラック 3段目（バックナンバー保管棚）',
    theme: '急性期リハビリテーション医療最前線',
    isLatest: false,
    coverAccent: 'teal',
    targetProfession: ['PT', 'OT', 'ST', '全科']
  },
  {
    id: 'JN-2026-06-02',
    journalName: 'J. of Clinical Rehabilitation (臨床リハビリテーション)',
    issue: '35巻6号',
    publishedDate: '2026-06-20',
    month: '2026年6月',
    publisher: '医歯薬出版',
    url: 'https://www.ishiyaku.co.jp/search/details?bookcode=083506',
    shelfLocation: '雑誌ラック 3段目（バックナンバー保管棚）',
    theme: '高位頚髄損傷者の呼吸管理',
    isLatest: false,
    coverAccent: 'teal',
    targetProfession: ['PT', 'OT', 'ST', '全科']
  },
  {
    id: 'JN-2026-06-03',
    journalName: '作業療法ジャーナル',
    issue: '60巻6号',
    publishedDate: '2026-06-15',
    month: '2026年6月',
    publisher: '三輪書店',
    url: 'https://shop.miwapubl.com/products/detail/2935',
    shelfLocation: '雑誌ラック 3段目（バックナンバー保管棚）',
    theme: 'ロボット技術の作業療法への活用',
    isLatest: false,
    coverAccent: 'amber',
    targetProfession: ['OT', '全科']
  },
  {
    id: 'JN-2026-06-04',
    journalName: '理学療法ジャーナル',
    issue: 'Vol.60 No.5（2026年5月号）',
    publishedDate: '2026-06-10',
    month: '2026年6月',
    publisher: '医学書院',
    url: 'https://www.igaku-shoin.co.jp/journal/detail/42355',
    shelfLocation: '雑誌ラック 3段目（バックナンバー保管棚）',
    theme: '目標設定について考える　何のためにそれをめざすのか',
    isLatest: false,
    coverAccent: 'blue',
    targetProfession: ['PT', '全科']
  },
  {
    id: 'JN-2026-06-05',
    journalName: '理学療法',
    issue: '43巻2号（2026年6月号）',
    publishedDate: '2026-06-05',
    month: '2026年6月',
    publisher: '文光堂',
    url: 'https://www.bunkodo.co.jp/magazine/GKVAWS7OO8.html?from=backNumber',
    shelfLocation: '雑誌ラック 3段目（バックナンバー保管棚）',
    theme: 'エビデンスも活用した内部障害患者に対する理学療法：EBPケーススタディ',
    isLatest: false,
    coverAccent: 'emerald',
    targetProfession: ['PT', '全科']
  },
  {
    id: 'JN-2026-06-06',
    journalName: '作業療法ジャーナル',
    issue: '60巻5号',
    publishedDate: '2026-06-02',
    month: '2026年6月',
    publisher: '三輪書店',
    url: 'https://shop.miwapubl.com/products/detail/2934',
    shelfLocation: '雑誌ラック 3段目（バックナンバー保管棚）',
    theme: '医療観察法20年―作業療法の果たす役割と作業療法士の実践知',
    isLatest: false,
    coverAccent: 'amber',
    targetProfession: ['OT', '全科']
  },

  // === 5月 (前月保管・バックナンバー) ===
  {
    id: 'JN-2026-05-01',
    journalName: '理学療法',
    issue: '43巻1号（2026年5月号）',
    publishedDate: '2026-05-25',
    month: '2026年5月',
    publisher: '文光堂',
    url: 'https://www.bunkodo.co.jp/magazine/PY3TR90MUG.html?from=backNumber',
    shelfLocation: '雑誌ラック 3段目（バックナンバー保管棚）',
    theme: '人工関節の進化と患者層のアクティブ化に対する新たな理学療法戦略',
    isLatest: false,
    coverAccent: 'emerald',
    targetProfession: ['PT', '全科']
  },
  {
    id: 'JN-2026-05-02',
    journalName: 'J. of Clinical Rehabilitation (臨床リハビリテーション)',
    issue: '35巻5号',
    publishedDate: '2026-05-18',
    month: '2026年5月',
    publisher: '医歯薬出版',
    url: 'https://www.ishiyaku.co.jp/search/details?bookcode=083505',
    shelfLocation: '雑誌ラック 3段目（バックナンバー保管棚）',
    theme: '「お楽しみ程度の経口摂取」患者における摂食嚥下リハビリテーション',
    isLatest: false,
    coverAccent: 'teal',
    targetProfession: ['ST', 'PT', 'OT', '全科']
  },
  {
    id: 'JN-2026-05-03',
    journalName: '理学療法ジャーナル',
    issue: 'Vol.60 No.4（2026年4月号）',
    publishedDate: '2026-05-10',
    month: '2026年5月',
    publisher: '医学書院',
    url: 'https://www.igaku-shoin.co.jp/journal/detail/42354',
    shelfLocation: '雑誌ラック 3段目（バックナンバー保管棚）',
    theme: '理学療法現場で役立つ 《保存版》トレーニングの基本',
    isLatest: false,
    coverAccent: 'blue',
    targetProfession: ['PT', '全科']
  },

  // === 4月 (前月保管・バックナンバー) ===
  {
    id: 'JN-2026-04-01',
    journalName: 'J. of Clinical Rehabilitation (臨床リハビリテーション)',
    issue: '35巻4号',
    publishedDate: '2026-04-25',
    month: '2026年4月',
    publisher: '医歯薬出版',
    url: 'https://www.ishiyaku.co.jp/search/details?bookcode=083504',
    shelfLocation: '雑誌ラック 3段目（バックナンバー保管棚）',
    theme: '人工関節の進歩とリハビリテーション治療',
    isLatest: false,
    coverAccent: 'teal',
    targetProfession: ['PT', '全科']
  },
  {
    id: 'JN-2026-04-02',
    journalName: '作業療法ジャーナル',
    issue: '60巻4号',
    publishedDate: '2026-04-20',
    month: '2026年4月',
    publisher: '三輪書店',
    url: 'https://shop.miwapubl.com/products/detail/2926',
    shelfLocation: '雑誌ラック 3段目（バックナンバー保管棚）',
    theme: '内部障害を有する人への作業療法―疾患別のリスク管理と生活支援',
    isLatest: false,
    coverAccent: 'amber',
    targetProfession: ['OT', '全科']
  },
  {
    id: 'JN-2026-04-03',
    journalName: '脳卒中後の自動車運転再開の手引き 改訂第2版',
    issue: '単行本（改訂第2版）',
    publishedDate: '2026-04-15',
    month: '2026年4月',
    publisher: '医歯薬出版',
    url: 'https://www.ishiyaku.co.jp/search/details?bookcode=218880',
    shelfLocation: 'B棚 1段目 (Rack-B1) / 受入新刊棚',
    theme: '脳卒中後の自動車運転再開の手引き 改訂第2版',
    isLatest: false,
    coverAccent: 'blue',
    targetProfession: ['OT', 'PT', '全科']
  },
  {
    id: 'JN-2026-04-04',
    journalName: '脳卒中の機能評価―SIASとFIM［応用編］',
    issue: '単行本（応用編）',
    publishedDate: '2026-04-10',
    month: '2026年4月',
    publisher: '金原出版',
    url: 'https://www.kanehara-shuppan.co.jp/books/detail.html?isbn=9784307750592',
    shelfLocation: 'B棚 1段目 (Rack-B1) / 受入新刊棚',
    theme: '脳卒中の機能評価―SIASとFIM ［応用編］',
    isLatest: false,
    coverAccent: 'emerald',
    targetProfession: ['PT', 'OT', '全科']
  },
  {
    id: 'JN-2026-04-05',
    journalName: '脳卒中の機能評価―SIASとFIM［基礎編］',
    issue: '単行本（基礎編）',
    publishedDate: '2026-04-05',
    month: '2026年4月',
    publisher: '金原出版',
    url: 'https://www.kanehara-shuppan.co.jp/books/detail.html?isbn=9784307750332',
    shelfLocation: 'B棚 1段目 (Rack-B1) / 受入新刊棚',
    theme: '脳卒中の機能評価―SIASとFIM［基礎編］',
    isLatest: false,
    coverAccent: 'emerald',
    targetProfession: ['PT', 'OT', '全科']
  }
];

// All books in the application are derived directly from the user's announced journal URLs
export const INITIAL_BOOKS: Book[] = INITIAL_JOURNALS.map((j, index) => {
  let category: BookCategory = '理学療法・動作分析';
  if (j.targetProfession?.includes('OT') && !j.targetProfession?.includes('PT')) {
    category = '作業療法・高次脳';
  } else if (j.targetProfession?.includes('ST')) {
    category = '言語聴覚・嚥下';
  } else if (j.theme.includes('骨折') || j.theme.includes('関節') || j.theme.includes('運動器')) {
    category = '運動器疾患';
  } else if (j.theme.includes('脳卒中') || j.theme.includes('神経') || j.theme.includes('麻痺') || j.theme.includes('頚髄') || j.theme.includes('SIAS')) {
    category = '脳血管・神経系';
  } else if (j.theme.includes('内部障害') || j.theme.includes('呼吸') || j.theme.includes('心')) {
    category = '心肺・内部障害';
  }

  return {
    id: `BK-${j.id}`,
    title: `${j.journalName} ${j.issue}`,
    authors: `${j.publisher || '出版社'} 編集部`,
    publisher: j.publisher || '医学出版社',
    publishedYear: 2026,
    category,
    shelfCode: j.shelfLocation.includes('B棚') ? 'Rack-B1' : 'Rack-JN',
    shelfLocationName: j.shelfLocation,
    qrCodeId: `QR-${j.id}`,
    isAvailable: true,
    url: j.url,
    summary: `『${j.journalName} ${j.issue}』（${j.publisher}）。特集テーマ：「${j.theme}」。`,
    clinicalQuestions: [
      `特集テーマ「${j.theme}」に関する最新の臨床的知見・実践アプローチ`
    ],
    evidenceHighlights: `特集：「${j.theme}」に関する最新知見と臨床推奨。`,
    tags: [j.journalName, j.publisher || '', j.theme],
    isNewPurchase: j.isLatest,
    purchaseMonth: j.month,
    recommendedFor: `${j.targetProfession?.join('/') || 'リハスタッフ全般'}、臨床現場の最新エビデンス参照`,
    rating: j.isLatest ? 4.9 : 4.8,
    reviewCount: 4 + (index % 6),
    tableOfContents: [`【特集】${j.theme}`]
  };
});

export const INITIAL_REQUESTS: PurchaseRequest[] = [];

export const SHELF_LAYOUT = [
  {
    code: 'Rack-A',
    name: 'A棚：運動器・関節・動作分析',
    color: 'border-emerald-500 bg-emerald-50/50',
    accent: 'emerald',
    levels: [
      { level: '1段目', description: '変形性関節症・TKA/THA・股膝下肢疾患', count: 6 },
      { level: '2段目', description: '肩関節・脊椎・上肢骨折・拘縮治療', count: 7 },
      { level: '3段目', description: 'ペリー歩行分析・バイオメカニクス・解剖アトラス', count: 5 }
    ]
  },
  {
    code: 'Rack-B',
    name: 'B棚：脳血管・中枢神経・心肺内部障害',
    color: 'border-blue-500 bg-blue-50/50',
    accent: 'blue',
    levels: [
      { level: '1段目', description: '脳卒中理学療法・片麻痺歩行・装具療法・SIAS/FIM', count: 8 },
      { level: '2段目', description: '心臓リハビリ・呼吸リハ・ICU早期離床・内部障害', count: 6 },
      { level: '3段目', description: 'パーキンソン病・神経難病・小脳失調', count: 4 }
    ]
  },
  {
    code: 'Rack-C',
    name: 'C棚：作業療法・高次脳・言語嚥下',
    color: 'border-amber-500 bg-amber-50/50',
    accent: 'amber',
    levels: [
      { level: '1段目', description: '摂食嚥下・VE/VF評価・口腔ケア・ST手引', count: 7 },
      { level: '2段目', description: '高次脳機能障害（USN/注意）・作業療法実践', count: 6 },
      { level: '3段目', description: '失語症・構音障害・発達・精神心理', count: 5 }
    ]
  },
  {
    code: 'Rack-D',
    name: 'D棚：ガイドライン・研究統計・教育新刊',
    color: 'border-purple-500 bg-purple-50/50',
    accent: 'purple',
    levels: [
      { level: '1段目', description: '統計解析（EZR/SPSS）・臨床研究・学会発表手引', count: 4 },
      { level: '2段目', description: '理学療法/作業療法/言語聴覚 診療ガイドライン', count: 6 },
      { level: '3段目', description: '【新刊・特設】2026年度購入図書＆おすすめ推薦書', count: 8 }
    ]
  },
  {
    code: 'Rack-JN',
    name: '雑誌ラック：最新ジャーナル・定期購読誌',
    color: 'border-teal-500 bg-teal-50/50',
    accent: 'teal',
    levels: [
      { level: '1段目', description: '最新号（理学療法、臨床リハ、作業療法ジャーナル）', count: 3 },
      { level: '2段目', description: '前月直近期号（7月受入バックナンバー）', count: 5 },
      { level: '3段目', description: '過去号保管（4月〜6月受入バックナンバー保管）', count: 14 }
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = INITIAL_JOURNALS.map((j) => {
  return {
    id: `ANN-${j.id}`,
    title: j.isLatest
      ? `【最新号】『${j.journalName} ${j.issue}』配架 ｜ 特集：${j.theme}`
      : `【保管アーカイブ】『${j.journalName} ${j.issue}』 ｜ 特集：${j.theme}`,
    type: 'journal',
    date: j.publishedDate,
    month: j.month || '2026年8月',
    summary: `『${j.journalName} ${j.issue}』（${j.publisher || '出版社'}）を受入・配架しました。特集テーマ：「${j.theme}」。`,
    highlight: `特集テーマ: ${j.theme}（配架場所: ${j.shelfLocation}）`,
    targetProfession: j.targetProfession,
    shelfLocation: j.shelfLocation,
    relatedJournalId: j.id,
    relatedBookId: `BK-${j.id}`,
    url: j.url,
    isLatest: j.isLatest,
    tags: [j.journalName, j.publisher || '', j.theme, j.isLatest ? '最新号' : 'バックナンバー'],
    authorOrSource: j.publisher || '出版社'
  };
});
