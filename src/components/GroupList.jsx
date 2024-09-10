import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GroupList.css';

export default function GroupList({ groupName, groupTeams, matches }) {
  const [winner, setWinner] = useState('');

  // console.log(matches);

  useEffect(() => {
    if (groupTeams.length > 0) {
      const sortedTeams = [...groupTeams].sort((a, b) => b.points - a.points);

      const highestPoints = sortedTeams[0].points;

      const topTeams = sortedTeams.filter(
        (team) => team.points === highestPoints,
      );

      if (topTeams.length === 1) {
        setWinner(topTeams[0].name);
      } else {
        //1.sort by   difference;
        topTeams.sort((a, b) => b.difference - a.difference);

        const bestGoalDifference = topTeams[0].difference;

        const teamsWithBestGoalDifference = topTeams.filter(
          (team) => team.difference === bestGoalDifference,
        );

        if (teamsWithBestGoalDifference.length === 1) {
          setWinner(teamsWithBestGoalDifference[0].name);
        } else {
          // 2. sort by wins

          teamsWithBestGoalDifference.sort((a, b) => b.wins - a.wins);

          const bestGoalWins = teamsWithBestGoalDifference[0].wins;

          const teamsWithBestGoalsWins = teamsWithBestGoalDifference.filter(
            (team) => team.wins === bestGoalWins,
          );

          if (teamsWithBestGoalsWins.length === 1) {
            setWinner(teamsWithBestGoalsWins[0].name);
          } else {
            // 3. result from Direct duels
            const ATeamID = teamsWithBestGoalDifference[0].id;
            const BTeamID = teamsWithBestGoalDifference[1].id;
            const directMatch = matches.find(
              (match) =>
                (Number(match.ATeamID) === ATeamID &&
                  Number(match.BTeamID) === BTeamID) ||
                (Number(match.ATeamID) === BTeamID &&
                  Number(match.BTeamID) === ATeamID),
            );
            console.log(directMatch);
            if (directMatch) {
              const [aScore, bScore] = directMatch.Score.split('-').map(Number);
              if (Number(directMatch.ATeamID) === ATeamID) {
                if (aScore > bScore) {
                  setWinner(teamsWithBestGoalsWins[0].name);
                } else if (bScore > aScore) {
                  setWinner(teamsWithBestGoalsWins[1].name);
                } else {
                  setWinner('Draw');
                }
              } else {
                if (aScore > bScore) {
                  setWinner(teamsWithBestGoalsWins[1].name);
                } else if (bScore > aScore) {
                  setWinner(teamsWithBestGoalsWins[0].name);
                } else {
                  setWinner('Draw');
                }
              }
            } else {
              setWinner('No clear winner');
            }
          }
        }
      }
    }
  }, [groupTeams, matches]);

  return (
    <div className="card">
      <ul className="group">
        <li className="groupName">{groupName}</li>
        <li className="winner">Winner: {winner}</li>
        {groupTeams.map((team, index) => (
          <li key={index} className="teamName">
            {team.name}
            <p className="details">
              points:{team.points}; wins: {team.wins}, draws:
              {team.draws}, losses: {team.losses}, difference: {team.difference}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

GroupList.propTypes = {
  groupName: PropTypes.string.isRequired,
  groupTeams: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,

      wins: PropTypes.number.isRequired,
      draws: PropTypes.number.isRequired,
      losses: PropTypes.number.isRequired,
      difference: PropTypes.number.isRequired,
    }),
  ).isRequired,

  matches: PropTypes.array.isRequired,
};
