import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const getAllCategoryByStore = asyncHandler(async (req: Request, res: Response) => {
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

    const redisResult = await redis.get(`store:${validID}:categories`);

    if (redisResult) {
        res.status(200).json({
            status: "success",
            message: 'Category retrieved successfully',
            data: JSON.parse(redisResult),
        });
    } else {
        const dbResult = await prisma.menucategory
            .findMany({
                where: {
                    store_id: validID
                }
            });
    
        if (!dbResult) {
            res.status(404).json({ 
                status: "error",
                message: 'Record not found',
                code: 404, 
            });
        }
    
        redis.set(`store:${validID}:categories`, JSON.stringify(dbResult), 'EX', 600);
    
        res.status(200).json({
            status: "success",
            message: "Category retrieved successfully",
            data: dbResult,
        });
    }
});

export default getAllCategoryByStore;