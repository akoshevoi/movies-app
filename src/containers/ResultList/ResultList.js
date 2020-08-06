// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bounceInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import Result from '../Result/Result';

const styles = {
  bounceInUp: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounceInUp, 'bounce')
  }
};

const ResultList = ({ movies }) => (
  <StyleRoot>
    <div className='results'>
      <div className='container  container--content' style={styles.bounceInUp}>
        {movies.map(item => (
          <Result key={item.id} item={item} />
        ))}
      </div>
    </div>
  </StyleRoot>
);

const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps)(ResultList);
