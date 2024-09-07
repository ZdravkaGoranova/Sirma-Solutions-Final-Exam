// import React, { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { loadCSV } from '../utils/csvUtils.js';
import './TeamDetails.css';

export default function TeamDetails() {
  const [players, setPlayers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('All');

  useEffect(() => {
    async function fetchData() {
      const data = await loadCSV('/players.csv');
      setPlayers(data);
      console.log(data);
    }

    fetchData();
  }, []);

  const handlePositionChange = (event) => {
    setSelectedPosition(event.target.value);
  };

  const filteredPlayers = players.filter((player) =>
    selectedPosition === 'All' ? true : player.Position === selectedPosition,
  );

  return (
    <>
      <div className="players-list">
        <h1>Team Details</h1>

        {players.length <= 0 ? (
          <div>
            <h4>Loading data</h4>
            <div className="loader"></div>
          </div>
        ) : (
          <div>
            <div className="positionFilter">
              <label htmlFor="positionFilter">Filter by Position: </label>
              <select
                id="positionFilter"
                value={selectedPosition}
                onChange={handlePositionChange}
              >
                <option value="All">ALL</option>
                <option value="GK">GOALKEEPER (GK)</option>
                <option value="DF">DEFENDER (DF)</option>
                <option value="MF">MIDFIELDER (MF)</option>
                <option value="FW">FORWARD (FW)</option>
              </select>
            </div>

            <table id="players">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>TeamNumber</th>
                  <th>FullName</th>
                  <th>Position</th>
                  <th>TeamID</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map((player, index) => (
                  <tr key={index}>
                    {/* <td>{player.ID}</td> */}
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
