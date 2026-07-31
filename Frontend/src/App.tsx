import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import InitialLoader from './components/InitialLoader';

import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { AutomationPage } from './pages/AutomationPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppContent() {
  const location = useLocation();

  const validRoutes = [
    '/',
    '/about',
    '/projects',
    '/experience',
    '/automation',
    '/achievements',
    '/contact',
  ];
  const is404 = !validRoutes.includes(location.pathname);

  if (is404) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      {/* Persistent Sticky Navbar */}
      <Navbar />

      {/* Dynamic Route Pages */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/automation" element={<AutomationPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <BrowserRouter>
      {showLoader && <InitialLoader onComplete={() => setShowLoader(false)} />}
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
