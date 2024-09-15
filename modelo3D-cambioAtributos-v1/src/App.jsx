import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model3DTanque from './components/Modelo3DTanque'

function App() {
  const [speed, setSpeed] = useState(1)
  const [valvulaEntradastate, setValvulaEntradaState] = useState("red")
  const [valvulaSalidastate, setValvulaSalidaState] = useState("red")


  return (
    <div className="App">
      <Canvas className="canvas">
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model3DTanque valvulaEntradastate={valvulaEntradastate} valvulaSalidastate={valvulaSalidastate} speed={speed} />
          <OrbitControls />
        </Suspense>
      </Canvas>
      <div className="controls">
        <button onClick={() => setValvulaEntradaState("green")}>Leche Entrando</button>
        <button onClick={() => setValvulaEntradaState("red")}>Terminar de entrar leche</button>
        <button onClick={() => setValvulaSalidaState("green")}>Leche saliendo</button>
        <button onClick={() => setValvulaSalidaState("red")}>Terminar de salir leche</button>
        <button onClick={() => setSpeed(speed + 0.1)}>Increase Speed</button>
        <button onClick={() => setSpeed(speed - 0.1)}>Decrease Speed</button>
      </div>
    </div>
  )
}

export default App