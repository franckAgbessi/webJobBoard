const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applications.controller');

router.post('/create', applicationController.createApplication)
router.get('/all', applicationController.getApplications)
router.get('/get/:id', applicationController.getApplicationById)
router.delete('/del/:id', applicationController.deleteApplicationById)
router.put('/update/:id', applicationController.updateApplicationById)

module.exports = router;