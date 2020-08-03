// @flow
import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSingleMovieForPreviewAndExplicitInfo } from '../../actions/actions';
import SignOut from '../SignOut/SignOut';
import * as ROUTES from '../../constants/routes';
import ClapperboardSvgIcon from '../../assets/icons/ClapperboardSvgIcon';
import ModalRegistration from '../ModalRegistration/ModalRegistration';
import DatabaseSvgIcon from '../../assets/icons/DatabaseSvgIcon';
import HomePageSvgIcon from '../../assets/icons/HomePageSvgIcon';
import UserSvgIcon from '../../assets/icons/UserSvgIcon';

const Header = ({ authUser, getSingleMovieForPreviewAndExplicitInfo }) => {
  let history = useHistory();

  const goToHomePage = () => {
    getSingleMovieForPreviewAndExplicitInfo({});
    history.push(ROUTES.HOME);
  };

  const goToUserInfo = () => {
    history.push(ROUTES.ACCOUNT);
  };

  const goToStorageFavouritesMovies = () => {
    history.push(ROUTES.STORAGE_FAVOURITES_MOVIES);
  };

  return (
    <header className='header'>
      <div className='container  container--header'>
        <div className='header__inner'>
          <div className='header__logo'>
            <div className='header__emblem'>
              <ClapperboardSvgIcon />
            </div>
            <div className='header__badge'>Movie Database</div>
          </div>
          <div className='header__profile'>
            {authUser && (
              <div className='header__welcome'>
                <span className='header__greeting'>Hi,</span>
                <span className='header__username'>
                  {authUser.username}
                  {authUser.provider && authUser.provider[0].displayName}
                </span>
              </div>
            )}
            {authUser && (
              <div
                title='View the user info and change password'
                className='header__user'
                onClick={goToUserInfo}
              >
                <UserSvgIcon />
              </div>
            )}
            {authUser && (
              <div
                className='header__database'
                onClick={goToStorageFavouritesMovies}
                title='View the storage of favourites movies'
              >
                <DatabaseSvgIcon />
              </div>
            )}
            <div
              className='header__homepage'
              onClick={goToHomePage}
              title='Back to HomePage'
            >
              <HomePageSvgIcon />
            </div>
            <ModalRegistration />
            <SignOut />
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
  getSingleMovieForPreviewAndExplicitInfo: movie =>
    dispatch(getSingleMovieForPreviewAndExplicitInfo(movie))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
