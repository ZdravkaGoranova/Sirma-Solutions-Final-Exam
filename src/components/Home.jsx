import { useEffect, useState } from 'react';
import { loadCSV } from '../utils/csvUtils.js';

export default function Home() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [teamMap, setTeamMap] = useState({});

  useEffect(() => {
    async function fetchData() {
      const matchesData = await loadCSV('/matches.csv');
      const teamsData = await loadCSV('/teams.csv');

      const parsedMatches = matchesData.map((match) => {
        const [month, day, year] = match.Date.split('/');
        const formattedDate = new Date(`${year}-${month}-${day}`);
        return { ...match, Date: formattedDate };
      });

      const endDate = new Date('2024-06-26');

      const filteredMatches = parsedMatches.filter(
        (match) => match.Date <= endDate,
      );

      const map = teamsData.reduce((acc, team) => {
        acc[team.ID] = team.Name;
        return acc;
      }, {});

      setMatches(filteredMatches);
      setTeams(teamsData);
      setTeamMap(map);
    }

    fetchData();
  }, []);

  const getWinner = (ATeamID, BTeamID, score) => {
    const [aScore, bScore] = score.split('-').map(Number);
    if (aScore > bScore) return ATeamID;
    if (bScore > aScore) return BTeamID;
    return 'Draw';
  };

  return (
    <>
      <h1>Home Page</h1>
      <div>
        <h1>Matches</h1>

        <table id="players">
          <thead>
            <tr>
              <th>Winner</th>
              <th>ATeamID</th>
              <th>Score</th>
              <th>BTeamID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index}>
                <td>
                  {getWinner(
                    teamMap[match.ATeamID],
                    teamMap[match.BTeamID],
                    match.Score,
                  )}
                </td>
                <td>{teamMap[match.ATeamID] || 'Unknown'}</td>
                <td>{match.Score}</td>
                <td>{teamMap[match.BTeamID] || 'Unknown'}</td>
                <td>{match.Date.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
