import React from "react";
import { Text } from "react-native";

type Props = {
  text: string;
};

function InputNotice({ text }: Props) {
  return (
    <Text style={{ textAlign: "center", fontSize: 18, color: "gray" }}>
      {text}
    </Text>
  );
}

export default InputNotice;
