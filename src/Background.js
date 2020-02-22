import React, {useRef, useMemo} from 'react'
import * as THREE from 'three'
import Debug from 'debug'
import { useThree, useFrame, extend } from 'react-three-fiber'

const debug = Debug('rtf:background')

export function Loading() {
  return <code> loading </code>
}


export default function (props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  const { camera } = useThree()

  const background = new THREE.TextureLoader().load(process.env.PUBLIC_URL + '/sky.jpg')

  return (
    <mesh {...props} ref={mesh}>
      <planeGeometry attach="geometry" args={[1.6, .9]}/>
      <meshStandardMaterial
        attach="material"
        roughness={0.75}
        map={background}
        />
    </mesh>
  )
}


export function Sky (props) {
  const mesh = useRef()
  const { size } = useThree()
  debug({size})

  const background = new THREE.TextureLoader().load(process.env.PUBLIC_URL + '/sky.jpg')

  const geometry = new THREE.PlaneGeometry(size.width, size.height);

  return (
    <mesh
      {...props}
      geometry={geometry}
    position={[0,0,0]}
      material={new THREE.MeshLambertMaterial({
        map: background
      })}
    >
    </mesh>
  )
}
