import React from 'react';

export default function Scroll({ children }) {
  return (
    <div
      style={{
        overflowY: 'scroll',
        height: '80vh',
        boxSizing: 'border-box',
        border: '1px solid black'
      }}
    >
      {children}
    </div>
  );
}
