"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllOptionByMenuitem_1 = __importDefault(require("./getAllOptionByMenuitem"));
const router = express_1.default.Router();
router.get("/", getAllOptionByMenuitem_1.default);
exports.default = router;
