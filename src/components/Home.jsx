import { useEffect, useState } from 'react';
import { loadCSV } from '../utils/csvUtils.js';

import Loading from './Loading.jsx';
import GroupList from './GroupList.jsx';

export default function Home() {
  const [teams, setTeams] = useState({});
  const [matches, setMatches] = useState([]);

  const calculatePoints = (matches, teams) => {
    const updatedTeams = { ...teams };

    matches.forEach((match) => {
      const ATeam = updatedTeams[match.ATeamID];
      const BTeam = updatedTeams[match.BTeamID];
      const [aScore, bScore] = match.Score.split('-').map(Number);

      if (aScore > bScore) {
        ATeam.points += 3;
      } else if (bScore > aScore) {
        BTeam.points += 3;
      } else {
        ATeam.points += 1;
        BTeam.points += 1;
      }
    });

    return updatedTeams;
  };

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

      let teamsDetails = teamsData.reduce((acc, team) => {
        acc[team.ID] = {
          id: Number(team.ID),
          name: team.Name,
          group: team.Group,
          points: 0,
        };
        return acc;
      }, {});

      const updatedTeams = calculatePoints(filteredMatches, teamsDetails);

      setMatches(filteredMatches);
      setTeams(updatedTeams);
    }

    fetchData();
  }, []);

  console.log(teams);
  console.log(matches);

  const getWinner = (ATeam, BTeam, score) => {
    const [aScore, bScore] = score.split('-').map(Number);
    return aScore > bScore ? ATeam.name : bScore > aScore ? BTeam.name : 'Draw';
  };

  const teamsArray = Object.values(teams);

  const result = teamsArray.reduce((acc, team) => {
    const group = team.group;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(team);
    return acc;
  }, {});

  console.log(result);
  console.log(result.A);

  if (matches.length === 0 || teamsArray.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <h1>Groups</h1>
        <div className="groups">
          <GroupList groupName="Group A" groupTeams={result.A} />
          <GroupList groupName="Group B" groupTeams={result.B} />
          <GroupList groupName="Group C" groupTeams={result.C} />
          <GroupList groupName="Group D" groupTeams={result.D} />
          <GroupList groupName="Group E" groupTeams={result.E} />
          <GroupList groupName="Group F" groupTeams={result.F} />
        </div>
        <h1>Results of the matches</h1>
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
                    teams[match.ATeamID],
                    teams[match.BTeamID],
                    match.Score,
                  )}
                </td>
                <td>{teams[match.ATeamID].name || 'Unknown'}</td>
                <td>{match.Score}</td>
                <td>{teams[match.BTeamID].name || 'Unknown'}</td>
                <td>{match.Date.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
