import express from "express";
import getAllOptiongroupByStore from "./getAllOptiongroupByStore";

const router = express.Router();
  
router.get("/", getAllOptiongroupByStore);

export default router;