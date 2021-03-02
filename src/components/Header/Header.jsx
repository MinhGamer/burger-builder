import React from 'react';

import styled from './Header.module.css';

import Navigation from '../Navigation/Navigation';

export default function Header() {
  return (
    <header className={styled.Header}>
      <div>Logo</div>
      <Navigation />
    </header>
  );
}
