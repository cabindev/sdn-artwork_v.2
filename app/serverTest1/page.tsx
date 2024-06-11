'use client'
import React from 'react';
import Page from '../serverTest/page';


export default function ParentComponent() {
  const handleMessageClick = () => {
    console.log('Button was clicked!');
  };

  return (
    <div>
      <Page onMessageClick={handleMessageClick} />
    </div>
  );
}
