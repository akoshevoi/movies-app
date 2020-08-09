// @flow
import React from 'react';
import NavBar from '../NavBar/NavBar';
import ClapperboardSvgIcon from '../../assets/icons/ClapperboardSvgIcon';

const Header = () => (
  <header className='header'>
    <div className='container'>
      <div className='header__inner'>
        <div className='header__logo'>
          <div className='header__emblem'>
            <ClapperboardSvgIcon />
          </div>
          <div className='header__badge'>Movie Database</div>
        </div>
        <NavBar />
      </div>
    </div>
  </header>
);

export default Header;
