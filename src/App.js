import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function AppContent() {
  return (
    <Router>
      <Navigation />
      <main className="...">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
          <Route path="/books/:id/review" element={<ReviewFormPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
      </main>
    </Router>
  );
}
