import { ArrowRight } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, Text } from "react-native";

type Props = {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
};

function MenuButton({ icon, text, onClick }: Props) {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 8,
        marginVertical: 4,
      }}
    >
      {icon}
      <Text
        style={{
          fontWeight: "700",
          color: "gray",
          letterSpacing: 0.2,
          fontSize: 24,
          flexGrow: 1,
        }}
      >
        {text}
      </Text>
      <ArrowRight color="gray" />
    </TouchableOpacity>
  );
}

export default MenuButton;
