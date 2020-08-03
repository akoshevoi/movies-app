// @flow
import * as React from 'react';

// Flow type
type Props = {
  children: React.Node
};

type State = {
  hasError: boolean
};

export default class ErrorBoundary extends React.PureComponent<Props, State> {
  static defaultProps = {
    children: null
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  state = { hasError: false };

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    return hasError ? (
      <div id='inTurnFadingTextG'>
        <div id='inTurnFadingTextG_1' className='inTurnFadingTextG'>
          S
        </div>
        <div id='inTurnFadingTextG_2' className='inTurnFadingTextG'>
          o
        </div>
        <div id='inTurnFadingTextG_3' className='inTurnFadingTextG'>
          m
        </div>
        <div id='inTurnFadingTextG_4' className='inTurnFadingTextG'>
          e
        </div>
        <div id='inTurnFadingTextG_5' className='inTurnFadingTextG'>
          t
        </div>
        <div id='inTurnFadingTextG_6' className='inTurnFadingTextG'>
          h
        </div>
        <div id='inTurnFadingTextG_7' className='inTurnFadingTextG'>
          i
        </div>
        <div id='inTurnFadingTextG_8' className='inTurnFadingTextG'>
          n
        </div>
        <div id='inTurnFadingTextG_9' className='inTurnFadingTextG'>
          g
        </div>
        <div id='inTurnFadingTextG_10' className='inTurnFadingTextG'>
          _
        </div>
        <div id='inTurnFadingTextG_11' className='inTurnFadingTextG'>
          W
        </div>
        <div id='inTurnFadingTextG_12' className='inTurnFadingTextG'>
          e
        </div>
        <div id='inTurnFadingTextG_13' className='inTurnFadingTextG'>
          n
        </div>
        <div id='inTurnFadingTextG_14' className='inTurnFadingTextG'>
          t
        </div>
        <div id='inTurnFadingTextG_15' className='inTurnFadingTextG'>
          _
        </div>
        <div id='inTurnFadingTextG_16' className='inTurnFadingTextG'>
          W
        </div>
        <div id='inTurnFadingTextG_17' className='inTurnFadingTextG'>
          r
        </div>
        <div id='inTurnFadingTextG_18' className='inTurnFadingTextG'>
          o
        </div>
        <div id='inTurnFadingTextG_19' className='inTurnFadingTextG'>
          n
        </div>
        <div id='inTurnFadingTextG_20' className='inTurnFadingTextG'>
          g
        </div>
      </div>
    ) : (
      children
    );
  }
}
