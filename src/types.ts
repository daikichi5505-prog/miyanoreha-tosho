export type Profession = 'PT' | 'OT' | 'ST' | '医師' | '看護師' | 'その他';

export type BookCategory = 
  | 'すべて'
  | '運動器疾患'
  | '脳血管・神経系'
  | '心肺・内部障害'
  | '作業療法・高次脳'
  | '言語聴覚・嚥下'
  | '理学療法・動作分析'
  | '評価法・統計・研究'
  | 'ガイドライン・エビデンス';

export interface Book {
  id: string;
  title: string;
  authors: string;
  publisher: string;
  publishedYear: number;
  isbn?: string;
  category: BookCategory;
  shelfCode: string; // e.g. "Rack-A1", "Rack-B2"
  shelfLocationName: string; // e.g. "A棚 1段目（運動器・関節）"
  qrCodeId: string;
  isAvailable: boolean;
  borrowerName?: string;
  borrowerProfession?: Profession;
  borrowedAt?: string;
  returnDueDate?: string;
  summary: string;
  clinicalQuestions: string[]; // どんな臨床の疑問に答える本か
  evidenceHighlights: string;
  tags: string[];
  isNewPurchase?: boolean;
  purchaseMonth?: string;
  url?: string;
  recommendedFor?: string; // e.g. "新人〜中堅PT / 骨折後リハ担当"
  rating?: number;
  reviewCount?: number;
  tableOfContents?: string[];
}

export interface JournalArticle {
  title: string;
  authors: string;
  page?: string;
  summary: string;
  clinicalTakeaway: string;
  keywords: string[];
}

export interface JournalIssue {
  id: string;
  journalName: string;
  issue: string; // e.g. "2026年 60巻 8号"
  publishedDate: string;
  month?: string; // e.g. "2026年8月"
  publisher?: string; // e.g. "医歯薬出版", "三輪書店", "文光堂", "医学書院", "金原出版"
  url?: string; // Official publisher page URL
  shelfLocation: string;
  theme: string;
  keyArticles?: JournalArticle[];
  isLatest: boolean; // When true, displays 【NEW】
  coverAccent?: string;
  targetProfession?: (Profession | '全科')[];
}

export interface PurchaseRequest {
  id: string;
  title: string;
  author: string;
  publisher: string;
  price: number;
  requesterName: string;
  profession: Profession;
  requestDate: string;
  clinicalProblem: string; // 解決したい臨床課題・疑問
  benefitForDepartment: string; // 科内・チームへの波及効果
  votes: number;
  votedUserIds: string[];
  status: '審議中' | '購入決定・発注中' | '配架完了' | '見送り';
  committeeFeedback?: string;
  shelfLocation?: string;
}

export interface LendingLog {
  id: string;
  bookId: string;
  bookTitle: string;
  staffName: string;
  profession: Profession;
  action: 'borrow' | 'return';
  timestamp: string;
}

export type AnnouncementType = 'journal' | 'book' | 'request_fulfilled' | 'notice';

export interface AnnouncementItem {
  id: string;
  title: string;
  type: AnnouncementType;
  date: string; // e.g. "2026-08-25"
  month: string; // e.g. "2026年8月"
  summary: string;
  highlight: string; // Clinical takeaway or key recommendation
  targetProfession?: (Profession | '全科')[];
  shelfLocation?: string;
  relatedBookId?: string;
  relatedJournalId?: string;
  isLatest?: boolean;
  tags?: string[];
  authorOrSource?: string;
  url?: string;
}
