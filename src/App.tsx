/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Book, JournalIssue, PurchaseRequest } from './types';
import { INITIAL_BOOKS, INITIAL_JOURNALS, INITIAL_REQUESTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { VisionHero } from './components/VisionHero';
import { BookSearchSection } from './components/BookSearchSection';
import { JournalSection } from './components/JournalSection';
import { PurchasedBooksSection } from './components/PurchasedBooksSection';
import { PurchaseRequestSection } from './components/PurchaseRequestSection';
import { RulesPolicySection } from './components/RulesPolicySection';
import { BookDetailModal } from './components/BookDetailModal';
import { ShelfMapModal } from './components/ShelfMapModal';
import { QrCodeScannerModal } from './components/QrCodeScannerModal';
import { NewRequestModal } from './components/NewRequestModal';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

const STORAGE_KEY_BOOKS = 'rehab_books_v3';
const STORAGE_KEY_REQUESTS = 'rehab_requests_v3';

export default function App() {
  const [books] = useState<Book[]>(INITIAL_BOOKS);
  const [journals] = useState<JournalIssue[]>(INITIAL_JOURNALS);

  const [requests, setRequests] = useState<PurchaseRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REQUESTS);
      return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
    } catch {
      return INITIAL_REQUESTS;
    }
  });

  // Default to 'journals' as requested by user to prioritize the newly refined journal theme view
  const [activeTab, setActiveTab] = useState<string>('journals');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isShelfMapOpen, setIsShelfMapOpen] = useState<boolean>(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState<boolean>(false);
  const [isNewRequestOpen, setIsNewRequestOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(requests));
    } catch (e) {
      console.error('Failed to save requests', e);
    }
  }, [requests]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Vote for a request
  const handleVote = (requestId: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          votes: req.votes + 1
        };
      }
      return req;
    }));
    showToast('リクエストへ賛同（+1）しました！');
  };

  // Submit new request
  const handleCreateRequest = (newReqData: Omit<PurchaseRequest, 'id' | 'votes' | 'votedUserIds' | 'status' | 'requestDate'>) => {
    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const newId = `REQ-${today.getFullYear()}-${String(requests.length + 1).padStart(3, '0')}`;

    const newRequest: PurchaseRequest = {
      ...newReqData,
      id: newId,
      requestDate: formattedToday,
      votes: 1,
      votedUserIds: [],
      status: '審議中',
      committeeFeedback: '申請を受理しました。次回の教育委員会にて審議予定です。'
    };

    setRequests(prev => [newRequest, ...prev]);
    showToast('購入希望リクエストを教育委員会へ送信しました！');
    setActiveTab('requests');
  };

  const totalBooks = books.length;

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#24170e] flex flex-col selection:bg-[#e8c872] selection:text-[#2c1b05] font-sans">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#241a15] text-[#f7f2e8] px-4 py-3 rounded-xl shadow-2xl border border-[#c8963e]/40 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200 max-w-md book-spine-gold">
          <CheckCircle2 className="w-5 h-5 text-[#f5cb74] shrink-0" />
          <span className="text-xs sm:text-sm font-medium font-serif-jp">{toastMessage}</span>
        </div>
      )}

      {/* Main Header / Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQrScanner={() => setIsQrScannerOpen(true)}
        onOpenShelfMap={() => setIsShelfMapOpen(true)}
        totalBooks={totalBooks}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Core Vision & Policy Banner */}
        <VisionHero
          onGoToJournals={() => setActiveTab('journals')}
          onGoToSearch={() => setActiveTab('search')}
          onGoToPurchasedBooks={() => setActiveTab('purchased')}
        />

        {/* 1. Journals Tab: Only Journal Name, Issue, and Theme */}
        {activeTab === 'journals' && (
          <JournalSection
            journals={journals}
            onOpenShelfMap={() => setIsShelfMapOpen(true)}
          />
        )}

        {/* 2. Books & Clinical Evidence Search Tab */}
        {activeTab === 'search' && (
          <BookSearchSection
            books={books}
            onSelectBook={(book) => setSelectedBook(book)}
            onOpenQrScanner={() => setIsQrScannerOpen(true)}
            onOpenShelfMap={() => setIsShelfMapOpen(true)}
            onOpenNewRequest={() => setIsNewRequestOpen(true)}
          />
        )}

        {/* 3. Purchased Books Announcement / Introduction Tab */}
        {activeTab === 'purchased' && (
          <PurchasedBooksSection
            books={books}
            onSelectBook={(book) => setSelectedBook(book)}
            onOpenShelfMap={() => setIsShelfMapOpen(true)}
            onOpenNewRequest={() => setIsNewRequestOpen(true)}
          />
        )}

        {/* 4. Purchase Requests Tab */}
        {activeTab === 'requests' && (
          <PurchaseRequestSection
            requests={requests}
            onVote={handleVote}
            onOpenNewRequest={() => setIsNewRequestOpen(true)}
            onOpenShelfMap={() => setIsShelfMapOpen(true)}
          />
        )}

        {/* 5. Policy & Utilization Guidelines Tab */}
        {activeTab === 'policy' && (
          <RulesPolicySection
            onOpenShelfMap={() => setIsShelfMapOpen(true)}
            onOpenQrScanner={() => setIsQrScannerOpen(true)}
          />
        )}
      </main>

      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onOpenShelfMap={() => {
          setSelectedBook(null);
          setIsShelfMapOpen(true);
        }}
      />

      {/* Shelf Map Modal */}
      <ShelfMapModal
        isOpen={isShelfMapOpen}
        onClose={() => setIsShelfMapOpen(false)}
        books={books}
        onSelectBook={(book) => setSelectedBook(book)}
      />

      {/* QR Code Scanner & Simulator Modal */}
      <QrCodeScannerModal
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
        books={books}
        onSelectBook={(book) => setSelectedBook(book)}
      />

      {/* New Purchase Request Modal */}
      <NewRequestModal
        isOpen={isNewRequestOpen}
        onClose={() => setIsNewRequestOpen(false)}
        onSubmit={handleCreateRequest}
      />

      {/* Footer with exact copyright & committee metadata */}
      <Footer
        onOpenShelfMap={() => setIsShelfMapOpen(true)}
        onOpenQrScanner={() => setIsQrScannerOpen(true)}
      />
    </div>
  );
}
