import React, { useState } from "react";
import ConductorChat from "../Components/ConductorChat";

function Home() {
  const [quest, setQuest] = useState<{ text: string; uri: string } | undefined>(
    undefined
  );

  return (
    <ConductorChat
      conductor={{
        type: "arrived",
        text: "Where are my keys",
      }}
      sendQuest={setQuest}
      quest={quest}
    />
  );
}

export default Home;
