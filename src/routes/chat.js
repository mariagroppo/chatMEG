import { getChat } from "../controllers/chat.js";
import express from 'express';

const router = express.Router();

/* GET Vista de todos los productos -------------------------------- */
router.get('/', getChat);

export default router;