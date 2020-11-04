import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Popover } from "antd";
import Router from "next/router";
import { SIGNOUT_USER_SUCCESS } from "@constants/ActionTypes";
import Link from '@components/AppLink';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { dataUser } = useSelector(({ auth }) => auth)

  const [authUser] = useState(dataUser)
  const { firstName, lastName } = authUser

  const signOut = async () => {
    await dispatch({ type: SIGNOUT_USER_SUCCESS })
    Router.replace('/ingreso')
  }

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li><Link href="/perfil">Mi cuenta</Link></li>
      <li onClick={signOut}>Salir </li>
    </ul>
  )
  return (
    <div className="gx-flex-row gx-align-items-center gx-avatar-row">
      <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
        <Avatar src={"/images/avatar/domnic-harris.png"} className="gx-size-40 gx-pointer gx-mr-3" alt="" />
        <span className="gx-avatar-name">{`${firstName} ${lastName}`}<i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" /></span>
      </Popover>
    </div>
  )
};

export default UserProfile;
