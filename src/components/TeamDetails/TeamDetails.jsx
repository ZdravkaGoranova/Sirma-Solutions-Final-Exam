import { useEffect, useState } from 'react';
import { loadCSV } from '../../utils/csvUtils.js';

import './TeamDetails.css';
import Loading from '../Loading/Loading.jsx';

import {
  fieldsValidationPlayers,
  idValidationPlayer,
  idValidationTeamNumber,
  idValidationTeamID,
  positionValidation,
} from '../../utils/playersValidations.js';

export default function TeamDetails() {
  const [players, setPlayers] = useState([]);
  const [selectedTeamID, setSelectedTeamID] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await loadCSV('/players.csv');
        setPlayers(data);
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
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while loading data.');
      }
    }
    fetchData();
  }, []);

  const uniqueTeamIDs = [...new Set(players.map((player) => player.TeamID))];

  const handleTeamIDChange = (event) => {
    setSelectedTeamID(event.target.value);
  };

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

  const filteredPlayers = sortedPlayers.filter((player) =>
    selectedTeamID === 'All' ? true : player.TeamID === selectedTeamID,
  );

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      {error ? (
        <div>
          <h1>Team Details</h1>
          <h3 className="error">Error: {error}</h3>
        </div>
      ) : (
        <div className="players-list">
          <h1>Team Details</h1>

          {players.length <= 0 ? (
            <Loading />
          ) : (
            <div>
              <div className="teamIDFilter">
                <label htmlFor="teamIDFilter">Filter by TeamID: </label>
                <select
                  id="teamIDFilter"
                  value={selectedTeamID}
                  onChange={handleTeamIDChange}
                >
                  <option value="All">ALL</option>
                  {uniqueTeamIDs.map((teamID, index) => (
                    <option key={index} value={teamID}>
                      {teamID}
                    </option>
                  ))}
                </select>
              </div>

              <table id="players">
                <thead>
                  <tr>
                    <th>TeamNumber</th>
                    <th>FullName</th>
                    <th onClick={() => handleSort('Position')}>Position</th>
                    <th>TeamID</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlayers.map((player, index) => (
                    <tr key={index}>
                      <td>{player.TeamNumber}</td>
                      <td>{player.FullName}</td>
                      <td
                        className={`position ${player.Position.toLowerCase()}`}
                      >
                        {player.Position}
                      </td>
                      <td>{player.TeamID}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
}
