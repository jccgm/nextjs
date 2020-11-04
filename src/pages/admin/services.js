import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Wrapper from '@containers/Wrapper';
 import Home from '@containers/Home';
// import Home from '../../containers/Home';

import { homeSaga as saga } from '@containers/Home/redux/saga';
import { homeReducer as reducer } from '@containers/Home/redux/reducer';
import { INITIAL_REQUEST_HOME_START } from '@containers/Home/redux/constants';

import injectSaga from '@utils/inject-saga'
import injectReducer from '@utils/inject-reducer'

import { compose } from 'redux'
import { useDispatch } from 'react-redux';

export const IndexPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: INITIAL_REQUEST_HOME_START })
  }, [])

  return (
    <Wrapper>
      <Home />
    </Wrapper>
  )
}

IndexPage.propTypes = {};

const withReducer = injectReducer({ key: 'home', reducer })
const withSaga = injectSaga({ key: 'Home', saga })

export default compose(withSaga, withReducer)(IndexPage);
