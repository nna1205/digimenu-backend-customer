import express from "express";
import getAllOptionByMenuitem from "./getAllOptionByMenuitem";

const router = express.Router();
  
router.get("/", getAllOptionByMenuitem);

export default router;