import React from 'react';

import { NavLink } from 'react-router-dom';
import styled from './NavigationItem.module.css';

export default function NavigationItem(props) {
  const { link } = props;
  return (
    <div className={styled.NavigationItem}>
      <NavLink exact={true} activeClassName={styled.active} to={link}>
        {props.children}
      </NavLink>
    </div>
  );
}
