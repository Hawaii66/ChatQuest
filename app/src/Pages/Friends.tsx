import React, { useContext } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Separator from "../Components/Separator";
import FriendChat from "../Components/FriendChat";
import { Menu } from "lucide-react-native";
import { MenuContext } from "../Context/MenuContext";

function Friends() {
  const menu = useContext(MenuContext);
  return (
    <View style={{ flexGrow: 1 }}>
      <SafeAreaView>
        <View
          style={{
            width: Dimensions.get("screen").width,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 15,
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
            <Menu size={Dimensions.get("screen").width * 0.07} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              fontSize: 36,
              color: "gray",
              fontWeight: "800",
            }}
          >
            Friends
          </Text>
        </View>
      </SafeAreaView>
      <Separator />
      <ScrollView style={{ flex: 1 }}>
        <FriendChat
          text="What 123"
          uri="https://hips.hearstapps.com/hmg-prod/images/cutest-dog-breed-bernese-64356a43dbcc5.jpg"
          user={{
            name: "HawaiiDev",
            visit: () => {},
          }}
          likes={120}
        />
        <FriendChat
          text="What 123"
          uri="https://hips.hearstapps.com/hmg-prod/images/cutest-dog-breed-bernese-64356a43dbcc5.jpg"
          user={{
            name: "HawaiiDe123v",
            visit: () => {},
          }}
          likes={1123}
        />
        <FriendChat
          text="What 123"
          uri="https://hips.hearstapps.com/hmg-prod/images/cutest-dog-breed-bernese-64356a43dbcc5.jpg"
          user={{
            name: "HawaiiDev123asd",
            visit: () => {},
          }}
          likes={2403}
        />
        <FriendChat
          text="What 123"
          uri="https://hips.hearstapps.com/hmg-prod/images/cutest-dog-breed-bernese-64356a43dbcc5.jpg"
          user={{
            name: "HawaiiDev123asd",
            visit: () => {},
          }}
          likes={2_403_000}
        />
        <View style={{ height: Dimensions.get("screen").height * 0.05 }} />
      </ScrollView>
    </View>
  );
}

export default Friends;
