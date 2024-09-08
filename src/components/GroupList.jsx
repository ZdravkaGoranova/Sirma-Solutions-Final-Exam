import PropTypes from 'prop-types';
import './GroupList.css';

export default function GroupList({ groupName, groupTeams }) {
  return (
    <div className="columns">
      <ul className="group">
        <li className="groupName">{groupName}</li>
        <li className="winner">Winner: ....</li>
        {groupTeams.map((team, index) => (
          <li key={index}>{team}</li>
        ))}
      </ul>
    </div>
  );
}

GroupList.propTypes = {
  groupName: PropTypes.string.isRequired,
  groupTeams: PropTypes.arrayOf(PropTypes.string).isRequired,
};
