import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { SmoothScroll } from './components/SmoothScroll';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import InitialLoader from './components/InitialLoader';
import { AnimatedCursor } from './components/AnimatedCursor';

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

function AppRouter() {
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
  if (!validRoutes.includes(location.pathname)) {
    return <NotFoundPage />;
  }

  return (
    <SmoothScroll>
      <AppContent />
    </SmoothScroll>
  );
}

export function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <BrowserRouter>
      <AnimatedCursor />
      {showLoader && <InitialLoader onComplete={() => setShowLoader(false)} />}
      <ScrollToTop />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
