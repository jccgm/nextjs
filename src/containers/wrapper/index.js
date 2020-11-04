import React, { memo } from 'react';
import DefaultPage from './hoc/defaultPage'
import SeguredPage from './hoc/securedPage'

export function Wrapper({ children, isAuth = true }) {
  if (isAuth) {
    return (
      <SeguredPage>
        {
          React.Children.toArray(
            React.cloneElement(children, {})
          )
        }
      </SeguredPage >
    )
  }
  return (
    <DefaultPage>
      {
        React.Children.toArray(
          React.cloneElement(children, {})
        )
      }
    </DefaultPage >
  )
}

export default memo(Wrapper)
