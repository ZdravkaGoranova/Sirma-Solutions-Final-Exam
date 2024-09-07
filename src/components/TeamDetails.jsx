// import React, { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { loadCSV } from '../utils/csvUtils.js';

import './TeamDetails.css';


export default function TeamDetails() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await loadCSV('/players.csv');
      setPlayers(data);
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>Team Details</h1>
      <table id="players">
        <thead>
          <tr>
            <th>ID</th>
            <th>TeamNumber</th>
            <th>FullName</th>
            <th>Position</th>
            <th>TeamID</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player.ID}</td>
              <td>{player.TeamNumber}</td>
              <td>{player.FullName}</td>
              <td>{player.Position}</td>
              <td>{player.TeamID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
