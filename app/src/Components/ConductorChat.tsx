import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Separator from "./Separator";
import { Camera, ChevronLeft, SendHorizontal } from "lucide-react-native";
import ChatMessage from "./ChatMessage";
import InputNotice from "./InputNotice";
import { Conductor } from "../Interfaces/Conductor";

type Props = {
  onOpenCamera: () => void;
  imageUri: string;
  text: string;
  setText: (text: string) => void;
  onSend: () => void;
  onBack: () => void;
  conductor: Conductor;
};

function ConductorChat({
  imageUri,
  onOpenCamera,
  onSend,
  setText,
  text,
  onBack,
  conductor,
}: Props) {
  const [animationCount, setAnimationCount] = useState(0);
  const [imageFullScreen, setImageFullScreen] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationCount((o) => (o + 1) % 5);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        display: "flex",
      }}
    >
      {imageFullScreen && conductor.type === "arrived" && conductor.sent && (
        <TouchableOpacity
          style={{
            zIndex: 200,
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setImageFullScreen(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "black",
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              opacity: 0.6,
            }}
          />
          <Image
            style={{
              width: "90%",
              aspectRatio: 9 / 16,
              zIndex: 300,
              borderRadius: 15,
            }}
            source={{ uri: conductor.sent.uri }}
          />
        </TouchableOpacity>
      )}
      <View style={{ flex: 1 }}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: "gray",
            marginHorizontal: 10,
            marginVertical: 5,
            flexGrow: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                aspectRatio: 1,
                backgroundColor: "gray",
                padding: 5,
                borderRadius: 1000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={onBack}
            >
              <ChevronLeft
                size={Dimensions.get("screen").width * 0.08}
                color="white"
              />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "left",
                fontSize: 24,
                color: "gray",
                fontWeight: "600",
                letterSpacing: 0.2,
              }}
            >
              The Conductor
            </Text>
          </View>
          <Separator />
          <KeyboardAvoidingView
            contentContainerStyle={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
            style={{ flexGrow: 1 }}
            behavior="padding"
            keyboardVerticalOffset={50}
          >
            <ScrollView
              style={{
                flexGrow: 1,
                flex: 1,
              }}
              contentContainerStyle={{ paddingRight: 15 }}
              alwaysBounceVertical={true}
            >
              <ChatMessage
                side="right"
                text={
                  conductor.type === "waiting"
                    ? `${Array.from({ length: animationCount })
                        .map(() => ".")
                        .join(" ")} .`
                    : conductor.text
                }
              >
                <Text>
                  {conductor.type === "waiting"
                    ? "The Conductor is typing"
                    : conductor.sent
                    ? ""
                    : "Complete the quest"}
                </Text>
                {conductor.type === "waiting" && (
                  <Text
                    style={{ fontSize: 12, color: "gray", fontWeight: "400" }}
                  >
                    Expected arrival: {conductor.expected.hour}:
                    {conductor.expected.minute}
                  </Text>
                )}
              </ChatMessage>
              {conductor.type === "arrived" && conductor.sent && (
                <ChatMessage text={conductor.sent.text} side="left">
                  <TouchableOpacity
                    style={{
                      padding: 5,
                      shadowColor: "#000",
                      shadowOffset: {
                        height: 2,
                        width: 2,
                      },
                      shadowOpacity: 0.6,
                      shadowRadius: 4,
                    }}
                    onPress={() => setImageFullScreen(true)}
                  >
                    <Image
                      source={{
                        uri: conductor.sent.uri,
                      }}
                      style={{
                        width: "70%",
                        aspectRatio: 9 / 16,
                        borderRadius: 10,
                      }}
                    />
                  </TouchableOpacity>
                </ChatMessage>
              )}
              {conductor.type === "arrived" && conductor.response && (
                <ChatMessage side="right" text={conductor.response} />
              )}
            </ScrollView>
            <Separator />
            {conductor.type === "waiting" ? (
              <InputNotice text="Waiting for message" />
            ) : conductor.sent ? (
              <InputNotice text="Quest completed" />
            ) : (
              <View
                style={{
                  width: "100%",
                  paddingVertical: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                {imageUri === "" ? (
                  <TouchableOpacity
                    onPress={onOpenCamera}
                    style={{
                      padding: 5,
                      borderRadius: 1000,
                      borderWidth: 2,
                      borderColor: "gray",
                    }}
                  >
                    <Camera size={26} color="gray" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={onOpenCamera}
                    style={{
                      width: Dimensions.get("screen").width * 0.15,
                      aspectRatio: 9 / 16,
                    }}
                  >
                    <Image
                      source={{
                        uri: imageUri,
                      }}
                      style={{
                        flex: 1,
                        borderRadius: 10,
                      }}
                    />
                  </TouchableOpacity>
                )}
                <View
                  style={{
                    flexGrow: 1,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    backgroundColor: "gray",
                    paddingVertical: 5,
                    minHeight: 36,
                    flex: 1,
                  }}
                >
                  <TextInput
                    style={{
                      color: "white",
                      fontSize: 18,
                    }}
                    placeholder="explain"
                    placeholderTextColor={"#ffffffAA"}
                    multiline
                    value={text}
                    onChangeText={setText}
                    contextMenuHidden
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                    onSend();
                  }}
                  style={{ width: 36, aspectRatio: 1 }}
                >
                  <SendHorizontal
                    color={
                      text !== "" && imageUri !== "" ? "lightblue" : "gray"
                    }
                    size={36}
                  />
                </TouchableOpacity>
              </View>
            )}
          </KeyboardAvoidingView>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ConductorChat;
