import React from 'react';

export default function Searchbox({ searchChange }) {
  return (
    <input
      type="search"
      placeholder="search robot names"
      onChange={event => searchChange(event.target.value)}
    />
  );
}
