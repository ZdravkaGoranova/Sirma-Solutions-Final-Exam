import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  return (
    <>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/teamDetails">Team Details</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
