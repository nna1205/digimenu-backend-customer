import express, {Router} from "express";
import getAllMenuitemOptions from "./getAllMenuitemOptions";
import getAllMenuitemByStore from "./getAllMenuitemByStore";
import getAllMenuitemOptionGroup from "./getAllMenuitemOptionGroup";

const router: Router = express.Router();

// router.get("/", asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     if (req.query.type = 'category' && req.query.categoryid) {
//         getAllMenuitemByCategory(req, res, next);
//     } else if (req.query.type = 'store' && req.query.storeid) {
//         getAllMenuitemByStore(req, res, next);
//     } else {
//         res.status(400).json({ 
//             status: "error",
//             message: 'Invalid request',
//             code: 400, 
//         });
//     }
// }));

router.get("/", getAllMenuitemByStore);
router.get("/:item_id", getAllMenuitemOptions);
router.get("/:item_id/optiongroup", getAllMenuitemOptionGroup);

export default router;