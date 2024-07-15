"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prismaClient_1 = __importDefault(require("../../prismaClient"));
const zod_1 = require("zod");
const getUserOrderHistory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validUserId = zod_1.z.string().uuid({
        message: "Invalid user id"
    }).parse(req.query.id);
    const existingUser = yield prismaClient_1.default.account.findUnique({
        where: {
            id: validUserId
        }
    });
    if (!existingUser) {
        res.status(400).json({
            message: "User not found"
        });
        return;
    }
    const orders = yield prismaClient_1.default.ordermenu.findMany({
        where: {
            user_id: validUserId,
            status: "Finished"
        },
        orderBy: {
            created_at: "desc"
        }
    });
    res.status(200).json({
        status: "success",
        message: "Orders retrieved successfully",
        data: orders
    });
}));
exports.default = getUserOrderHistory;
