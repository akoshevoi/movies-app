// @flow
import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSingleMovieForPreviewAndExplicitInfo } from '../../actions/actions';
import SignOut from '../SignOut/SignOut';
import * as ROUTES from '../../constants/routes';
import ModalRegistration from '../ModalRegistration/ModalRegistration';
import DatabaseSvgIcon from '../../assets/icons/DatabaseSvgIcon';
import HomePageSvgIcon from '../../assets/icons/HomePageSvgIcon';
import UserSvgIcon from '../../assets/icons/UserSvgIcon';

const NavBar = ({ authUser, getSingleMovieForPreviewAndExplicitInfo }) => {
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
    <div className='navbar'>
      {authUser && (
        <div className='navbar__welcome'>
          <span className='navbar__greeting'>Hi,</span>
          <span className='navbar__username'>
            {authUser.username}
            {authUser.provider && authUser.provider[0].displayName}
          </span>
        </div>
      )}
      {authUser && (
        <div
          title='View the user info and change password'
          className='navbar__user'
          onClick={goToUserInfo}
        >
          <UserSvgIcon />
        </div>
      )}
      {authUser && (
        <div
          className='navbar__database'
          onClick={goToStorageFavouritesMovies}
          title='View the storage of favourites movies'
        >
          <DatabaseSvgIcon />
        </div>
      )}
      <div
        className='navbar__homepage'
        onClick={goToHomePage}
        title='Back to HomePage'
      >
        <HomePageSvgIcon />
      </div>
      <ModalRegistration />
      <SignOut />
    </div>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
  getSingleMovieForPreviewAndExplicitInfo: movie =>
    dispatch(getSingleMovieForPreviewAndExplicitInfo(movie))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
