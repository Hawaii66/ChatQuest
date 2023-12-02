import React, { useContext, useRef } from "react";
import ChatMessage from "./ChatMessage";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Heart, MessageCircle, Share, User } from "lucide-react-native";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CommentContext } from "../Context/CommentContext";

type Props = {
  user: {
    name: string;
    visit: () => void;
  };
  text: string;
  uri: string;
  likes?: number;
  comments?: { user: string; visit: () => void; text: string }[];
};

const NumberToLikes = (number: number) => {
  if (number < 1_000) {
    return number;
  }

  if (number < 1_000_000) {
    return `${Math.round(number / 100) / 10}k`;
  }

  return `${Math.round(number / 1_000_00) / 10}M`;
};

function FriendChat({ text, uri, user, likes }: Props) {
  const comments = useContext(CommentContext);

  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "gray",
        marginHorizontal: 10,
        marginVertical: 5,
      }}
    >
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
        onPress={user.visit}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "gray",
            textDecorationColor: "gray",
            textDecorationLine: "underline",
            textDecorationStyle: "solid",
          }}
        >
          {user.name}
        </Text>
        <User size={Dimensions.get("screen").width * 0.08} color="gray" />
      </TouchableOpacity>
      <TouchableWithoutFeedback>
        <ChatMessage side="left" text={text}>
          <Image
            source={{
              uri: uri,
            }}
            style={{
              margin: 5,
              backgroundColor: "red",
              width: "70%",
              aspectRatio: 9 / 16,
              borderRadius: 10,
            }}
          />
        </ChatMessage>
      </TouchableWithoutFeedback>
      <View
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 24,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          {likes && (
            <Text
              style={{
                color: "red",
                fontSize: 18,
                fontWeight: "800",
                textAlign: "left",
              }}
            >
              {NumberToLikes(likes)}
            </Text>
          )}
          <Heart size={Dimensions.get("screen").width * 0.08} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Share size={Dimensions.get("screen").width * 0.08} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            comments?.setOpen([
              {
                text: "what",
                username: "Hwaiidwae",
                visit: () => {},
              },
              {
                text: "what",
                username: "Hwaiidwae",
                visit: () => {},
              },
              {
                text: "what",
                username: "Hwaiidwae",
                visit: () => {},
              },
              {
                text: "what",
                username: "Hwaiidwae",
                visit: () => {},
              },
            ])
          }
        >
          <MessageCircle
            size={Dimensions.get("screen").width * 0.08}
            color="gray"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FriendChat;
