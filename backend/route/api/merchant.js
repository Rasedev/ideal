const express = require('express');
const router = express.Router();
const {merchantController, getAllStoreController} = require('../../controller/merchantController');

router.post('/becomemerchant', merchantController);
router.get('/allstore', getAllStoreController);

module.exports = router;   