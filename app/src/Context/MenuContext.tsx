import { createContext, useState } from "react";
import Menu from "../Components/Menu";

type MenuContextType = {
  openMenu: () => void;
  hideMenu: () => void;
};

export const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);

export function MenuContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <MenuContext.Provider
      value={{
        openMenu: () => setOpen(true),
        hideMenu: () => setOpen(false),
      }}
    >
      {children}
      {open && <Menu />}
    </MenuContext.Provider>
  );
}
