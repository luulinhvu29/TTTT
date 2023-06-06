import express from 'express';

import {
    get_orders_by_email
} from '../controllers/ordersController.js';

const router = express.Router();

router.route('/:email').get(get_orders_by_email);

export default router;
