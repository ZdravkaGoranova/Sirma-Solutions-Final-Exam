// import { useState } from 'react'

import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import MatchDetails from './components/MatchDetails.jsx';
import TeamDetails from './components/TeamDetails.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {' '}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matchDetails" element={<MatchDetails />} />
          <Route path="/teamDetails" element={<TeamDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
