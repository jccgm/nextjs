import React from "react";

import configureStore from "./configure-store";
import throttle from "lodash/throttle";
import { saveState } from "./persistStore";
import middlewareRouterToken from "./authMiddlewareRouter";
import { INIT_STATE as authReducer } from "@redux/reducers/auth";

import cookies from "next-cookies";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

export function getOrCreateStore(initialState) {
  if (isServer) {
    return configureStore(initialState);
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = configureStore(initialState);
  }

  return window[__NEXT_REDUX_STORE__];
}

export const defaultValueStorage = async (ctx) => {
  let storage = cookies(ctx).storage
  return {
    auth: {
      ...authReducer,
      ...(storage ? storage.auth : {}),
      loader: false,
    }
  }
}

const withReduxStore = (App) => {
  return class Redux extends React.Component {
    static async getInitialProps(appContext) {
      const { ctx, Component } = appContext;
      const reduxStore = getOrCreateStore(await defaultValueStorage(appContext.ctx));
      appContext.ctx.reduxStore = reduxStore;
      middlewareRouterToken(appContext.ctx);
      return {
        pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
        initialReduxState: reduxStore.getState(),
      };
    }

    constructor(props) {
      super(props);
      // eslint-disable-next-line react/prop-types
      this.reduxStore = getOrCreateStore(props.initialReduxState);

      this.reduxStore.subscribe(
        throttle(() => {
          const states = this.reduxStore.getState();
          if (typeof window !== "undefined") saveState({ auth: states.auth });
        }, 200)
      )
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};

export default withReduxStore;
