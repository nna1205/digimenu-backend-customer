import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const getAllMenuitemByCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validID = z.string().uuid({
        message: "Invalid UUID",
    }).parse(req.query.categoryid);

    if (!validID) {
        res.status(400).json({ 
            status: "error",
            message: 'Invalid UUID',
            code: 400, 
        });
    }

    const redisResult = await redis.get(`category:${validID}:items`);

    if (redisResult) {
        res.status(200).json({
            status: "success",
            message: 'Menuitem retrieved successfully',
            data: JSON.parse(redisResult),
        });
    } else {
        const dbResult = await prisma.menuitem.findMany({
            where: {
                menu_category_id: validID,
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
        })
    
        if (dbResult.length < 1) {
            res.status(404).json({ 
                status: "error",
                message: 'Record not found',
                code: 404, 
            });
        }
    
        redis.set(`category:${validID}:items`, JSON.stringify(dbResult), 'EX', 600);
    
        res.status(200).json({
            status: "success",
            message: "Menuitem retrieved successfully",
            data: dbResult,
        });
    }
});

export default getAllMenuitemByCategory;