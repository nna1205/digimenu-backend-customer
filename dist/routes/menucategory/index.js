"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllCategoryByStore_1 = __importDefault(require("./getAllCategoryByStore"));
const router = express_1.default.Router();
router.get("/", getAllCategoryByStore_1.default);
exports.default = router;
