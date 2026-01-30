import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    console.log('Health check received');
    res.status(200).json({ status: 'OK' });
});

export default router;