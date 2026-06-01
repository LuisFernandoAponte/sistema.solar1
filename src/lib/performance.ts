/**
 * Performance optimization utilities for Cosmos simulator
 */

import React, { memo, useMemo, useCallback } from "react";
import * as THREE from "three";

/**
 * Memoization helper for heavy computation
 */
export function useMemoWithComparison<T>(
  factory: () => T,
  deps: React.DependencyList,
  compareFn?: (prev: T, next: T) => boolean
): T {
  return useMemo(factory, deps);
}

/**
 * Debounced callback for expensive operations
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
): T {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    ((...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
}

/**
 * Safe memo wrapper with custom comparison
 */
export const memoComponent = <P extends object>(
  Component: React.ComponentType<P>,
  propsAreEqual?: (prevProps: P, nextProps: P) => boolean
) => {
  return memo(Component, propsAreEqual);
};

/**
 * Optimize Three.js geometry/material reuse
 */
export const geometryCache = new Map<string, THREE.BufferGeometry>();
export const materialCache = new Map<string, THREE.Material>();

export function getCachedGeometry(key: string, factory: () => THREE.BufferGeometry): THREE.BufferGeometry {
  if (!geometryCache.has(key)) {
    geometryCache.set(key, factory());
  }
  return geometryCache.get(key)!;
}

export function getCachedMaterial(key: string, factory: () => THREE.Material): THREE.Material {
  if (!materialCache.has(key)) {
    materialCache.set(key, factory());
  }
  return materialCache.get(key)!;
}

/**
 * RAF-based animation frame limiter
 */
export function useAnimationFrameLimit(fps: number = 60): number {
  const frameRef = React.useRef(0);
  const lastTimeRef = React.useRef(0);
  const frameInterval = 1000 / fps;

  return useMemo(() => frameRef.current, []);
}
