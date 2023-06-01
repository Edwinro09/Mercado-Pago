import {Router} from "express";
import {
    receiveWebhook,
    CreateOrder,
} from "../controllers/payment.controllers.js";
const router = Router()

router.post('/create-order',CreateOrder)

router.get('/success', (req, res) => res.send('success')) 
router.get('/failure', (req, res) => res.send('failure')) 
router.get('/pending', (req, res) => res.send('pending')) 
router.post('/webhook', receiveWebhook) 

export default router
