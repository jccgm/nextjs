import React from 'react';
import Layout from '../../core/Layout';

const WithLayout = ComposedComponent => props => (
  <Layout>
    <ComposedComponent {...props} />
  </Layout>
)
export default WithLayout