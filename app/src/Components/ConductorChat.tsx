import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Separator from "./Separator";
import { Camera, ChevronLeft, Menu, SendHorizontal } from "lucide-react-native";
import ChatMessage from "./ChatMessage";
import InputNotice from "./InputNotice";
import { CameraContext } from "../Context/CameraContext";
import { MenuContext } from "../Context/MenuContext";

type Props = {
  conductor:
    | {
        type: "waiting";
        text: string;
        expected: {
          minute: number;
          hour: number;
        };
      }
    | {
        type: "arrived";
        text: string;
      };
  quest?: {
    text: string;
    uri: string;
  };
  response?: {
    text: string;
  };
  sendQuest: (info: Required<Props["quest"]>) => void;
};

function ConductorChat({ conductor, quest, response, sendQuest }: Props) {
  const [animationCount, setAnimationCount] = useState(0);
  const [imageFullScreen, setImageFullScreen] = useState(false);

  const [sendText, setSendText] = useState("");
  const [sendImage, setSendImage] = useState("");

  const camera = useContext(CameraContext);
  const menu = useContext(MenuContext);

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
      {imageFullScreen && quest && quest.uri !== "" && (
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
            source={{ uri: quest.uri }}
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
                padding: 7,
                borderRadius: 1000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => menu?.openMenu()}
            >
              <Menu
                size={Dimensions.get("screen").width * 0.07}
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
                    : quest
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
              {quest && (
                <ChatMessage text={quest.text} side="left">
                  {quest.uri !== "" && (
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
                          uri: quest.uri,
                        }}
                        style={{
                          width: "70%",
                          aspectRatio: 9 / 16,
                          borderRadius: 10,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </ChatMessage>
              )}
              {response && <ChatMessage side="right" text={response.text} />}
            </ScrollView>
            <Separator />
            {conductor.type === "waiting" ? (
              <InputNotice text="Waiting for message" />
            ) : quest ? (
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
                {sendImage === "" ? (
                  <TouchableOpacity
                    onPress={() => {
                      camera?.openCamera(setSendImage);
                    }}
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
                    onPress={() => {}}
                    style={{
                      width: Dimensions.get("screen").width * 0.15,
                      aspectRatio: 9 / 16,
                    }}
                  >
                    <Image
                      source={{
                        uri: sendImage,
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
                    value={sendText}
                    onChangeText={setSendText}
                    contextMenuHidden
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                    sendQuest({
                      text: sendText,
                      uri: sendImage,
                    });
                  }}
                  style={{ width: 36, aspectRatio: 1 }}
                >
                  <SendHorizontal
                    color={
                      sendText !== "" && sendImage !== "" ? "lightblue" : "gray"
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
