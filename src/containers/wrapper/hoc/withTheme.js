import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../config/theme';

const WithTheme = ComposedComponent => props => (
  <ThemeProvider theme={theme}>
    <ComposedComponent {...props} />
  </ThemeProvider>
);
export default WithTheme