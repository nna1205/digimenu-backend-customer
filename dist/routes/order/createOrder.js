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
const createOrder = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validUserID = zod_1.z.string().uuid({
        message: "User ID is not valid",
    }).parse(req.body.user_id);
    const validStoreID = zod_1.z.string().uuid({
        message: "Store ID is not valid",
    }).parse(req.body.store_id);
    if (!validUserID || !validStoreID) {
        res.status(400).json({
            status: "error",
            message: "Invalid user ID or store ID",
            code: 400,
        });
        return;
    }
    const existUser = yield prismaClient_1.default.account.findUnique({
        where: {
            id: validUserID,
        },
    });
    if (!existUser) {
        res.status(400).json({
            status: "error",
            message: "User not found",
            code: 400,
        });
        return;
    }
    const existStore = yield prismaClient_1.default.store.findUnique({
        where: {
            id: validStoreID,
        },
    });
    if (!existStore) {
        res.status(400).json({
            status: "error",
            message: "Store not found",
            code: 400,
        });
        return;
    }
    const newOrder = yield prismaClient_1.default.ordermenu.create({
        data: {
            user_id: req.body.user_id,
            store_id: req.body.store_id,
            total_price: req.body.total_price,
            total_item: req.body.total_item,
            note: req.body.note,
            is_take_away: req.body.is_take_away,
            payment_method: req.body.payment_method,
            is_paid: req.body.is_paid,
            status: req.body.status,
            orderitem: {
                create: req.body.orderitem.map((item) => ({
                    menu_item_id: item.id,
                    note: item.note,
                    quantity: item.quantity,
                    total_price: item.total_price,
                    orderitemoption: {
                        create: item.orderitemoption.map((option) => ({
                            menu_item_option_id: option.id,
                        }))
                    }
                })),
            }
        },
    });
    if (!newOrder) {
        res.status(400).json({
            status: "error",
            message: "Cannot create order",
            code: 400,
        });
        return;
    }
    res.status(201).json({
        status: "success",
        message: "Order created",
        data: newOrder,
    });
}));
exports.default = createOrder;
