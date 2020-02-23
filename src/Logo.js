import React, { useRef, useState, Suspense } from 'react'
//import * as THREE from 'three'
import Debug from 'debug'
import { useLoader, useFrame, useThree } from 'react-three-fiber'

//import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

const debug = Debug('rtf:logo')
export function Loading() {
  return <code> loading </code>
}

function Asset ({url}) {
  const gltf = useLoader(GLTFLoader, url)
  const group = useRef()
  debug({group})

  useFrame(() => {
    group.current.rotation.y += (.05 % (Math.PI/2))
  })
  return <group ref={group} position={[0,0,3.8]} >
    <primitive object={gltf.scene} dispose={null} position={[0,0,0]} rotation={[Math.PI/2, 0, 0]} color={'#222'}/>
  </group>
}

export function Logo (props) {
  const { gl } = useThree()

  debug({
    pcl: gl.physicallyCorrectLights,
    gl
  })
  //gl.physicallyCorrectLights = true

  return <Suspense fallback={<Box {...props}/>}>
    <Asset {...props} url={[process.env.PUBLIC_URL,'untitled.glb'].join('/')} />
  </Suspense>
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

