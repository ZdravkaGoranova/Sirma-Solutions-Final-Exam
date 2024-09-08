import { useEffect, useState } from 'react';
import { loadCSV } from '../utils/csvUtils.js';

import './TeamDetails.css';
import Loading from './Loading.jsx';

export default function TeamDetails() {
  const [players, setPlayers] = useState([]);
  const [selectedTeamID, setSelectedTeamID] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    async function fetchData() {
      const data = await loadCSV('/players.csv');
      setPlayers(data);
    }
    fetchData();
  }, []);

  const uniqueTeamIDs = [...new Set(players.map((player) => player.TeamID))];

  const handleTeamIDChange = (event) => {
    setSelectedTeamID(event.target.value);
  };

  const sortedPlayers = [...players].sort((a, b) => {
    debugger
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
      <div className="players-list">
        <h1>Team Details</h1>

        {players.length <= 0 ? (
          // <div>
          //   <h4>Loading data</h4>
          //   <div className="loader"></div>
          // </div>
          <Loading/>
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
                  <th >FullName</th>
                  <th onClick={() => handleSort('Position')}>Position</th>
                  <th>TeamID</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map((player, index) => (
                  <tr key={index}>
                    <td>{player.TeamNumber}</td>
                    <td>{player.FullName}</td>
                    <td className={`position ${player.Position.toLowerCase()}`}>
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
    </>
  );
}
