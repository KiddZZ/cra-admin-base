import React from "react";
import "./app.less";
import background from "./images/background.png";

function App() {
  return (
    <div className="app">
      <h1 className="text">Hello Webpack</h1>
      <img className="background" src={background} alt="" />
    </div>
  );
}

export default App;
