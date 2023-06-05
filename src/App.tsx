import "./App.css";

import React from "react";
import KonvaArea from "./components/KonvaArea";

function App() {
  return (
    <div className="App">
      <KonvaArea key="konva-area" width={800} height={500}></KonvaArea>
    </div>
  );
}

export default App;
