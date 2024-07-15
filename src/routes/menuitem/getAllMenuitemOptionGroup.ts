import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const formatOptionGroupResult = (menuitemoption: any): string[] => {
    const result: string[] = [];
    menuitemoption.forEach((item: any) => {
        result.push(item.optiongroup.id)
    })
    return result;
}

const getAllMenuitemOptionGroup = asyncHandler(async (req: Request, res: Response) => {
    const validID = z.string().uuid({
        message: "Invalid UUID",
    }).parse(req.params.itemid);

    if (!validID) {
        res.status(400).json({ 
            status: "error",
            message: 'Invalid UUID',
            code: 400, 
        });
    }

    const redisResult = await redis.get(`item:${validID}:optiongroup`);

    if (redisResult) {
        res.status(200).json({
            status: "success",
            message: 'Menuitem optiongroup retrieved successfully',
            data: formatOptionGroupResult(JSON.parse(redisResult)[0].menuitemoption),
        });
    } else {
        const dbResult = await prisma.menuitem.findMany({
            where: {
                id: validID,
            },
            select: {
                menuitemoption: {
                    select: {
                        optiongroup: true,
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
    
        redis.set(`item:${validID}:optiongroup`, JSON.stringify(dbResult), 'EX', 600);
    
        res.status(200).json({
            status: "success",
            message: 'Menuitem optiongroup retrieved successfully',
            data: formatOptionGroupResult(dbResult[0].menuitemoption),
        });
    }
});

export default getAllMenuitemOptionGroup;