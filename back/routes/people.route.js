const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/people.controller');
const addressController = require('../controllers/adress.controller')
router.post('/signup', peopleController.signup)

router.post('/login', peopleController.login)
router.get('/all',peopleController.getUsers)
router.get('/check/:id',peopleController.getUserById)
router.delete('/del/:id',peopleController.deleteUserById)
router.put('/update/:id', peopleController.updateUserById)
router.get('/getAddress/:id',addressController.getAddressById)
router.get('/getLogType/:id',peopleController.getLogTypeById)

module.exports = router;