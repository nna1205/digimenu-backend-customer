import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../../prismaClient";
import { z } from "zod";

const getUserOrderHistoryWithItems = asyncHandler(async (req: Request, res: Response) => {
    const validOrderId = z.string().uuid({
        message: "Invalid order id"
    }).parse(req.params.id);

    const existingOrder = await prisma.ordermenu.findUnique({
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

    const dbResult = await prisma.ordermenu.findUnique({
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
});

export default getUserOrderHistoryWithItems;