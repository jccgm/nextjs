export const MENU_SIDEBAR_ROL = [
  {
    id: "ADM",
    name: "menu.admin",
    url: "/admin",
  }
];

export const role = {
  getTypeMenu: (userTypeId) => {
    const menuSelected = MENU_SIDEBAR_ROL.filter((e) => e.id === userTypeId);
    return menuSelected.length > 0 ? menuSelected[0].name : "";
  },
  getUrl: (userTypeId) => {
    const menuSelected = MENU_SIDEBAR_ROL.filter((e) => e.id === userTypeId);
    return menuSelected.length > 0 ? menuSelected[0].url : "";
  },
};
