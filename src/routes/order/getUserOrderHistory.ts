import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../../prismaClient";
import { z } from "zod";

const getUserOrderHistory = asyncHandler(async (req: Request, res: Response) => {
    const validUserId = z.string().uuid({
        message: "Invalid user id"
    }).parse(req.query.id);

    const existingUser = await prisma.account.findUnique({
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

    const orders = await prisma.ordermenu.findMany({
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
});

export default getUserOrderHistory;