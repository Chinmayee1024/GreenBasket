const express = require('express');
const router = express.Router();
const { placeOrderCOD, getUserOrders, getAllOrders } = require('../controllers/orderController');
const authUser = require('../middlewares/authUserMiddleware');

router.post('/order/cod', authUser, placeOrderCOD);
router.get('/order/user', authUser, getUserOrders);
router.get('/order/seller', authUser, getAllOrders);
module.exports = router;
