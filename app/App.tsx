import { CameraContextWrapper } from "./src/Context/CameraContext";
import { MenuContextWrapper } from "./src/Context/MenuContext";
import Home from "./src/Pages/Home";

export default function App() {
  return (
    <MenuContextWrapper>
      <CameraContextWrapper>
        <Home />
      </CameraContextWrapper>
    </MenuContextWrapper>
  );
}
