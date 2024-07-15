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
const getUserOrderHistoryWithItems = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validOrderId = zod_1.z.string().uuid({
        message: "Invalid order id"
    }).parse(req.params.id);
    const existingOrder = yield prismaClient_1.default.ordermenu.findUnique({
        where: {
            id: validOrderId
        }
    });
    if (!existingOrder) {
        res.status(400).json({
            message: "Order not found"
        });
        return;
    }
    const dbResult = yield prismaClient_1.default.ordermenu.findUnique({
        where: {
            id: validOrderId
        },
        include: {
            orderitem: {
                include: {
                    menuitem: true,
                    orderitemoption: {
                        include: {
                            optionitem: true,
                        }
                    }
                }
            }
        }
    });
    if (!dbResult) {
        res.status(404).json({
            message: "Order not found"
        });
        return;
    }
    res.status(200).json({
        status: "success",
        message: "Order retrieved successfully",
        data: dbResult,
    });
}));
exports.default = getUserOrderHistoryWithItems;
