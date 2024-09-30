/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 .\public\modeloTanqueVertical2Palas.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function VericalModel({milkQuantity, speed, ...props}) {
  const { nodes, materials } = useGLTF('/modeloTanqueVertical2Palas.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.CilindroTanque.geometry} material={materials['MaterialTanque.001']} position={[0, 2, 0]} />
      <mesh geometry={nodes.Cubo.geometry} material={materials.Material} position={[2, 0, -4]} />
      <mesh name="CilindroLeche" geometry={nodes.CilindroLeche.geometry} material={materials['MaterialLeche.001']} morphTargetDictionary={nodes.CilindroLeche.morphTargetDictionary} morphTargetInfluences={[1 - milkQuantity]} position={[0, 2, 0]} />
    </group>
  )
}

useGLTF.preload('/modeloTanqueVertical2Palas.glb')
