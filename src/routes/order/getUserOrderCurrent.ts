import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../../prismaClient";
import { z } from "zod";

const getUserOrderCurrent = asyncHandler(async (req: Request, res: Response) => {
    const validId = z.string().uuid({
        message: "ID is not valid",
    }).parse(req.params.id);

        const userOrderCurrent = await prisma.ordermenu.findUnique({
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
        })

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
});

export default getUserOrderCurrent;