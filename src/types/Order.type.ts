import {z} from "zod";

export const BaseSchema = z.object({
    id: z.string().uuid({
        message: "Invalid UUID",
    }),
    created_at: z.string(), 
    updated_at: z.string(),
});

export const OrderPreviewOptionSchema = BaseSchema.extend({
    option_group_id: z.string().uuid({
        message: "Invalid UUID",
    }),
    name: z.string().min(5).max(50),
    price: z.string().min(5, {
        message: "Invalid price",
    }),
});

export const OrderPreviewItemSchema = BaseSchema.extend({
    name: z.string().min(2, {
        message: "Category name must be at least 2 characters.",
    }),
    description: z.string().optional(),
    img_url: z.string().max(255, {
        message: "Image URL must not exceed 255 characters",
    }),
    price: z.number().finite().positive({
        message: "Price must be a positive number"
    }),
    note: z.string().optional(),
    quantity: z.number().int().finite().positive({
        message: "Quantity must be a positive number"
    }),
    total_price: z.number().finite().positive({
        message: "Total price must be a positive number"
    }),
    orderitemoption: OrderPreviewOptionSchema.array(),
})

export const OrderPreviewSchema = z.object({
    user_id: z.string().uuid({
        message: "Invalid UUID",
    }),
    store_id: z.string().uuid({
        message: "Invalid UUID",
    }),
    total_price: z.number().finite().positive({
        message: "Total price must be a positive number"
    }),
    total_item: z.number().int().finite().positive({
        message: "Total item must be a positive number"
    }),
    note: z.string().optional(),
    is_take_away: z.boolean({
        message: "Is take away must be a boolean"
    }),
    payment_method: z.enum(["Cash", "Mobile_banking"], {
        message: "Payment method must be Cash or Mobile_banking"
    }),
    is_paid: z.boolean({
        message: "Is paid must be a boolean"
    }),
    status: z.enum(["Ordered", "Confirmed", "Preparing", "Finished"], {
        message: "Status must be Ordered, Confirmed, Preparing or Finished"
    }),
    orderitem: OrderPreviewItemSchema.array(),
})

export type TOrderPreviewOption = z.infer<typeof OrderPreviewOptionSchema>;

export type TOrderPreviewItem = z.infer<typeof OrderPreviewItemSchema>;

export type TOrderPreview = z.infer<typeof OrderPreviewSchema>;

export type TBase = z.infer<typeof BaseSchema>;