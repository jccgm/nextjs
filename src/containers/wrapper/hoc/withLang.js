import React from 'react';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import AppLocale from '@lngProvider';

const currentAppLocale = AppLocale["es"];
const WithLang = ComposedComponent => props => (
  <ConfigProvider locale={currentAppLocale.antd}>
    <IntlProvider locale={currentAppLocale.locale}  messages={currentAppLocale.messages} >
      <ComposedComponent {...props} />
    </IntlProvider>
  </ConfigProvider>
)
export default WithLang