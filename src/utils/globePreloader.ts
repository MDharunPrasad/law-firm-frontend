/**
 * Globe Data Preloader
 * Preloads globe data during initial site load for instant rendering
 */

interface GlobeData {
  features: any[];
  dots: Array<{ lng: number; lat: number; visible: boolean }>;
}

class GlobePreloader {
  private static instance: GlobePreloader;
  private globeDataCache: GlobeData | null = null;
  private isLoading = false;
  private loadPromise: Promise<GlobeData> | null = null;

  static getInstance(): GlobePreloader {
    if (!GlobePreloader.instance) {
      GlobePreloader.instance = new GlobePreloader();
    }
    return GlobePreloader.instance;
  }

  /**
   * Start preloading globe data immediately when called
   */
  async preloadGlobeData(): Promise<GlobeData> {
    // Return cached data if available
    if (this.globeDataCache) {
      return this.globeDataCache;
    }

    // Return existing promise if already loading
    if (this.loadPromise) {
      return this.loadPromise;
    }

    // Check if early preloader has already fetched the data
    if (typeof window !== 'undefined' && (window as any).__GLOBE_DATA_CACHE__) {
      console.log('🌍 Using early preloaded globe data');
      const landFeatures = (window as any).__GLOBE_DATA_CACHE__;
      this.loadPromise = this.processPreloadedData(landFeatures);
      
      try {
        const data = await this.loadPromise;
        this.globeDataCache = data;
        return data;
      } catch (error) {
        this.loadPromise = null;
        throw error;
      }
    }

    // Check if early preloader promise exists
    if (typeof window !== 'undefined' && (window as any).__GLOBE_PRELOAD_PROMISE__) {
      console.log('🌍 Waiting for early preload promise');
      try {
        const landFeatures = await (window as any).__GLOBE_PRELOAD_PROMISE__;
        if (landFeatures) {
          this.loadPromise = this.processPreloadedData(landFeatures);
          const data = await this.loadPromise;
          this.globeDataCache = data;
          return data;
        }
      } catch (error) {
        console.warn('Early preload promise failed, falling back to manual fetch');
      }
    }

    // Start loading process
    this.isLoading = true;
    this.loadPromise = this.fetchAndProcessGlobeData();

    try {
      const data = await this.loadPromise;
      this.globeDataCache = data;
      this.isLoading = false;
      console.log('🌍 Globe data preloaded successfully');
      return data;
    } catch (error) {
      this.isLoading = false;
      this.loadPromise = null;
      console.error('❌ Failed to preload globe data:', error);
      throw error;
    }
  }

  /**
   * Get cached globe data (returns null if not loaded)
   */
  getCachedGlobeData(): GlobeData | null {
    return this.globeDataCache;
  }

  /**
   * Check if globe data is currently loading
   */
  isGlobeDataLoading(): boolean {
    return this.isLoading;
  }

  /**
   * Process preloaded data from early loader
   */
  private async processPreloadedData(landFeatures: any): Promise<GlobeData> {
    return new Promise((resolve) => {
      // Generate dots for all land features
      const allDots: Array<{ lng: number; lat: number; visible: boolean }> = [];
      let totalDots = 0;
      
      landFeatures.features.forEach((feature: any) => {
        const dots = this.generateDotsInPolygon(feature, 20);
        dots.forEach(([lng, lat]) => {
          allDots.push({ lng, lat, visible: true });
          totalDots++;
        });
      });

      console.log(`🌍 Processed ${totalDots} dots from preloaded data`);

      resolve({
        features: landFeatures.features,
        dots: allDots
      });
    });
  }

  /**
   * Fetch and process globe data
   */
  private async fetchAndProcessGlobeData(): Promise<GlobeData> {
    const response = await fetch(
      "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/50m/physical/ne_50m_land.json",
    );
    
    if (!response.ok) {
      throw new Error("Failed to load land data");
    }

    const landFeatures = await response.json();
    
    // Generate dots for all land features
    const allDots: Array<{ lng: number; lat: number; visible: boolean }> = [];
    let totalDots = 0;
    
    landFeatures.features.forEach((feature: any) => {
      const dots = this.generateDotsInPolygon(feature, 20);
      dots.forEach(([lng, lat]) => {
        allDots.push({ lng, lat, visible: true });
        totalDots++;
      });
    });

    console.log(`🌍 Preloaded ${totalDots} dots across ${landFeatures.features.length} land features`);

    return {
      features: landFeatures.features,
      dots: allDots
    };
  }

  /**
   * Generate dots within polygon (optimized for preloading)
   */
  private generateDotsInPolygon(feature: any, dotSpacing = 20): [number, number][] {
    const dots: [number, number][] = [];
    
    // Use d3.geoBounds for consistent bounds calculation
    const bounds = this.geoBounds(feature);
    const [[minLng, minLat], [maxLng, maxLat]] = bounds;

    const stepSize = dotSpacing * 0.1;
    let pointsGenerated = 0;
    const maxPoints = 1000;

    for (let lng = minLng; lng <= maxLng && pointsGenerated < maxPoints; lng += stepSize) {
      for (let lat = minLat; lat <= maxLat && pointsGenerated < maxPoints; lat += stepSize) {
        const point: [number, number] = [lng, lat];
        if (this.pointInFeature(point, feature)) {
          dots.push(point);
          pointsGenerated++;
        }
      }
    }

    return dots;
  }

  /**
   * Calculate geographic bounds of a feature
   */
  private geoBounds(feature: any): [[number, number], [number, number]] {
    let minLng = Infinity, minLat = Infinity;
    let maxLng = -Infinity, maxLat = -Infinity;

    const processCoordinates = (coords: any) => {
      if (typeof coords[0] === 'number') {
        // Single coordinate pair
        const [lng, lat] = coords;
        minLng = Math.min(minLng, lng);
        maxLng = Math.max(maxLng, lng);
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
      } else {
        // Array of coordinates
        coords.forEach(processCoordinates);
      }
    };

    processCoordinates(feature.geometry.coordinates);
    return [[minLng, minLat], [maxLng, maxLat]];
  }

  /**
   * Check if point is within a feature
   */
  private pointInFeature(point: [number, number], feature: any): boolean {
    const geometry = feature.geometry;

    if (geometry.type === "Polygon") {
      const coordinates = geometry.coordinates;
      if (!this.pointInPolygon(point, coordinates[0])) {
        return false;
      }
      for (let i = 1; i < coordinates.length; i++) {
        if (this.pointInPolygon(point, coordinates[i])) {
          return false;
        }
      }
      return true;
    } else if (geometry.type === "MultiPolygon") {
      for (const polygon of geometry.coordinates) {
        if (this.pointInPolygon(point, polygon[0])) {
          let inHole = false;
          for (let i = 1; i < polygon.length; i++) {
            if (this.pointInPolygon(point, polygon[i])) {
              inHole = true;
              break;
            }
          }
          if (!inHole) {
            return true;
          }
        }
      }
      return false;
    }

    return false;
  }

  /**
   * Point in polygon algorithm
   */
  private pointInPolygon(point: [number, number], polygon: number[][]): boolean {
    const [x, y] = point;
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];

      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
        inside = !inside;
      }
    }

    return inside;
  }
}

// Export singleton instance
export const globePreloader = GlobePreloader.getInstance();

// Auto-start preloading when module loads
if (typeof window !== 'undefined') {
  // Start preloading immediately when the module is imported
  globePreloader.preloadGlobeData().catch(console.error);
}
