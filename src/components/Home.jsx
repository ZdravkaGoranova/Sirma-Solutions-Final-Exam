import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { loadCSV } from '../utils/csvUtils.js';
import { calculatePoints, getWinner } from '../utils/teamsUtils.js';

import Loading from './Loading.jsx';
import GroupList from './GroupList.jsx';

export default function Home({ teams, setTeams, matches, setMatches }) {
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
          wins: 0,
          draws: 0,
          losses: 0,
          difference: 0,
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
          <GroupList
            groupName="Group A"
            groupTeams={result.A}
            matches={matches}
          />
          <GroupList
            groupName="Group B"
            groupTeams={result.B}
            matches={matches}
          />
          <GroupList
            groupName="Group C"
            groupTeams={result.C}
            matches={matches}
          />
          <GroupList
            groupName="Group D"
            groupTeams={result.D}
            matches={matches}
          />
          <GroupList
            groupName="Group E"
            groupTeams={result.E}
            matches={matches}
          />
          <GroupList
            groupName="Group F"
            groupTeams={result.F}
            matches={matches}
          />
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

Home.propTypes = {
  teams: PropTypes.object.isRequired,
  setTeams: PropTypes.func.isRequired,
  matches: PropTypes.array.isRequired,
  setMatches: PropTypes.func.isRequired,
};
