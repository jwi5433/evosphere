import { useRef, useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3, MOUSE } from 'three';

export const useTrackballControls = (
  targetPosition: Vector3 = new Vector3(0, 0, 0),
  distance: number = 7
) => {
  const { gl } = useThree();
  const controlsRef = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    gl.domElement.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      gl.domElement.removeEventListener('wheel', handleWheel);
    };
  }, [gl]);
  
  useEffect(() => {
    if (controlsRef.current) {
      const controls = controlsRef.current;
      
      if (controls._state) {
        controls.enabled = true;
      }
      
      if (isTouchDevice && controls) {
        controls.noZoom = true;
        controls.noPan = true;
        controls.rotateSpeed = 1.0; 
      }

      const onStart = () => {
        if (!isTouchDevice) {
          document.body.style.cursor = 'grabbing';
        }
        setIsDragging(true);
      };
      
      const onEnd = () => {
        if (!isTouchDevice) {
          document.body.style.cursor = 'grab';
        }
        setIsDragging(false);
      };
      
      if (!isTouchDevice) {
        document.body.style.cursor = 'grab';
      }
      
      gl.domElement.addEventListener('pointerdown', onStart);
      gl.domElement.addEventListener('pointerup', onEnd);
      gl.domElement.addEventListener('pointerleave', onEnd);
      
      const preventDefaultTouch = (e: TouchEvent) => {
        e.preventDefault();
      };
      
      gl.domElement.addEventListener('touchstart', preventDefaultTouch, { passive: false });
      gl.domElement.addEventListener('touchmove', preventDefaultTouch, { passive: false });
      gl.domElement.addEventListener('touchend', preventDefaultTouch, { passive: false });
      
      return () => {
        gl.domElement.removeEventListener('pointerdown', onStart);
        gl.domElement.removeEventListener('pointerup', onEnd);
        gl.domElement.removeEventListener('pointerleave', onEnd);
        
        gl.domElement.removeEventListener('touchstart', preventDefaultTouch);
        gl.domElement.removeEventListener('touchmove', preventDefaultTouch);
        gl.domElement.removeEventListener('touchend', preventDefaultTouch);
        
        if (!isTouchDevice) {
          document.body.style.cursor = 'default';
        }
      };
    }
  }, [gl, controlsRef, isTouchDevice]);
  
  const controlProps = {
    ref: controlsRef,
    noZoom: true,
    noPan: true,
    rotateSpeed: isTouchDevice ? 1.0 : 0.6,
    dynamicDampingFactor: 0.05,
    minDistance: distance,
    maxDistance: distance,
    target: targetPosition,
    mouseButtons: {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN
    },
    staticMoving: false
  };
  
  return { 
    controlsRef,
    controlProps, 
    isDragging, 
    isTouchDevice,
    updateControls: () => {
      if (controlsRef.current) {
        controlsRef.current.update();
      }
    }
  };
}; 