"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPreviewSchema = exports.OrderPreviewItemSchema = exports.OrderPreviewOptionSchema = exports.BaseSchema = void 0;
const zod_1 = require("zod");
exports.BaseSchema = zod_1.z.object({
    id: zod_1.z.string().uuid({
        message: "Invalid UUID",
    }),
    created_at: zod_1.z.string(),
    updated_at: zod_1.z.string(),
});
exports.OrderPreviewOptionSchema = exports.BaseSchema.extend({
    option_group_id: zod_1.z.string().uuid({
        message: "Invalid UUID",
    }),
    name: zod_1.z.string().min(5).max(50),
    price: zod_1.z.string().min(5, {
        message: "Invalid price",
    }),
});
exports.OrderPreviewItemSchema = exports.BaseSchema.extend({
    name: zod_1.z.string().min(2, {
        message: "Category name must be at least 2 characters.",
    }),
    description: zod_1.z.string().optional(),
    img_url: zod_1.z.string().max(255, {
        message: "Image URL must not exceed 255 characters",
    }),
    price: zod_1.z.number().finite().positive({
        message: "Price must be a positive number"
    }),
    note: zod_1.z.string().optional(),
    quantity: zod_1.z.number().int().finite().positive({
        message: "Quantity must be a positive number"
    }),
    total_price: zod_1.z.number().finite().positive({
        message: "Total price must be a positive number"
    }),
    orderitemoption: exports.OrderPreviewOptionSchema.array(),
});
exports.OrderPreviewSchema = zod_1.z.object({
    user_id: zod_1.z.string().uuid({
        message: "Invalid UUID",
    }),
    store_id: zod_1.z.string().uuid({
        message: "Invalid UUID",
    }),
    total_price: zod_1.z.number().finite().positive({
        message: "Total price must be a positive number"
    }),
    total_item: zod_1.z.number().int().finite().positive({
        message: "Total item must be a positive number"
    }),
    note: zod_1.z.string().optional(),
    is_take_away: zod_1.z.boolean({
        message: "Is take away must be a boolean"
    }),
    payment_method: zod_1.z.enum(["Cash", "Mobile_banking"], {
        message: "Payment method must be Cash or Mobile_banking"
    }),
    is_paid: zod_1.z.boolean({
        message: "Is paid must be a boolean"
    }),
    status: zod_1.z.enum(["Ordered", "Confirmed", "Preparing", "Finished"], {
        message: "Status must be Ordered, Confirmed, Preparing or Finished"
    }),
    orderitem: exports.OrderPreviewItemSchema.array(),
});
