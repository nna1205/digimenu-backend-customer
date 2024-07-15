"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getStoreDetail_1 = __importDefault(require("./getStoreDetail"));
const router = express_1.default.Router();
router.get("/:id", getStoreDetail_1.default);
exports.default = router;
