import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const getStoreDetail = asyncHandler(async (req: Request, res: Response) => {
    const validID = z.string().uuid({
        message: "Invalid UUID",
    }).parse(req.params.id);

    if (!validID) {
        res.status(400).json({ 
            status: "error",
            message: 'Invalid UUID',
            code: 400, 
        });
    }

    const redisResult = await redis.get(`store:${validID}`);

    if (redisResult) {
        res.status(200).json({
            status: "success",
            message: 'Store retrieved successfully',
            data: JSON.parse(redisResult),
        });
    } else {
        const dbResult = await prisma.store.findUnique({
            where: {
                id: validID,
            }
        });
    
        if (!dbResult) {
            res.status(404).json({ 
                status: "error",                
                message: 'Record not found',
                code: 404,
            });
        }
    
        redis.set(`store:${validID}`, JSON.stringify(dbResult), 'EX', 600);
    
        res.status(200).json({
            status: "success",
            message: "Store retrieved successfully",
            data: dbResult,
        });
    }
});

export default getStoreDetail;
