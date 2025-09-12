/**
 * Early Globe Preloader Script
 * This script should be loaded in the HTML head to start preloading as early as possible
 */

(function() {
  'use strict';
  
  // Early preload configuration
  const GLOBE_DATA_URL = "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/50m/physical/ne_50m_land.json";
  const CACHE_KEY = 'globe-data-cache';
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  
  // Check if we have cached data that's still valid
  function getCachedData() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const data = JSON.parse(cached);
        if (Date.now() - data.timestamp < CACHE_DURATION) {
          return data.content;
        }
      }
    } catch (error) {
      console.warn('Failed to read cached globe data:', error);
    }
    return null;
  }
  
  // Cache the data
  function setCachedData(data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        content: data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Failed to cache globe data:', error);
    }
  }
  
  // Start preloading immediately
  function preloadGlobeData() {
    // Check cache first
    const cached = getCachedData();
    if (cached) {
      console.log('🌍 Globe data available from cache');
      window.__GLOBE_DATA_CACHE__ = cached;
      return Promise.resolve(cached);
    }
    
    // Fetch fresh data
    console.log('🌍 Starting early globe data fetch...');
    return fetch(GLOBE_DATA_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('🌍 Globe data preloaded successfully');
        setCachedData(data);
        window.__GLOBE_DATA_CACHE__ = data;
        return data;
      })
      .catch(error => {
        console.warn('🌍 Early globe preload failed:', error);
        return null;
      });
  }
  
  // Start preloading as soon as the script runs
  if (typeof window !== 'undefined') {
    window.__GLOBE_PRELOAD_PROMISE__ = preloadGlobeData();
  }
})();
