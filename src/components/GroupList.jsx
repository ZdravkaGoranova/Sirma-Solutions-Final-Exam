import PropTypes from 'prop-types';
import './GroupList.css';

export default function GroupList({ groupName, groupTeams }) {
  console.log(groupName);
  console.log(groupTeams);
  return (
    <div className="card">
      <ul className="group">
        <li className="groupName">{groupName}</li>
        <li className="winner">Winner: ...!!!</li>
        {groupTeams.map((team, index) => (
          <li key={index}>
            {team.name} - {team.points} points
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
    }),
  ).isRequired,
};
