const {newPayment, checkStatus} = require('../../controller/phonepe/paymentController');
const express = require('express');
const router = express();

router.post('/payment', newPayment);
router.post('/status/:txnId', checkStatus);

module.exports = router;