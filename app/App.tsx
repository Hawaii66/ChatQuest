import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CameraContextWrapper } from "./src/Context/CameraContext";
import { MenuContextWrapper } from "./src/Context/MenuContext";
import PageSwitcher from "./src/Pages/PageSwitcher";
import "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { CommentContextWrapper } from "./src/Context/CommentContext";

export default function App() {
  const ref = useRef<BottomSheetModal>(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <MenuContextWrapper>
          <CameraContextWrapper>
            <CommentContextWrapper>
              <PageSwitcher />
            </CommentContextWrapper>
          </CameraContextWrapper>
        </MenuContextWrapper>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
