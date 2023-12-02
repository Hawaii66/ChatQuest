import React, { forwardRef } from "react";
import { Comment } from "../Interfaces/Comment";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import Separator from "./Separator";
import { Send } from "lucide-react-native";

type Props = {
  comments: Comment[];
};

const Comments = forwardRef(({ comments }: Props, ref: any) => {
  return (
    <BottomSheetModal
      ref={ref}
      index={2}
      snapPoints={["25%", "50%", "60%", "75"]}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          fontWeight: "800",
          color: "gray",
        }}
      >
        Comments
      </Text>
      <Separator />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 12,
          paddingVertical: 8,
          gap: 8,
        }}
      >
        <BottomSheetTextInput
          style={{
            flexGrow: 1,
            paddingHorizontal: 6,
            paddingVertical: 4,
            borderColor: "gray",
            borderWidth: 1,
            borderStyle: "solid",
            fontSize: 18,
            fontWeight: "500",
            borderRadius: 18,
          }}
          value="what"
        />
        <TouchableOpacity>
          <Send color="gray" />
        </TouchableOpacity>
      </View>
      <Separator />
      <BottomSheetScrollView>
        {comments.map((c, idx) => (
          <View style={{ paddingHorizontal: 12, paddingVertical: 8 }} key={idx}>
            <Text style={{ fontSize: 18, color: "gray", fontWeight: "800" }}>
              - {c.username}
            </Text>
            <Text
              style={{
                paddingLeft: 12,
                fontSize: 18,
                color: "gray",
                fontWeight: "500",
              }}
            >
              {c.text}
            </Text>
          </View>
        ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default Comments;
