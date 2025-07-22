const express = require('express');
const router = express.Router();
const routineController = require('../controllers/routineController');

// GET /api/routines/getroutines
router.get('/getroutines', routineController.getAllRoutines);

// POST /api/routines/add (optional for admin panel)
router.post('/add', routineController.addRoutine);

router.get('/admin/getroutines', routineController.getAllRoutines);
router.post('/admin/add', routineController.addRoutine);
router.put('/admin/:id', routineController.updateRoutine);
router.delete('/admin/:id', routineController.deleteRoutine);
module.exports = router;
