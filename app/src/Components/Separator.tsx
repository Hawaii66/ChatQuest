import React from "react";
import { View } from "react-native";

function Separator() {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 4,
      }}
    >
      <View
        style={{
          width: "95%",
          height: 2,
          backgroundColor: "gray",
          opacity: 0.6,
        }}
      />
    </View>
  );
}

export default Separator;
