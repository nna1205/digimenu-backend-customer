import express from "express";
import createOrder from "./createOrder";
import getUserOrderCurrent from "./getUserOrderCurrent";
import getUserOrderHistory from "./getUserOrderHistory";
import getUserOrderHistoryWithItems from "./getUserOrderHistoryItems";

const router = express.Router();

router.get("/current/:id", getUserOrderCurrent);
router.get("/history/user", getUserOrderHistory);
router.get("/history/:id", getUserOrderHistoryWithItems);
router.post("/create", createOrder);

export default router;