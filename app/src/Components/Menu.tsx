import React, { useContext } from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { MenuContext } from "../Context/MenuContext";
import Separator from "./Separator";
import MenuButton from "./MenuButton";
import { Globe2, MessageCircle, Settings, User } from "lucide-react-native";

function Menu() {
  const menu = useContext(MenuContext);

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
      }}
    >
      <TouchableWithoutFeedback onPress={() => menu?.hideMenu()}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
            backgroundColor: "#000",
            opacity: 0.6,
          }}
        ></View>
      </TouchableWithoutFeedback>
      <View
        style={{
          width: "60%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <SafeAreaView
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            flex: 1,
            gap: 8,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 20,
              color: "gray",
              textAlign: "center",
              width: "100%",
            }}
          >
            ChatQuest
          </Text>
          <Separator />
          <MenuButton icon={<MessageCircle color="gray" />} text="Chat" />
          <MenuButton icon={<Globe2 color="gray" />} text="Friends" />
          <View style={{ flexGrow: 1 }} />
          <MenuButton icon={<User color="gray" />} text="User" />
          <MenuButton icon={<Settings color="gray" />} text="Settings" />
        </SafeAreaView>
      </View>
    </View>
  );
}

export default Menu;
