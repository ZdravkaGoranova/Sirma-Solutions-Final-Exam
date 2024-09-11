import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { loadCSV } from '../../utils/csvUtils.js';

import './MatchDetails.css';

export default function MatchDetails() {
  const location = useLocation();
  const { aTeam, bTeam, match } = location.state || {};

  console.log('aTeam:', aTeam);
  console.log('bTeam:', bTeam);
  console.log('match:', match);

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

  // console.log('records:', records);
  // console.log('players:', players);

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

  filteredPlayersATeam.forEach((player) => {
    records.forEach((record) => {
      if (player.ID === record.PlayerID) {
        const playTime = record.toMinutes - Number(record.fromMinutes);

        if (!player.matches) {
          player.matches = {};
        }

        player.matches[record.MatchID] = {
          fromMinutes: Number(record.fromMinutes),
          toMinutes: record.toMinutes,
          playTime: playTime,
        };
      }
    });
  });
  console.log('filteredPlayersATeam:', filteredPlayersATeam);

  const playersInMatchATeam = filteredPlayersATeam.filter((player) => {
    return player.matches && player.matches[match.ID];
  });

  console.log(
    'Players of  ATeam,who played  into MACH ID',
    match.ID,
    ':',
    playersInMatchATeam,
  );

  const filteredPlayersBTeam = sortedPlayers.filter(
    (player) => Number(player.TeamID) === bTeam.id,
  );

  filteredPlayersBTeam.forEach((player) => {
    records.forEach((record) => {
      if (player.ID === record.PlayerID) {
        const playTime = record.toMinutes - Number(record.fromMinutes);

        if (!player.matches) {
          player.matches = {};
        }

        player.matches[record.MatchID] = {
          fromMinutes: Number(record.fromMinutes),
          toMinutes: record.toMinutes,
          playTime: playTime,
        };
      }
    });
  });
  console.log('filteredPlayersBTeam:', filteredPlayersBTeam);

  const playersInMatchBTeam = filteredPlayersBTeam.filter((player) => {
    return player.matches && player.matches[match.ID];
  });

  console.log(
    'Players of  BTeam,who played  into MACH ID',
    match.ID,
    ':',
    playersInMatchBTeam,
  );

  return (
    <>
      <h2>Result from Direct duels Group: {aTeam.group}</h2>
      <div className="result">
        <p>
          <strong>Match ID {match.ID}:</strong>
          {aTeam.name} vs {bTeam.name}
        </p>
        <p>
          <strong>Score: </strong>
          <i>{match.Score}</i>
        </p>
      </div>
      <div className="list-players">
        <ol>
          <h2>Players of team {aTeam.name}</h2>
          {playersInMatchATeam.map((player, index) => (
            <li key={index} className="payerInfo">
              {/* <p>FullName: {player.FullName}</p>
              <p> Position: {player.Position}</p>
              <p>PlayTime: {player.matches[match.ID].playTime}</p> */}
              <table id="players">
                <tr>
                  <th>FullName</th>
                  <th>Position</th>
                  <th>PlayTime</th>
                </tr>
                <tr>
                  <td>{player.FullName}</td>
                  <td >
                    {player.Position}
                  </td>
                  <td>{player.matches[match.ID].playTime}</td>
                </tr>
              </table>
            </li>
          ))}
        </ol>
        <ol>
          <h2>Players of team {bTeam.name}</h2>
          {playersInMatchBTeam.map((player, index) => (
            <li key={index} className="payerInfo">
              {/* Position: {player.Position} - FullName: {player.FullName} */}
              <table id="players">
                <tr>
                  <th>FullName</th>
                  <th>Position</th>
                  <th>PlayTime</th>
                </tr>
                <tr>
                  <td>{player.FullName}</td>
                  <td >
                    {player.Position}
                  </td>
                  <td>{player.matches[match.ID].playTime}</td>
                </tr>
              </table>
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
