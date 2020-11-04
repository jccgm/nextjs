import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import Link from "next/link";

import CustomScrollbars from "@utils/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
// import UserProfile from "./UserProfile";
// import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "@constants/ThemeSetting";
import IntlMessages from "@utils/IntlMessages";
import { useSelector } from "react-redux";
import MenuJSON from "../../menu.json";
import { role } from "@utils/middlewareRole";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const SidebarContent = () => {
  let { navStyle, themeType, pathname } = useSelector(({ settings }) => settings);
  const userTypeName = useSelector(({ auth }) => auth.dataUser.userTypeName)
  const [menu] = useState(role.getTypeMenu(userTypeName))

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  const addMenu = ({ url, icon, textId, as = undefined }) => {
    return (
      <Menu.Item key={url}>
        <Link href={`/${url}`} as={as}>
          <a>
            <i className={icon} />
            <span><IntlMessages id={textId} /></span>
          </a>
        </Link>
      </Menu.Item>
    )
  }

  const addWithSubmenu = (menu) => {
    const { icon, textId, submenu } = menu
    return (
      <SubMenu
        key={textId}
        popupClassName={getNavStyleSubMenuClass(navStyle)}
        title={<span><i className={icon} /><span> <IntlMessages id={textId} /></span></span>}
      >
        {
          submenu.map(subMenus => addMenu(subMenus))
        }
      </SubMenu>
    )
  }

  return (
    <>
      <SidebarLogo />
      <div className="gx-sidebar-content">
        {/* <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile />
          <AppsNavigation />
        </div> */}
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">
            {
              MenuJSON[menu] &&
              MenuJSON[menu].map(mainMenu => {
                return (
                  <MenuItemGroup key={mainMenu.title} className="gx-mainMenu-group" title={<IntlMessages id={mainMenu.title} />}>
                    {mainMenu.menu.map(menu => menu.submenu.length === 0 ? addMenu(menu) : addWithSubmenu(menu))}
                  </MenuItemGroup>
                )
              })
            }
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;

