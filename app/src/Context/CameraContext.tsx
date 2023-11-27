import { createContext, useState } from "react";
import CameraRenderer from "../Components/CameraRenderer";

type CameraCallback = (uri: string) => void;

export type CameraContextType = {
  openCamera: (callback: CameraCallback) => void;
};

export const CameraContext = createContext<CameraContextType | undefined>(
  undefined
);

export const CameraContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [callback, setCallback] = useState<CameraCallback | undefined>(
    undefined
  );

  return (
    <CameraContext.Provider
      value={{
        openCamera: (callback) => {
          setCallback(() => {
            return callback;
          });
          setOpen(true);
        },
      }}
    >
      {open && (
        <CameraRenderer
          onImage={(u) => {
            if (callback) {
              callback(u);
              setOpen(false);
            }
          }}
        />
      )}
      {children}
    </CameraContext.Provider>
  );
};
