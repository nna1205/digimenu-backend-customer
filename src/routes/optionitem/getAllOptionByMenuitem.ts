import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const getAllOptionByMenuitem = asyncHandler(async (req: Request, res: Response) => {
    const validId = z.string().uuid({
        message: "Invalid UUID",
    }).parse(req.query.item_id);

    if (!validId) {
        res.status(400).json({ 
            status: "error",
            message: 'Invalid UUID',
            code: 400, 
        });
    }

    const existingMenuitem = await prisma.menuitem.findUnique({
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

    const redisResult = await redis.get(`item:${validId}:optiongroup`);

    if (redisResult) {
        res.status(200).json({
            status: "success",
            message: 'Optiongroup retrieved successfully',
            data: JSON.parse(redisResult),
        });
    } else {
        const dbResult = await prisma.menuitemoption.findMany({
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

        redis.set(`item:${validId}:optiongroup`, JSON.stringify(dbResult), 'EX', 600);

        res.status(200).json({
            status: "success",
            message: 'Optiongroup retrieved successfully',
            data: dbResult,
        });
    }
});

export default getAllOptionByMenuitem;