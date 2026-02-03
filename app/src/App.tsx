import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Precos } from '@/pages/Precos';
import { Dashboard } from '@/pages/Dashboard';
import { Privacidade } from '@/pages/Privacidade';
import { Revogar } from '@/pages/Revogar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/precos" element={<Precos />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/revogar" element={<Revogar />} />
      </Routes>
    </Router>
  );
}

export default App;
