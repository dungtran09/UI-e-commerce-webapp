import React, { useEffect, useState } from "react";
import {
  UserInfo,
  UserMenuBar,
  Invoices,
  ChangePassword,
  Billding,
  ChangeProfile,
} from "../../components/";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/userByIdSlice";
import jwt_decode from "jwt-decode";

const User = () => {
  const dispatch = useDispatch();
  const [isShowOn, setIsShowOn] = useState(true);
  const [idEl, setIdEl] = useState("user-info");

  useEffect(() => {
    const tokenObj = JSON.parse(localStorage.getItem("persist:jwt"));
    if (tokenObj?.isLoggedIn === "true" && tokenObj?.token) {
      const token = tokenObj?.token;
      const decodeToken = jwt_decode(token);
      dispatch(getUser(decodeToken?.id));
    }
  }, []);

  const { data: user, status } = useSelector((state) => state.userById);

  return (
    <div className="w-main grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      <div className="rounded-lg">
        {isShowOn && <UserMenuBar setIdEl={setIdEl} idEl={idEl} user={user} />}
      </div>
      <div className="rounded-lg border p-4 lg:col-span-2">
        <div className="flex justify-between ">
          {isShowOn && idEl === "user-info" && <UserInfo user={user} />}
        </div>
        {isShowOn && idEl === "billding" && (
          <div className="flex justify-between ">
            <Billding user={user} />
          </div>
        )}

        {isShowOn && idEl === "invoices" && (
          <div className="flex justify-between ">
            <Invoices user={user} />
          </div>
        )}
        {isShowOn && idEl === "change-profile" && (
          <div className="flex-1 justify-between ">
            <ChangeProfile user={user} />
          </div>
        )}

        {isShowOn && idEl === "change-password" && (
          <div className="flex-1 justify-between ">
            <ChangePassword user={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default User;