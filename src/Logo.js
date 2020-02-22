import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import Debug from 'debug'
import { Dom, useFrame, useThree } from 'react-three-fiber'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

const debug = Debug('rtf:logo')
export function Loading() {
  return <code> loading </code>
}


export default function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  //
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <dodecahedronBufferGeometry attach="geometry" />
      <meshStandardMaterial
        attach="material"
        roughness={0.75}
        emissive="#404057"
        color={hovered ? 'hotpink' : '#222'} />
    </mesh>
  )
}

