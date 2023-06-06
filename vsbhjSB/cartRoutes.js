import express from 'express';

import {
    set_shipping_address,
    check_out_cart
} from '../controllers/cartController.js';

const router = express.Router();

router.route('/set_shipping_address').post(set_shipping_address );
router.route('/check_out').post(check_out_cart); 

export default router;
