import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import { setSearchField } from '../action';

const mapStateToProps = state => ({ searchField: state.searchField });
const mapDispatchToProps = dispatch => ({
  onSearchChange: event => dispatch(setSearchField(event.target.value))
});
function App(props) {
  const { searchField, onSearchChange } = props;
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
        <Searchbox searchChange={onSearchChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
