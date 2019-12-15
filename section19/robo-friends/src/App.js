import React, { useState, useEffect } from 'react';
import CardList from './CardList';
import Searchbox from './Searchbox';
import Scroll from './Scroll';
export default function App() {
  const [searchField, setSearchField] = useState('');
  const [robots, setRobots] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        setTimeout(() => {
          setRobots(users);
        }, 2000);
      });
  }, []);
  return (
    <div className="tc">
      <div
        style={{
          height: '20vh',
          boxSizing: 'border-box',
          border: '1px solid black'
        }}
      >
        <h1>RoboFriends</h1>
        <Searchbox searchChange={setSearchField} />
      </div>
      {robots.length === 0 ? (
        <h1>LOADING</h1>
      ) : (
        <Scroll>
          <CardList
            robots={robots.filter(({ name }) =>
              name.toLowerCase().includes(searchField.toLowerCase())
            )}
          />
        </Scroll>
      )}
    </div>
  );
}
