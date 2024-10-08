/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 .\frontend\public\ModeloTanqueHorizontal2Palas.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'

export default function HorizontalModel(props) {
  const { nodes, materials } = useGLTF('/ModeloTanqueHorizontal2Palas.glb')
  console.log(materials)
  const milkMaterialRef = useRef()
  

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.TankCilinder.geometry} material={materials.TankMaterial} position={[0, 1.35, 0]} />
      <mesh geometry={nodes.MilkCilinder.geometry} material={materials.MilkMaterial} position={[0, 1.35, 0]} ref={milkMaterialRef}/>
    </group>
  )
}

useGLTF.preload('/ModeloTanqueHorizontal2Palas.glb')
