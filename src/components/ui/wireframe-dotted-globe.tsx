"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { globePreloader } from "../../utils/globePreloader"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
}

export default function RotatingEarth({ width = 1200, height = 800, className = "" }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadingMessage, setLoadingMessage] = useState("Initializing Globe...")

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    // Set up responsive dimensions
    const containerWidth = Math.min(width, window.innerWidth - 40)
    const containerHeight = Math.min(height, window.innerHeight - 100)
    const radius = Math.min(containerWidth, containerHeight) / 2

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    // Create projection and path generator for Canvas
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }

      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates
        // Check if point is in outer ring
        if (!pointInPolygon(point, coordinates[0])) {
          return false
        }
        // Check if point is in any hole (inner rings)
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false // Point is in a hole
          }
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        // Check each polygon in the MultiPolygon
        for (const polygon of geometry.coordinates) {
          // Check if point is in outer ring
          if (pointInPolygon(point, polygon[0])) {
            // Check if point is in any hole
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) {
              return true
            }
          }
        }
        return false
      }

      return false
    }

    const generateDotsInPolygon = (feature: any, dotSpacing = 20) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds

      const stepSize = dotSpacing * 0.1 // Increased step size for faster generation
      let pointsGenerated = 0
      const maxPoints = 1000 // Limit max points per feature for performance

      for (let lng = minLng; lng <= maxLng && pointsGenerated < maxPoints; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat && pointsGenerated < maxPoints; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) {
            dots.push(point)
            pointsGenerated++
          }
        }
      }

      console.log(
        `[v0] Generated ${pointsGenerated} points for land feature:`,
        feature.properties?.featurecla || "Land",
      )
      return dots
    }

    interface DotData {
      lng: number
      lat: number
      visible: boolean
    }

    const allDots: DotData[] = []
    let landFeatures: any

    const render = () => {
      // Clear canvas
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      // Draw ocean (globe background)
      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = "#ffffff0a"
      context.fill()
      context.strokeStyle = "#db7906"
      context.lineWidth = 2 * scaleFactor
      context.stroke()

      if (landFeatures) {
        // Draw graticule
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = "#db7906"
        context.lineWidth = 1 * scaleFactor
        context.globalAlpha = 0.25
        context.stroke()
        context.globalAlpha = 1

        // Draw land outlines
        context.beginPath()
        landFeatures.features.forEach((feature: any) => {
          path(feature)
        })
        context.strokeStyle = "#ffffff"
        context.lineWidth = 1 * scaleFactor
        context.stroke()

        // Draw halftone dots
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath()
            context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = "#db7906"
            context.fill()
          }
        })
      }
    }

    const loadWorldData = async () => {
      try {
        setIsLoading(true)

        // Try to get cached data first for instant loading
        const cachedData = globePreloader.getCachedGlobeData();
        
        if (cachedData) {
          // Use preloaded data for instant rendering
          console.log('🌍 Using preloaded globe data for instant display');
          setLoadingMessage("Ready!");
          
          landFeatures = { features: cachedData.features };
          
          // Clear existing dots and use preloaded ones
          allDots.length = 0;
          allDots.push(...cachedData.dots);
          
          render();
          
          // Minimal delay to show "Ready!" message
          setTimeout(() => setIsLoading(false), 200);
          return;
        }

        // Fallback: Load data on demand if preloading failed
        console.log('⏳ Loading globe data on demand...');
        setLoadingMessage("Loading Globe Data...");
        
        const globeData = await globePreloader.preloadGlobeData();
        
        landFeatures = { features: globeData.features };
        allDots.length = 0;
        allDots.push(...globeData.dots);

        console.log(`🌍 Globe loaded with ${globeData.dots.length} dots across ${globeData.features.length} land features`);

        render();
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load globe data:', err);
        setError("Failed to load land map data");
        setIsLoading(false);
      }
    }

    // Set up rotation and interaction
    const rotation: [number, number] = [0, 0]
    const rotationSpeed = 0.5

    const rotate = () => {
      rotation[0] += rotationSpeed
      projection.rotate(rotation)
      render()
    }

    // Auto-rotation timer
    const rotationTimer = d3.timer(rotate)

    // Load the world data
    loadWorldData()

    // Cleanup
    return () => {
      rotationTimer.stop()
    }
  }, [width, height])

  if (error) {
    return (
      <div className={`dark flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="dark text-destructive font-semibold mb-2">Error loading Earth visualization</p>
          <p className="dark text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading overlay with fade zoom-out effect */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center globe-loading-overlay z-10 rounded-2xl">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gold-accent border-t-transparent rounded-full animate-spin animate-pulse-glow mx-auto"></div>
            <p className="text-gold-accent text-center mt-4 animate-fade-in font-medium">{loadingMessage}</p>
          </div>
        </div>
      )}
      
      {/* Globe placeholder when loading */}
      {isLoading && (
        <div className="w-full h-auto rounded-2xl bg-gradient-to-br from-navy-primary/20 to-blue-supportive/20 animate-pulse flex items-center justify-center min-h-[400px]">
          <div className="w-64 h-64 rounded-full border-2 border-dashed border-gold-accent/30 animate-pulse"></div>
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        className={`w-full h-auto rounded-2xl bg-transparent transition-all duration-1000 ease-out animate-zoom-out ${
          isLoading 
            ? 'opacity-0 scale-110 blur-sm absolute inset-0' 
            : 'opacity-100 scale-100 blur-0 relative'
        }`}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  )
}
