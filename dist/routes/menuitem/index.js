"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllMenuitemOptions_1 = __importDefault(require("./getAllMenuitemOptions"));
const getAllMenuitemByStore_1 = __importDefault(require("./getAllMenuitemByStore"));
const getAllMenuitemOptionGroup_1 = __importDefault(require("./getAllMenuitemOptionGroup"));
const router = express_1.default.Router();
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
router.get("/", getAllMenuitemByStore_1.default);
router.get("/:item_id", getAllMenuitemOptions_1.default);
router.get("/:item_id/optiongroup", getAllMenuitemOptionGroup_1.default);
exports.default = router;
