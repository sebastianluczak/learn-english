import './Dashboard.css';
import {Link} from "react-router-dom";
import React from "react";

function Dashboard() {
  const games = [
    { name: '🇬🇧 Learn English Game', path: '/learn-english' },
    { name: '🧮 Simple Math Game', path: '/simple-math' },
  ];

  return (
    <div className="dashboard">
      <h1>Game Dashboard</h1>
      <ul>
        {games.map((game, index) => (
          <li key={game.name} style={{ '--i': index } as React.CSSProperties}>
            <Link to={game.path}>{game.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
