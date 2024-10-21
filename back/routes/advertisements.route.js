const express = require('express');
const router = express.Router();
const advertisementsController = require('../controllers/advertisements.controller');
const addressController = require('../controllers/adress.controller')

router.post('/create', advertisementsController.advertisementsRegister)
router.get('/all', advertisementsController.getAdvertisements)
router.get('/get/:id',advertisementsController.getAdvertisementById)
router.delete('/del/:id',advertisementsController.deleteAdvertisementById)
router.put('/update/:id',advertisementsController.updateAdvertisementById)
router.get('/getAddress/:id',addressController.getAddressById)
router.get('/getContract/:id',advertisementsController.getContractById)
module.exports = router;