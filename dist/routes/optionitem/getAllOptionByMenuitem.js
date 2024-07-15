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
const zod_1 = require("zod");
const prismaClient_1 = __importDefault(require("../../prismaClient"));
const redisClient_1 = __importDefault(require("../../redisClient"));
const getAllOptionByMenuitem = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validId = zod_1.z.string().uuid({
        message: "Invalid UUID",
    }).parse(req.query.item_id);
    if (!validId) {
        res.status(400).json({
            status: "error",
            message: 'Invalid UUID',
            code: 400,
        });
    }
    const existingMenuitem = yield prismaClient_1.default.menuitem.findUnique({
        where: {
            id: validId,
        }
    });
    if (!existingMenuitem) {
        res.status(404).json({
            status: "error",
            message: 'Menuitem not found',
            code: 404,
        });
    }
    const redisResult = yield redisClient_1.default.get(`item:${validId}:optiongroup`);
    if (redisResult) {
        res.status(200).json({
            status: "success",
            message: 'Optiongroup retrieved successfully',
            data: JSON.parse(redisResult),
        });
    }
    else {
        const dbResult = yield prismaClient_1.default.menuitemoption.findMany({
            where: {
                menu_item_id: validId,
            },
            select: {
                optiongroup: {
                    include: {
                        optionitem: true,
                    }
                }
            }
        });
        if (!dbResult) {
            res.status(404).json({
                status: "error",
                message: 'Optiongroup not found',
                code: 404,
            });
        }
        redisClient_1.default.set(`item:${validId}:optiongroup`, JSON.stringify(dbResult), 'EX', 600);
        res.status(200).json({
            status: "success",
            message: 'Optiongroup retrieved successfully',
            data: dbResult,
        });
    }
}));
exports.default = getAllOptionByMenuitem;
