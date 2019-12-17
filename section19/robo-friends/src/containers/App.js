import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import { setSearchField, requestRobots } from '../action';

const mapStateToProps = state => ({
  searchField: state.searchRobots.searchField,
  robots: state.requestRobots.robots,
  isPending: state.requestRobots.isPending,
  error: state.requestRobots.error
});
const mapDispatchToProps = dispatch => ({
  onSearchChange: event => dispatch(setSearchField(event.target.value)),
  onRequestRobots: () => dispatch(requestRobots())
});
function App(props) {
  const {
    searchField,
    onSearchChange,
    robots,
    isPending,
    error,
    onRequestRobots
  } = props;
  useEffect(() => {
    onRequestRobots();
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
      {error.length !== 0 ? (
        <h1>{error.toString()}</h1>
      ) : isPending ? (
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
