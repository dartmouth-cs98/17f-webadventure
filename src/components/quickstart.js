import React from 'react';

const generateId = () => {
  const id = Math.floor(Math.random() * 100000);
  const username = `user${id}`;
  return username;
};

const Quickstart = () => {
  return <button className="colorful-button">Quickstart!</button>;
};

export {
  Quickstart,
  generateId,
};
