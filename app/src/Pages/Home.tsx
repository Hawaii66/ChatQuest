import React, { useState } from "react";
import CameraRenderer from "../Components/CameraRenderer";
import ConductorChat from "../Components/ConductorChat";
import { Conductor } from "../Interfaces/Conductor";

function Home() {
  const [text, setText] = useState("");
  const [uri, setUri] = useState("");
  const [openCam, setOpenCam] = useState(false);
  const [conductor, setConductor] = useState<Conductor>({
    type: "arrived",
    text: `My keys have been stolen, where are they?`,
  });

  const send = () => {
    setConductor({
      type: "arrived",
      text: `My keys have been stolen, where are they?`,
      sent: {
        text: text,
        uri: uri,
      },
      response:
        "Nice try, key bandit! Return the loot or prepare for a lifetime of accidentally stepping on LEGO pieces. 🔑😏",
    });
  };

  if (openCam) {
    return (
      <CameraRenderer
        onImage={(t) => {
          setUri(t);
          setOpenCam(false);
        }}
      />
    );
  }

  return (
    <ConductorChat
      conductor={conductor}
      onBack={() => {}}
      imageUri={uri}
      onOpenCamera={() => setOpenCam(true)}
      onSend={send}
      setText={setText}
      text={text}
    />
  );
}

/*

*/

export default Home;
