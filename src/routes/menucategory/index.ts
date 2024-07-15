import express, {Router} from "express";
import getAllCategoryByStore from "./getAllCategoryByStore";

const router: Router = express.Router();

router.get("/", getAllCategoryByStore);

export default router;