import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { loadCSV } from '../../utils/csvUtils.js';

import './MatchDetails.css';

import {
  fieldsValidationPlayers,
  idValidationPlayer,
  idValidationTeamNumber,
  idValidationTeamID,
  positionValidation,
} from '../../utils/playersValidations.js';
import {
  fieldsValidationRecords,
  idValidationRecords,
  playerIDValidationRecords,
  matchIDValidationRecords,
  fromMinutesValidationRecords,
  toMinutesValidationRecords,
} from '../../utils/recordValidations.js';

export default function MatchDetails() {
  const location = useLocation();
  const { aTeam, bTeam, match } = location.state || {};

  console.log('aTeam:', aTeam);
  console.log('bTeam:', bTeam);
  console.log('match:', match);

  const [players, setPlayers] = useState([]);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await loadCSV('/players.csv');
        setPlayers(data);
        const dataRecord = await loadCSV('/records.csv');
        setRecords(dataRecord);

        try {
          fieldsValidationPlayers(data);
        } catch (err) {
          setError('Name validation failed into teams file: ' + err.message);
          return;
        }
        try {
          idValidationPlayer(data);
        } catch (err) {
          setError('ID validation failed: ' + err.message);
          return;
        }
        try {
          idValidationTeamNumber(data);
        } catch (err) {
          setError('TeamNumber validation failed: ' + err.message);
          return;
        }
        try {
          idValidationTeamID(data);
        } catch (err) {
          setError('TeamID validation failed: ' + err.message);
          return;
        }
        try {
          positionValidation(data);
        } catch (err) {
          setError('Position validation  failed: ' + err.message);
          return;
        }
        try {
          fieldsValidationRecords(dataRecord);
        } catch (err) {
          setError('Name validation failed into  records: ' + err.message);
          return;
        }

        try {
          idValidationRecords(dataRecord);
        } catch (err) {
          setError('Name validation failed into  records: ' + err.message);
          return;
        }

        try {
          playerIDValidationRecords(dataRecord);
        } catch (err) {
          setError('Name validation failed into  records: ' + err.message);
          return;
        }

        try {
          matchIDValidationRecords(dataRecord);
        } catch (err) {
          setError('Name validation failed into  records: ' + err.message);
          return;
        }

        try {
          fromMinutesValidationRecords(dataRecord);
        } catch (err) {
          setError('Name validation failed into  records: ' + err.message);
          return;
        }

        try {
          toMinutesValidationRecords(dataRecord);
        } catch (err) {
          setError('Name validation failed into  records: ' + err.message);
          return;
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while loading data.');
      }
    }
    fetchData();
  }, []);

  records.forEach((record) => {
    if (record.toMinutes === 'NULL') {
      record.toMinutes = 90;
    }
  });

  console.log('records:', records);
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
      {error ? (
        <div>
          <h1>Team Details</h1>
          <h3 className="error">Error: {error}</h3>
        </div>
      ) : (
        <div>
          <h2>Result from Direct duels Group: {aTeam.group}</h2>
          <div className="result">
            <p>
              <strong>Match ID {match.ID}:</strong>
            </p>
            <p>
              <strong>
                {aTeam.name} vs {bTeam.name}
              </strong>
            </p>
            <p>
              <strong>
                Score:
                <i>{match.Score}</i>
              </strong>
            </p>
          </div>
          <div className="list-players">
            <ol>
              <h2>Players of team {aTeam.name}</h2>
              {playersInMatchATeam.map((player, index) => (
                <li key={index} className="payerInfo">
                  <table id="players">
                    <thead>
                      <tr>
                        <th>FullName</th>
                        <th>Position</th>
                        <th>PlayTime</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{player.FullName}</td>
                        <td>{player.Position}</td>
                        <td>{player.matches[match.ID].playTime}</td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              ))}
            </ol>
            <ol>
              <h2>Players of team {bTeam.name}</h2>
              {playersInMatchBTeam.map((player, index) => (
                <li key={index} className="payerInfo">
                  <table id="players">
                    <thead>
                      <tr>
                        <th>FullName</th>
                        <th>Position</th>
                        <th>PlayTime</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{player.FullName}</td>
                        <td>{player.Position}</td>
                        <td>{player.matches[match.ID].playTime}</td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}

// MatchDetails.propTypes = {
//   aTeam: PropTypes.object.isRequired,
//   bTeam: PropTypes.object.isRequired,
//   match: PropTypes.object.isRequired,
// };
