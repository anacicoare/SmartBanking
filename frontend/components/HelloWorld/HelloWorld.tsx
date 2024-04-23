"use client"

import React, { useState } from "react";
import VideoCapture from "../VideoCapture/VideoCapture";
import "../../cvr"; // import side effects. The license, engineResourcePath, so on.

function HelloWorld() {
  const [mode, setMode] = useState("video");

  return (
    <div className='div-hello-world'>
      <div className='top-btns'>
      </div>
      <VideoCapture />
    </div>
  );
}

export default HelloWorld;
