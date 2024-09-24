import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="logo">
          <span className="icon fa-gem"></span>
          <h1>Traffic</h1>
        </Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/Login">Login</Link></li>
          <li><Link to="/book">Book</Link></li>
          <li><Link to="/googlemaps">Google Maps</Link></li>
          <li><Link to="/PlannerPage">Planner Page</Link></li>
          <li><Link to="/DateRangePicker">Date Range Picker</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
