"use client"

import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Text, Preload } from '@react-three/drei'
import { easing, geometry } from 'maath'
import { suspend } from 'suspend-react'
import { useRoute, useLocation } from "wouter"
import type { GroupProps, MeshProps } from '@react-three/fiber'
import type { MutableRefObject } from 'react'

// Extend geometry for roundedPlaneGeometry
extend(geometry)

// Type definitions
interface FrameProps extends GroupProps {
  id: string
  name: string
  author: string
  bg?: string
  width?: number
  height?: number
  children?: React.ReactNode
}

interface RigProps {
  position?: THREE.Vector3
  focus?: THREE.Vector3
}

// Declare roundedPlaneGeometry for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      roundedPlaneGeometry: any
    }
  }
}

function Frame({ id, name, author, bg, width = 1, height = 1.61803398875, children, ...props }: FrameProps) {
    const portal = useRef()
    const [, setLocation] = useLocation()
    const [, params] = useRoute('/item/:id')
    const [hovered, hover] = useState(false)
    useCursor(hovered)
    useFrame((state, dt) => easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt))
    return (
        <group {...props}>
            <Text fontSize={0.2} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.375, 0.715, 0.01]} material-toneMapped={false}>
                {name}
            </Text>
            <Text fontSize={0.1} anchorX="right" position={[0.4, -0.659, 0.01]} material-toneMapped={false}>
                /{id}
            </Text>
            <Text fontSize={0.04} anchorX="right" position={[0.0, -0.677, 0.01]} material-toneMapped={false}>
                {author}
            </Text>
            <mesh name={id} onDoubleClick={(e) => (e.stopPropagation(), setLocation('/item/' + e.object.name))} onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
                <roundedPlaneGeometry args={[width, height, 0.1]} />
                <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.DoubleSide}>
                    <color attach="background" args={[bg]} />
                    {children}
                </MeshPortalMaterial>
            </mesh>
        </group>
    )
}

function InteractiveButton({ position = [0, -2, 0] }) {
    const meshRef = useRef()
    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)
    
    useCursor(hovered)
    
    useFrame((state, delta) => {
        if (meshRef.current) {
            easing.damp3(meshRef.current.scale, hovered ? [1.1, 1.1, 1.1] : [1, 1, 1], 0.2, delta)
            easing.damp3(meshRef.current.rotation, [0, state.clock.elapsedTime * 0.5, 0], 0.1, delta)
        }
    })
    
    const handleClick = () => {
        setClicked(true)
        // Add your button action here
        alert("Let's go out! 🎉")
        setTimeout(() => setClicked(false), 200)
    }
    
    return (
        <group position={position}>
            <mesh
                ref={meshRef}
                onClick={handleClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <roundedPlaneGeometry args={[2, 0.6, 0.1]} />
                <meshStandardMaterial 
                    color={clicked ? "#4ade80" : hovered ? "#3b82f6" : "#1e293b"}
                    emissive={hovered ? "#1e40af" : "#000000"}
                    emissiveIntensity={hovered ? 0.2 : 0}
                />
            </mesh>
            <Text
                position={[0, 0, 0.01]}
                fontSize={0.2}
                color={hovered ? "#ffffff" : "#e2e8f0"}
                anchorX="center"
                anchorY="middle"
                material-toneMapped={false}
            >
                Yes, let's go! ✨
            </Text>
        </group>
    )
}

function Rig({ position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0) }) {
    const { controls, scene } = useThree()
    const [, params] = useRoute('/item/:id')
    useEffect(() => {
        const active = scene.getObjectByName(params?.id)
        if (active) {
            active.parent.localToWorld(position.set(0, 0.5, 0.25))
            active.parent.localToWorld(focus.set(0, 0, -2))
        }
        controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
    })
    return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
}

const WamimiPage = () => {
    const [rootElement, setRootElement] = useState<HTMLElement | null>(null)
    
    useEffect(() => {
        setRootElement(document.getElementById('root'))
    }, [])
    
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gray-900'>
            <div className='my-5 text-white text-xl font-light'>
                Wanna go out?
            </div>
            <Canvas 
                flat 
                camera={{ fov: 75, position: [0, 0, 20] }} 
                eventSource={rootElement || undefined}
                eventPrefix="client"
                className="w-full h-full"
            >
                {/* Dark background */}
                <color attach="background" args={['#0f172a']} />
                
                {/* Ambient lighting for better visibility */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={0.5} />
                
                <Frame id="01" name={`Picnic\n@Tigoni?`} author="Omar Faruq Tawsif" bg="#e4cdac" position={[-1.15, 0, 0]} rotation={[0, 0.5, 0]}>
                    <Gltf src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb" scale={8} position={[0, -0.7, -2]} />
                </Frame>
                <Frame id="02" name={`Coffee\nDate?`} author="Omar Faruq Tawsif">
                    <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} />
                </Frame>
                <Frame id="03" name={`Watch\nInfinity\nCastle?`} author="Omar Faruq Tawsif" bg="#d1d1ca" position={[1.15, 0, 0]} rotation={[0, -0.5, 0]}>
                    <Gltf src="still_life_based_on_heathers_artwork-transformed.glb" scale={2} position={[0, -0.8, -4]} />
                </Frame>
                
                {/* 3D Interactive Button */}
                <InteractiveButton position={[0, -2.5, 0]} />
                
                <Rig />
                <Preload all />
            </Canvas>
        </div>
    )
}

export default WamimiPage