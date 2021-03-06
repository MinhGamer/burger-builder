import React from 'react';

import styled from './Navigation.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

export default function Navigation() {
  return (
    <nav className={styled.Navigation}>
      <NavigationItem link='/'>My Burger</NavigationItem>
      <NavigationItem link='/contact-form'>Check out</NavigationItem>
      <NavigationItem link='/history-orders'>Orders</NavigationItem>
    </nav>
  );
}
