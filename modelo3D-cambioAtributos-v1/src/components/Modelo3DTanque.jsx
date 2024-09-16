import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { MeshStandardMaterial } from 'three'

export default function Model3DTanque({ valvulaEntradastate, valvulaSalidastate, speed = 1 }) {
  const { nodes, materials } = useGLTF('/modelo3DTanque.glb')
  const Pala1Mesh = useRef()
  const Pala2Mesh = useRef()

  const meshMaterialValvulaSalida = new MeshStandardMaterial({ color: valvulaSalidastate })
  const meshMaterialValvulaEntrada = new MeshStandardMaterial({ color: valvulaEntradastate })

  // Animación con react-spring
  const rotationPala1Spring = useSpring({
    loop: true, // Loop infinito
    to: { rotation: 2 * Math.PI }, // Rotar 360 grados
    from: { rotation: 0 }, // Empezar en 0
    config: { duration: 2000 / speed } // Controlar la duración de la animación
  })

  const rotationPala2Spring = useSpring({
    loop: true,
    to: { rotation: -2 * Math.PI }, // Rotación inversa
    from: { rotation: 0 },
    config: { duration: 2000 / speed }
  })

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.Tanque.geometry}
        material={materials['Material.001']}
        position={[-0.047, 1.356, -0.334]}
        rotation={[0, 0, -Math.PI / 2]}
      />
      <animated.mesh
        ref={Pala1Mesh}
        geometry={nodes.Pala1.geometry}
        material={materials['default']}
        position={[0.714, 1.553, -0.325]}
        rotation-x={Math.PI / 2}
        rotation-z={rotationPala1Spring.rotation} // Usar la animación para la rotación
        scale={[0.127, 0.112, 3.029]}
      />
      <animated.mesh
        ref={Pala2Mesh}
        geometry={nodes.Pala2.geometry}
        material={materials['default']}
        position={[-0.77, 1.575, -0.325]}
        rotation-x={Math.PI / 2}
        rotation-z={rotationPala2Spring.rotation} // Usar la animación inversa
        scale={[0.127, 0.112, 3.029]}
      />
      <mesh
        geometry={nodes.ValvulaEntrada.geometry}
        material={meshMaterialValvulaEntrada}
        position={[1.591, 0.852, 0.04]}
        scale={[1, 0.656, 0.656]}
      />
      <mesh
        geometry={nodes.ValvulaSalida.geometry}
        material={meshMaterialValvulaSalida}
        position={[1.583, 0.852, -0.651]}
        scale={[1, 0.656, 0.656]}
      />
    </group>
  )
}

useGLTF.preload('/modelo3DTanque.glb')
