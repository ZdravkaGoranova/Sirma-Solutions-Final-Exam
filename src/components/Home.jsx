import { useEffect, useState } from 'react';
import { loadCSV } from '../utils/csvUtils.js';

import Loading from './Loading.jsx';
import GroupList from './GroupList.jsx';

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

      let teamsDetails = teamsData.reduce((acc, team) => {
        acc[team.ID] = {
          id: Number(team.ID),
          name: team.Name,
          group: team.Group,
          points: 0,
        };
        return acc;
      }, {});

      setMatches(filteredMatches);
      setTeams(teamsDetails);
      setTeamMap(teamsDetails);
    }

    fetchData();
  }, []);

  console.log(teamMap);
  console.log(matches);

  const calculatePoints = () => {
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

    console.log(updatedTeams);
    return updatedTeams;
  };

  useEffect(() => {
    if (matches.length > 0 && Object.keys(teamMap).length > 0) {
      const updatedTeams = calculatePoints();
      if (JSON.stringify(updatedTeams) !== JSON.stringify(teams)) {
        setTeams(updatedTeams);
        setTeamMap(updatedTeams);
      }
    }
  }, [matches, teamMap]);

  const getWinner = (ATeam, BTeam, score) => {
    const [aScore, bScore] = score.split('-').map(Number);
    return aScore > bScore ? ATeam.name : bScore > aScore ? BTeam.name : 'Draw';
  };

  const teamsArray = Object.values(teams);
  const result = Object.groupBy(teamsArray, ({ group }) => group);

  console.log(result);
  console.log(result.A);

  return (
    <>
      <div>
        <h1>Groups</h1>
        {teams.length <= 0 ? (
          <Loading />
        ) : (
          <div className="groups">
            <GroupList groupName="Group A" groupTeams={result.A} />
            <GroupList groupName="Group B" groupTeams={result.B} />
            <GroupList groupName="Group C" groupTeams={result.C} />
            <GroupList groupName="Group D" groupTeams={result.D} />
            <GroupList groupName="Group E" groupTeams={result.E} />
            <GroupList groupName="Group F" groupTeams={result.F} />
          </div>
        )}
        <h1>Results of the matches</h1>
        {matches.length <= 0 ? (
          <Loading />
        ) : (
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
                  <td>{teamMap[match.ATeamID].name || 'Unknown'}</td>
                  <td>{match.Score}</td>
                  <td>{teamMap[match.BTeamID].name || 'Unknown'}</td>
                  <td>{match.Date.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
