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
const getUserOrderCurrent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validId = zod_1.z.string().uuid({
        message: "ID is not valid",
    }).parse(req.params.id);
    const userOrderCurrent = yield prismaClient_1.default.ordermenu.findUnique({
        where: {
            id: validId,
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
    if (!userOrderCurrent) {
        res.status(404).json({
            status: "error",
            message: 'Order not found',
            code: 404,
        });
    }
    res.status(200).json({
        status: "success",
        message: 'Order retrieved successfully',
        data: userOrderCurrent,
    });
}));
exports.default = getUserOrderCurrent;
