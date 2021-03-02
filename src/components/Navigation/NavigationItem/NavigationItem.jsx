import React from 'react';

import { Link } from 'react-router-dom';
import styled from './NavigationItem.module.css';

export default function NavigationItem(props) {
  const { link } = props;
  return (
    <div className={styled.NavigationItem}>
      <Link to={link}>{props.children}</Link>
    </div>
  );
}
