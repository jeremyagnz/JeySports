import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PlayersPage from './pages/PlayersPage';
import TeamsPage from './pages/TeamsPage';
import SchedulePage from './pages/SchedulePage';
import StandingsPage from './pages/StandingsPage';
import AdminPage from './pages/AdminPage';
import './styles/globals.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/standings" element={<StandingsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
