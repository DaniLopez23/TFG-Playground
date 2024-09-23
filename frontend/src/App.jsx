import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane } from "@react-three/drei";
import Model from "./components/ModeloTanqueVertical2Palas";

function App() {
  const [speed, setSpeed] = useState(1);
  const [milkQuantity, setmilkQuantity] = useState(0);

  return (
    <div className="App">
      <Canvas className="canvas">
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={null}>
          <Model milkQuantity={milkQuantity} speed={speed} />

          {/* Suelo */}
          <Plane
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            args={[10, 10]}
            receiveShadow
          >
            <meshStandardMaterial attach="material" color="gray" />
          </Plane>

          {/* Control de la cámara con restricciones de zoom y sin movimiento (pan) */}
          <OrbitControls
            enablePan={false} // Deshabilita el movimiento de la cámara
            minDistance={4} // Zoom mínimo (distancia más cercana a la cámara)
            maxDistance={10} // Zoom máximo (distancia más lejana de la cámara)
            maxPolarAngle={Math.PI / 1.2 / 2} // Evita que la cámara vea por debajo del objeto
          />
        </Suspense>
      </Canvas>

      <div className="controls">
        <button onClick={() => setSpeed(speed + 0.1)}>+ velocidad palas</button>
        <button onClick={() => setSpeed(speed - 0.1)}>- velocidad palas</button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={milkQuantity}
          onChange={(e) => setmilkQuantity(parseFloat(e.target.value))}
        />
      </div>

      <div></div>
    </div>
  );
}

export default App;
