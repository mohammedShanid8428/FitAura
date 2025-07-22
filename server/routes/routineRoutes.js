const express = require('express');
const router = express.Router();
const routineController = require('../controllers/routineController');

// GET /api/routines/getroutines
router.get('/getroutines', routineController.getAllRoutines);

// POST /api/routines/add (optional for admin panel)
router.post('/add', routineController.addRoutine);

module.exports = router;
