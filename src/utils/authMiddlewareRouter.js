import redirectTo from "./redirectTo";
import { role } from "./middlewareRole";

// TODO: Huascar, aquí colocas todas las rutas que sean disponibles para todos.
export const availableToAll = [
  "/"
];

const AuthMiddlewareRouter = (ctx) => {
  const { pathname, reduxStore: store } = ctx;
  const { tokenUser: token, dataUser: { userTypeName } } = store.getState().auth;
  const auth = () => {
    //eslint-disable-line
    if (!token) {
      redirectTo("/ingreso", { res: ctx.res, status: 301 });
    }
  };

  const authNoNeedLogin = () => {
    if (token) {
      redirectTo(role.getUrl(userTypeName), { res: ctx.res, status: 301 });
    }
  };

  switch (pathname) {
    case "/registro":
      authNoNeedLogin();
      return;
    case "/ingreso":
      authNoNeedLogin();
      return;
    case "/nueva-contrasena":
      authNoNeedLogin();
      return;
    case "/olvide-contrasena":
      authNoNeedLogin();
      return;
    case "/terminos-condiciones":
      authNoNeedLogin();
      return;
  }

  if (availableToAll.includes(pathname)) return;
  if (pathname.indexOf("/perfil") !== -1) { auth(); return }

  if (pathname.indexOf(role.getUrl(userTypeName)) !== -1) {
    auth();
  } else {
    redirectTo(role.getUrl(userTypeName), { res: ctx.res, status: 301 });
  }
};

export default AuthMiddlewareRouter;
