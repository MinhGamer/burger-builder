import React from 'react';
import { Link } from 'react-router-dom';

import styled from './Header.module.css';

import Logo from '../../assets/image/burger-logo.png';
import Navigation from '../Navigation/Navigation';

export default function Header() {
  return (
    <header className={styled.Header}>
      <Link to='/'>
        <img className={styled.Logo} src={Logo} alt='logo' />
      </Link>
      <Navigation />
    </header>
  );
}
