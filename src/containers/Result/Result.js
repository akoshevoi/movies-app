// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  fetchExtendedDataSpecificMovie,
  fetchCreditsMovie
} from '../../actions/actions';
import * as API from '../../constants/api';
import clapperboard from '../../assets/img/clapperboard-film.jpg';

const Result = ({
  fetchExtendedDataSpecificMovie,
  fetchCreditsMovie,
  item
}) => {
  const handleClick = id => {
    fetchExtendedDataSpecificMovie(
      API.EXACT_SEARCH_START + id + API.KEY + API.LANGUAGE
    );
    fetchCreditsMovie(API.EXACT_SEARCH_START + id + API.CREDITS + API.KEY);
  };

  return (
    <div key={item.id} className='result' id={item.id}>
      <div className='result__poster'>
        <img
          alt=''
          id={item.id}
          className='result__img'
          onClick={() => handleClick(item.id)}
          src={
            item.poster_path ? API.POSTER_IMG + item.poster_path : clapperboard
          }
        />
      </div>
      <div className='result__content'>
        <h4 className='result__title'>{item.title}</h4>
        <p className='result__year'>
          {item.release_date ? item.release_date.slice(0, 4) : null}
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchExtendedDataSpecificMovie: url =>
    dispatch(fetchExtendedDataSpecificMovie(url)),
  fetchCreditsMovie: url => dispatch(fetchCreditsMovie(url))
});

export default connect(null, mapDispatchToProps)(Result);
