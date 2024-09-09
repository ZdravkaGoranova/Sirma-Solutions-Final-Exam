import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GroupList.css';

export default function GroupList({ groupName, groupTeams }) {
  console.log('Group:', groupName);
  console.log('Teams:', groupTeams);

  const [winner, setWinner] = useState('');

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
            const finalWinner = 0;
            // ...............
            if (finalWinner) {
              setWinner(finalWinner.name);
            } else {
              setWinner('No clear winner');
            }
          }
        }
      }
    }
  }, [groupTeams]);

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
};
