import { createContext, useState } from "react";
import Menu from "../Components/Menu";
import { Page } from "../Interfaces/Pages";

type MenuContextType = {
  openMenu: () => void;
  hideMenu: () => void;
  page: Page;
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
  const [page, setPage] = useState<Page>("Chat");

  return (
    <MenuContext.Provider
      value={{
        openMenu: () => setOpen(true),
        hideMenu: () => setOpen(false),
        page: page,
      }}
    >
      {children}
      {open && (
        <Menu
          changePage={(p) => {
            setPage(p);
            setOpen(false);
          }}
        />
      )}
    </MenuContext.Provider>
  );
}
