// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  fetchBriefDataMovies,
  sendingRequest,
  typingInSearchMovieInput,
  getMoviesArrayForResultList
} from '../../actions/actions';
import * as API from '../../constants/api';
import SearchSvgIcon from '../../assets/icons/SearchSvgIcon';
import ResetSvgIcon from '../../assets/icons/ResetSvgIcon';

const FormSearch = ({
  getInfoAboutClickedSearchButton,
  fetchBriefDataMovies,
  valueOfSearchInput,
  handleValueInput,
  handleMoviesArrayForResultList
}) => {
  const handleSubmit = event => {
    event.preventDefault();
    fetchBriefDataMovies(
      API.INITIAL_SEARCH_START +
        API.KEY +
        API.LANGUAGE +
        API.QUERY +
        valueOfSearchInput
    );
  };

  const handleInput = ({ target }) => {
    getInfoAboutClickedSearchButton(false);
    const value = target.value;
    handleValueInput(value);
  };

  const resetInput = event => {
    event.preventDefault();
    handleValueInput('');
    handleMoviesArrayForResultList([]);
  };

  const getInfoAboutSendingRequest = () => {
    getInfoAboutClickedSearchButton(true);
  };

  return (
    <div className='form-search'>
      <div className='container container--content'>
        <h1 className='form-search__title'>Let's find some movie</h1>
        <form className='form-search__form' onSubmit={handleSubmit}>
          <input
            type='text'
            onChange={handleInput}
            placeholder='Start search...'
            className='form-search__input'
            value={valueOfSearchInput}
          />
          <button
            onClick={getInfoAboutSendingRequest}
            className='form-search__button  form-search__button--search'
          >
            <span className='form-search__text'>Search</span>
            <SearchSvgIcon />
          </button>
          <button
            onClick={resetInput}
            className='form-search__button  form-search__button--reset'
          >
            <span className='form-search__text'>Reset</span>
            <ResetSvgIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  valueOfSearchInput: state.valueOfSearchInput
});

const mapDispatchToProps = dispatch => ({
  getInfoAboutClickedSearchButton: click => dispatch(sendingRequest(click)),
  fetchBriefDataMovies: url => dispatch(fetchBriefDataMovies(url)),
  handleValueInput: value => dispatch(typingInSearchMovieInput(value)),
  handleMoviesArrayForResultList: array =>
    dispatch(getMoviesArrayForResultList(array))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSearch);
