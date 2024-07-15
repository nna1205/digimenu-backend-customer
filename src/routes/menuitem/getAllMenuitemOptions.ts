import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const getAllMenuitemOptions = asyncHandler(async (req: Request, res: Response) => {
    const validID = z.string().uuid({
        message: "Invalid UUID",
    }).parse(req.params.item_id);

    if (!validID) {
        res.status(400).json({ 
            status: "error",
            message: 'Invalid UUID',
            code: 400, 
        });
    }

    const redisResult = await redis.get(`item:${validID}`);

    if (redisResult) {
        res.status(200).json({
            status: "success",
            message: 'Menuitem retrieved successfully',
            data: JSON.parse(redisResult),
        });
    } else {
        const dbResult = await prisma.menuitem.findUnique({
            where: {
                id: validID,
            },
            include: {
                menuitemoption: {
                    include: {
                        optiongroup: {
                            include: {
                                optionitem: true,
                            }
                        }
                    }
                }
            }
        })
    
        if (!dbResult) {
            res.status(404).json({ 
                status: "error",
                message: 'Menuitem not found',
                code: 404, 
            });
            return;
        }
    
        redis.set(`item:${validID}`, JSON.stringify(dbResult), 'EX', 600);
    
        res.status(200).json({
            status: "success",
            message: 'Menuitem retrieved successfully',
            data: dbResult,
        });
    }
});

export default getAllMenuitemOptions;