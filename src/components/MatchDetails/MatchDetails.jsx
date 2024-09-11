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
  const [records, setRecords] = useState([]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    async function fetchData() {
      const data = await loadCSV('/players.csv');
      setPlayers(data);
      const dataRecord = await loadCSV('/records.csv');
      setRecords(dataRecord);
    }
    fetchData();
  }, []);

  records.forEach((record) => {
    if (record.toMinutes === 'NULL') {
      record.toMinutes = 90;
    }
  });
  console.log(records);
  console.log(players);

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

  const playerPlayTimesForMatchID = {};
  console.log(records);

  filteredPlayersATeam.forEach((player) => {
   
    debugger;
    records.forEach((record) => {
      if (player.ID === record.PlayerID) {
        const playTime = record.toMinutes - Number(record.fromMinutes);

        if (filteredPlayersATeam[player.ID]) {
          playerPlayTimesForMatchID[player.FullName][record.matchID] = {
            fromMinutes: Number(record.fromMinutes),
            toMinutes: record.toMinutes,
            playTime: playTime,
          };
        }
      }
    });
  });

  // records.forEach((record) => {
  //   if (record.toMinutes === 'NULL') {
  //     record.toMinutes = 90;
  //   }

  //   const player = players.find((p) => p.ID === record.PlayerID);
  //   if (!player) return;
  //   const matchID = record.MatchID;
  //   const playTime = record.toMinutes - Number(record.fromMinutes);

  //   debugger;
  //   if (!playerPlayTimesForMatchID[player.FullName]) {
  //     playerPlayTimesForMatchID[player.FullName] = {
  //       FullName: player.FullName,
  //       ID: Number(player.ID),
  //       Position: player.Position,
  //       TeamID: Number(player.TeamID),
  //       TeamNumber: Number(player.TeamNumber),
  //     };
  //   }
  //   if (!playerPlayTimesForMatchID[player.FullName][matchID]) {
  //     playerPlayTimesForMatchID[player.FullName][matchID] = {
  //       fromMinutes: Number(record.fromMinutes),
  //       toMinutes: record.toMinutes,
  //       playTime: playTime,
  //     };
  //   }
  // });
  // console.log(playerPlayTimesForMatchID);

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
