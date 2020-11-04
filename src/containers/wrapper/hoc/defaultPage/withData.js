import React, { Component } from 'react';

const WithData = ComposedComponent =>
  class WithData extends Component {
    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
export default WithData