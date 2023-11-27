import React, { useContext } from "react";
import { View, Text } from "react-native";
import { CameraContext } from "../Context/CameraContext";

type Props = {
  text: string;
  children?: React.ReactNode;
  side: "left" | "right";
};

function ChatMessage({ children, side, text }: Props) {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: side === "left" ? "flex-start" : "flex-end",
      }}
    >
      <View
        style={{
          width: "80%",
          backgroundColor: "gray",
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 5,
          marginTop: 5,
          shadowColor: "#000",
          shadowOffset: {
            height: 2,
            width: 2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        }}
      >
        <Text
          style={{
            textAlign: side,
            fontSize: 18,
            fontWeight: "800",
            color: "white",
          }}
        >
          {text}
        </Text>
      </View>
      {children}
    </View>
  );
}

export default ChatMessage;
