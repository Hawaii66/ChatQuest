import React, { useRef, useState } from "react";
import { Camera, CameraType, ImageType } from "expo-camera";
import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlipType, manipulateAsync } from "expo-image-manipulator";
import { RefreshCcw } from "lucide-react-native";

type Props = {
  onImage: (uri: string) => void;
};

function CameraRenderer({ onImage }: Props) {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const cameraRef = useRef<Camera | null>(null);

  const takePic = async () => {
    const picture = await cameraRef.current?.takePictureAsync({
      base64: true,
      imageType: ImageType.png,
    });

    if (!picture || !picture.base64) {
      return;
    }

    const uri = `data:image/png;base64,${picture.base64}`;

    const result = await manipulateAsync(
      uri,
      [
        {
          resize: {
            width: picture.width,
            height: (picture.width * 16) / 9,
          },
        },
        {
          flip: FlipType.Horizontal,
        },
      ],
      {
        base64: true,
      }
    );

    if (!result.base64) {
      return;
    }

    onImage(`data:image/png;base64,${result.base64}`);
  };

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1000,
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
      }}
    >
      <SafeAreaView
        style={{
          zIndex: 1,
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          position: "relative",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            borderRadius: 1000,
          }}
          onPress={() =>
            setType((old) =>
              old === CameraType.back ? CameraType.front : CameraType.back
            )
          }
        >
          <RefreshCcw
            style={{
              color: "white",
            }}
            size={Dimensions.get("screen").width * 0.1}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 1000,
            width: Dimensions.get("screen").width * 0.15,
            aspectRatio: 1,
            borderColor: "white",
            borderWidth: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={takePic}
        >
          <View
            style={{
              width: "90%",
              borderRadius: 1000,
              backgroundColor: "white",
              aspectRatio: 1,
            }}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <Camera
        ref={cameraRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
        }}
        type={type}
      />
    </View>
  );
}

export default CameraRenderer;
