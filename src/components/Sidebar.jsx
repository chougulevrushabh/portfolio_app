import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>CapitalMind</h2>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          Portfolio
        </NavLink>
        <NavLink to="/chart" className={({ isActive }) => isActive ? 'active' : ''}>
          Chart
        </NavLink>
      </nav>
    </div>
  );
}

