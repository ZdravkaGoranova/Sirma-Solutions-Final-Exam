import { useState } from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import MatchDetails from './components/MatchDetails/MatchDetails.jsx';
import TeamDetails from './components/TeamDetails/TeamDetails.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';

function App() {
  const [teams, setTeams] = useState({});
  const [matches, setMatches] = useState([]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                teams={teams}
                setTeams={setTeams}
                matches={matches}
                setMatches={setMatches}
              />
            }
          />
          <Route path="/matchDetails" element={<MatchDetails />} />
          <Route path="/teamDetails" element={<TeamDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
