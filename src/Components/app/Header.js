import React from 'react';
import '../router/Router';

const Header = () => {
  return (
    <header id="header">
      <div className="logo">
        <span className="icon fa-gem"></span>
      </div>
      <div className="content">
        <div className="inner">
          <h1>Traffic</h1>
        </div>
      </div>
      <nav>
        <ul>
          <li><a href="/Login">Login</a></li>
          <li><a href="/book">Book</a></li>
          <li><a href="/googlemaps">googlemaps</a></li>
          <li><a href="/PlannerPage">PlannerPage</a></li>
          {/* Uncomment if needed: <li><a href="#elements">Elements</a></li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
