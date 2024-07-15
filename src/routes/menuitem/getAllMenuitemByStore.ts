import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const getAllMenuitemByStore = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validID = z.string().uuid({
        message: "Invalid UUID",
    }).parse(req.query.store_id);

    if (!validID) {
        res.status(400).json({ 
            status: "error",
            message: 'Invalid UUID',
            code: 400, 
        });
    }
    
    const redisResult = await redis.get(`store:${validID}:items`);

    if (redisResult) {
        res.status(200).json({
            status: "success",
            message: 'Menuitem retrieved successfully',
            data: JSON.parse(redisResult),
        });
    } else {
        const dbResult = await prisma.menuitem.findMany({
            where: {
                menucategory: {
                    store_id: validID,
                }
            },
            select: {
                id: true, 
                name: true,
                description: true,
                price: true,
                img_url: true,
                created_at: true,
                updated_at: true,
                menucategory: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
            orderBy: {
                menucategory: {
                    name: 'asc',
                }
            }
        })
    
        if (dbResult.length < 1) {
            res.status(404).json({ 
                status: "error",
                message: 'Record not found',
                code: 404, 
            });
        }
    
        redis.set(`store:${validID}:items`, JSON.stringify(dbResult), 'EX', 600);
    
        res.status(200).json({
            status: "success",
            message: "Menuitem retrieved successfully",
            data: dbResult,
        });
    }
});

export default getAllMenuitemByStore;