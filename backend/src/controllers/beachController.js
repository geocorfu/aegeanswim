const beachData = require('../data/beaches.json');

// Cache for performance
let cachedBeaches = null;
let cacheTimestamp = null;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function getBeachDataFromCache() {
  const now = Date.now();
  if (cachedBeaches && cacheTimestamp && (now - cacheTimestamp < CACHE_TTL)) {
    return cachedBeaches;
  }

  cachedBeaches = beachData;
  cacheTimestamp = now;
  return cachedBeaches;
}

// Get all unique island names
exports.getIslands = (req, res) => {
  try {
    const data = getBeachDataFromCache();
    const islands = Object.keys(data.beaches).sort();

    const islandDetails = islands.map(island => ({
      id: island,
      name: island.charAt(0).toUpperCase() + island.slice(1),
      beachCount: data.beaches[island].length
    }));

    res.json({
      total: islands.length,
      islands: islandDetails
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch islands', message: error.message });
  }
};

// Get all beaches (optionally filtered by protection level or meltemi shield)
exports.getAllBeaches = (req, res) => {
  try {
    const data = getBeachDataFromCache();
    const { protection, meltemiShield } = req.query;

    let allBeaches = [];

    Object.entries(data.beaches).forEach(([island, beaches]) => {
      beaches.forEach(beach => {
        allBeaches.push({
          ...beach,
          island: island
        });
      });
    });

    // Apply filters if provided
    if (protection) {
      allBeaches = allBeaches.filter(b => b.protection === protection);
    }

    if (meltemiShield) {
      allBeaches = allBeaches.filter(b => b.meltemiShield === meltemiShield);
    }

    res.json({
      total: allBeaches.length,
      beaches: allBeaches,
      metadata: data.metadata
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch beaches', message: error.message });
  }
};

// Get beaches by island
exports.getBeachesByIsland = (req, res) => {
  try {
    const data = getBeachDataFromCache();
    const { island } = req.params;
    const islandLower = island.toLowerCase();

    if (!data.beaches[islandLower]) {
      return res.status(404).json({
        error: 'Island not found',
        message: `No beach data available for "${island}". Please check available islands at /api/beaches/islands/list`
      });
    }

    const beaches = data.beaches[islandLower].map(beach => ({
      ...beach,
      island: islandLower
    }));

    res.json({
      island: island,
      total: beaches.length,
      beaches: beaches
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch beaches', message: error.message });
  }
};

// Search beaches by name or description
exports.searchBeaches = (req, res) => {
  try {
    const data = getBeachDataFromCache();
    const { query } = req.params;
    const searchTerm = query.toLowerCase();

    let results = [];

    Object.entries(data.beaches).forEach(([island, beaches]) => {
      beaches.forEach(beach => {
        if (
          beach.name.toLowerCase().includes(searchTerm) ||
          beach.description.toLowerCase().includes(searchTerm) ||
          island.includes(searchTerm)
        ) {
          results.push({
            ...beach,
            island: island
          });
        }
      });
    });

    res.json({
      query: query,
      total: results.length,
      beaches: results
    });
  } catch (error) {
    res.status(500).json({ error: 'Search failed', message: error.message });
  }
};
