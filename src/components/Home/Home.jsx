import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Home.css';

import { loadCSV } from '../../utils/csvUtils.js';
import { calculatePoints, getWinner } from '../../utils/teamsUtils.js';
import {
  fieldsValidation,
  scoreValidation,
  idValidation,
  aTeamIDValidation,
  bTeamIDValidation,
  dateIDValidation,
} from '../../utils/fildsValidations.js';

import Loading from '../Loading/Loading.jsx';
import GroupList from '../GroupList/GroupList.jsx';

export default function Home({ teams, setTeams, matches, setMatches }) {
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const matchesData = await loadCSV('/matches.csv');
        const teamsData = await loadCSV('/teams.csv');

        console.log(matchesData);

        const hasFieldsMatches = matchesData.map((mach) => Object.keys(mach));

        try {
          fieldsValidation(hasFieldsMatches);
        } catch (err) {
          setError('Fields validation failed: ' + err.message);
          return;
        }

        try {
          scoreValidation(matchesData);
        } catch (err) {
          setError('Score validation failed: ' + err.message);
          return;
        }

        try {
          idValidation(matchesData);
        } catch (err) {
          setError('ID validation failed: ' + err.message);
          return;
        }

        try {
          aTeamIDValidation(matchesData);
        } catch (err) {
          setError('ATeamID validation failed: ' + err.message);
          return;
        }

        try {
          bTeamIDValidation(matchesData);
        } catch (err) {
          setError('BTeamID validation failed: ' + err.message);
          return;
        }

        try {
          dateIDValidation(matchesData);
        } catch (err) {
          setError('Date validation failed: ' + err.message);
          return;
        }

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
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while loading data.');
      }
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

  return (
    <>
      {error ? (
        <div>
          <h1>Home</h1>
          <h3 className="error">Error: {error}</h3>
        </div>
      ) : (
        <div>
          <h1>Groups</h1>

          {matches.length === 0 || teamsArray.length === 0 ? (
            <Loading />
          ) : (
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
          )}
          <h1>Results of the matches</h1>

          {matches.length === 0 || teamsArray.length === 0 ? (
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
          )}
        </div>
      )}
    </>
  );
}

Home.propTypes = {
  teams: PropTypes.object.isRequired,
  setTeams: PropTypes.func.isRequired,
  matches: PropTypes.array.isRequired,
  setMatches: PropTypes.func.isRequired,
};
