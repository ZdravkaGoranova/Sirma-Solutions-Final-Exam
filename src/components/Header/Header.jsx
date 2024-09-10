import './Header.css';
import Navigation from '../Navigation/Navigation.jsx';

export default function Header() {
  return (
    <>
      <header>
        <Navigation/>
        <div className="hero-image"></div>
      </header>
    </>
  );
}
