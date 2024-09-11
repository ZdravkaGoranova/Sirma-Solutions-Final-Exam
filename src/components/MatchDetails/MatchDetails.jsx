import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { loadCSV } from '../../utils/csvUtils.js';

import './MatchDetails.css';

export default function MatchDetails() {
  const location = useLocation();
  const { aTeam, bTeam, match } = location.state || {};

  console.log(aTeam);

  console.log(bTeam);
  console.log(match);

  const [players, setPlayers] = useState([]);
  // const [aTeam, setATeam] = useState([]);
  // const [bTeam, setBTeam] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    async function fetchData() {
      const data = await loadCSV('/players.csv');
      setPlayers(data);
    }
    fetchData();
  }, []);

  const sortedPlayers = [...players].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key].toString().toLowerCase();
      const bValue = b[sortConfig.key].toString().toLowerCase();

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });
  // console.log(sortedPlayers);

  const filteredPlayersATeam = sortedPlayers.filter(
    (player) => Number(player.TeamID) === aTeam.id,
  );
  console.log(filteredPlayersATeam);

  const filteredPlayersBTeam = sortedPlayers.filter(
    (player) => Number(player.TeamID) === bTeam.id,
  );
  console.log(filteredPlayersBTeam);

  return (
    <>
      <h2>Result from Direct duels Group: {aTeam.group}</h2>
      <div className="result">
        <p>
          <strong>Match:</strong> {aTeam.name} vs {bTeam.name}
        </p>
        <p>
          <strong>Score: </strong>
          <i>{match.Score}</i>
        </p>
      </div>
      <div className="list-players">
        <ol>
          <h2>Players of team {aTeam.name}</h2>
          {filteredPlayersATeam.map((player, index) => (
            <li key={index} className="payerInfo">
              Position: {player.Position} - FullName: {player.FullName}
            </li>
          ))}
        </ol>
        <ol>
          <h2>Players of team {bTeam.name}</h2>
          {filteredPlayersBTeam.map((player, index) => (
            <li key={index} className="payerInfo">
              Position: {player.Position} - FullName: {player.FullName}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

// MatchDetails.propTypes = {
//   aTeam: PropTypes.object.isRequired,
//   bTeam: PropTypes.object.isRequired,
//   match: PropTypes.object.isRequired,
// };
