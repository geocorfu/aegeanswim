const express = require('express');
const router = express.Router();
const beachController = require('../controllers/beachController');

// Get all islands
router.get('/islands/list', beachController.getIslands);

// Get all beaches (optionally filtered)
router.get('/', beachController.getAllBeaches);

// Get beaches by island
router.get('/:island', beachController.getBeachesByIsland);

// Search beaches
router.get('/search/:query', beachController.searchBeaches);

module.exports = router;
