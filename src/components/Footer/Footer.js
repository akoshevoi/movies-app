// @flow
import React from 'react';
import GitHubSvgIcon from '../../assets/icons/GitHubSvgIcon';
import LinkedinSvgIcon from '../../assets/icons/LinkedinSvgIcon';

const Footer = () => (
  <footer className='footer'>
    <div className='container'>
      <div className='footer__inner'>
        <div className='footer__author'>2020 Developed by Anton Koshevoi</div>
        <div className='footer__links'>
          <a
            className='footer__link'
            href='https://github.com/akoshevoi'
            rel='noopener noreferrer'
            target='_blank'
          >
            <GitHubSvgIcon />
          </a>
          <a
            className='footer__link'
            href='https://www.linkedin.com/in/a-koshevoi/'
            rel='noopener noreferrer'
            target='_blank'
          >
            <LinkedinSvgIcon />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
