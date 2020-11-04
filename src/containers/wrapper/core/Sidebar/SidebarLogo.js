import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import {
  onNavStyleChange,
  toggleCollapsedSideNav,
} from "@redux/actions/settings";
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
  THEME_TYPE_LITE,
} from "@constants/ThemeSetting";

const SidebarLogo = () => {
  const dispatch = useDispatch();
  const { width, themeType, navCollapsed } = useSelector(
    ({ settings }) => settings
  );
  let navStyle = useSelector(({ settings }) => settings.navStyle);
  if (width < TAB_SIZE && navStyle === NAV_STYLE_FIXED) {
    navStyle = NAV_STYLE_DRAWER;
  }

  const { logo } = useSelector(({ auth }) => auth);
  const [image, setImage] = useState(logo ?? "/assets/images/logo.png");

  useEffect(() => {
    setImage(logo);
  }, [logo]);

  return (
    <div className="gx-layout-sider-header">
      {navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR ? (
        <div className="gx-linebar">
          <i
            className={`gx-icon-btn icon icon-${
              navStyle === NAV_STYLE_MINI_SIDEBAR ? "menu-unfold" : "menu-fold"
            } ${themeType !== THEME_TYPE_LITE ? "gx-text-white" : ""}`}
            onClick={() => {
              if (navStyle === NAV_STYLE_DRAWER) {
                dispatch(toggleCollapsedSideNav(!navCollapsed));
              } else if (navStyle === NAV_STYLE_FIXED) {
                dispatch(onNavStyleChange(NAV_STYLE_MINI_SIDEBAR));
              } else if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
                dispatch(toggleCollapsedSideNav(!navCollapsed));
              } else {
                dispatch(onNavStyleChange(NAV_STYLE_FIXED));
              }
            }}
          />
        </div>
      ) : null}

      <Link href="/">
        <a className="gx-site-logo">
          {/* {navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR && width >= TAB_SIZE ?
            <img alt="lo" src="/images/w-logo.png" /> :
            themeType === THEME_TYPE_LITE ?
              <img alt="logo1" src="/images/logo-white.png" /> :
              <img alt="logo2" src="/images/logo.png" />} */}
          <img
            alt=""
            src={image ?? "/assets/images/logo.png"}
            style={{ height: "45px" }}
          />
        </a>
      </Link>
    </div>
  );
};

export default SidebarLogo;
