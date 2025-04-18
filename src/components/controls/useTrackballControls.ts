import { useRef, useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3, MOUSE } from 'three';

/**
 * Custom hook for managing smooth trackball controls
 */
export const useTrackballControls = (
  targetPosition: Vector3 = new Vector3(0, 0, 0),
  distance: number = 7
) => {
  const { gl } = useThree();
  const controlsRef = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  // Prevent trackpad gestures
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
  
  // Setup for controls and cursor/touch interaction
  useEffect(() => {
    if (controlsRef.current) {
      // Get reference to the controls
      const controls = controlsRef.current;
      
      // Apply additional configuration for ultra-smooth movement
      if (controls._state) {
        // Force higher precision if available
        controls.enabled = true;
      }
      
      // Mobile-specific touch optimizations (directly modifying the controls)
      if (isTouchDevice && controls) {
        // Ensure touch rotation works smoothly
        controls.noZoom = true;
        controls.noPan = true;
        controls.rotateSpeed = 1.0; // Higher rotate speed for touch
      }
      
      // Set up event listeners for cursor/touch feedback
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
      
      // Set initial cursor (only for non-touch devices)
      if (!isTouchDevice) {
        document.body.style.cursor = 'grab';
      }
      
      // For both mouse and touch
      gl.domElement.addEventListener('pointerdown', onStart);
      gl.domElement.addEventListener('pointerup', onEnd);
      gl.domElement.addEventListener('pointerleave', onEnd);
      
      // Mobile-specific touch handlers for smoother interactions
      const preventDefaultTouch = (e: TouchEvent) => {
        e.preventDefault();
      };
      
      // Prevent default touch actions to avoid browser gestures interfering
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
  
  // Control configuration props
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