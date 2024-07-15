"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createOrder_1 = __importDefault(require("./createOrder"));
const getUserOrderCurrent_1 = __importDefault(require("./getUserOrderCurrent"));
const getUserOrderHistory_1 = __importDefault(require("./getUserOrderHistory"));
const getUserOrderHistoryItems_1 = __importDefault(require("./getUserOrderHistoryItems"));
const router = express_1.default.Router();
router.get("/current/:id", getUserOrderCurrent_1.default);
router.get("/history/user", getUserOrderHistory_1.default);
router.get("/history/:id", getUserOrderHistoryItems_1.default);
router.post("/create", createOrder_1.default);
exports.default = router;
