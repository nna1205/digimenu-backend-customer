"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllOptiongroupByStore_1 = __importDefault(require("./getAllOptiongroupByStore"));
const router = express_1.default.Router();
router.get("/", getAllOptiongroupByStore_1.default);
exports.default = router;
