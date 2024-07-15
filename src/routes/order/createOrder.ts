import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../../prismaClient";
import { z } from "zod";
import { OrderPreviewSchema, TOrderPreviewItem, TOrderPreviewOption } from "../../types/Order.type";

const createOrder = asyncHandler(async (req: Request, res: Response) => {
    const validUserID = z.string().uuid({
        message: "User ID is not valid",
    }).parse(req.body.user_id);
    const validStoreID = z.string().uuid({
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

    const existUser = await prisma.account.findUnique({
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

    const existStore = await prisma.store.findUnique({
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

    const newOrder = await prisma.ordermenu.create({
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
                create: req.body.orderitem.map((item: TOrderPreviewItem) => ({
                    menu_item_id: item.id,
                    note: item.note,
                    quantity: item.quantity,
                    total_price: item.total_price,
                    orderitemoption: {
                        create: item.orderitemoption.map((option: TOrderPreviewOption) => ({
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
});

export default createOrder;