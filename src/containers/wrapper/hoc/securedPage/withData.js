import React, { Component } from 'react';

const WithDataWrapper = (ComposedComponent) =>
  class WithData extends Component {
    render() {
      return <ComposedComponent {...this.props} />;
    }
  };

export default WithDataWrapper;
