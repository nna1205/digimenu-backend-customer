import express from "express";
import getStoreDetail from "./getStoreDetail";

const router = express.Router();

router.get("/:id", getStoreDetail);

export default router;