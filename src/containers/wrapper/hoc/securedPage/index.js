import React from 'react'
import { compose } from 'redux';
import WithData from './withData';
import WithLayout from './withLayout';

const DefaultPage = ({ children }) => (<>{children}</>)
export default compose(WithData, WithLayout)(DefaultPage)