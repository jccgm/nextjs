import React from 'react'
import { compose } from 'redux';
import WithData from './withData';
import WithLang from '../withLang';

const DefaultPage = ({ children }) => (<>{children}</>)
export default compose(WithData, WithLang)(DefaultPage)