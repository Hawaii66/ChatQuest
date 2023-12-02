import React, { useContext } from "react";
import { MenuContext } from "../Context/MenuContext";
import Home from "./Home";
import Friends from "./Friends";

function PageSwitcher() {
  const menu = useContext(MenuContext);

  switch (menu?.page) {
    case "Chat":
      return <Home />;
    case "Friends":
      return <Friends />;
    default:
      return <></>;
  }
}

export default PageSwitcher;
