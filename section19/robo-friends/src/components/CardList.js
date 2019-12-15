import React from 'react';
import Card from './Card';

export default function CardList({ robots }) {
  return (
    <div>
      {robots.map(({ name, id, email }) => (
        <Card name={name} id={id} email={email} />
      ))}
    </div>
  );
}
