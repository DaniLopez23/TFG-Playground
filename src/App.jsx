import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Model3DTanque from "./components/Modelo3DTanque";

function App() {
  const [color, setColor] = useState("red");

  return (
    <div className="App">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model3DTanque color={color}/>
          <OrbitControls />
        </Suspense>
      </Canvas>
      <div className="controls">
        <button onClick={() => setColor("red")}>Red</button>
        <button onClick={() => setColor("green")}>Green</button>
        <button onClick={() => setColor("blue")}>Blue</button>
      </div>
    </div>
  );
}

export default App;
