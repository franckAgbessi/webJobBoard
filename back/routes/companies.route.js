const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companies.controller');

router.post('/create', companiesController.companyRegister)
router.delete('/del/:id',companiesController.deleteCompanyById)
router.get('/get/:id',companiesController.getCompanyById)
router.put('/update/:id',companiesController.updateCompanyById)
router.get('/all' , companiesController.getCompanies)

module.exports = router;