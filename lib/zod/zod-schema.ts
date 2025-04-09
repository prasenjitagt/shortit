import { custom, z } from "zod";
import { fromZodError } from "zod-validation-error";

export const originalUrlFormSchema = z.object({
    email: z.string({
        required_error: "Email is required.",
    }).email("Please enter a valid email address."),

    originalUrl: z.string({
        required_error: "URL is required.",
    }).url("Please enter a valid URL."),

    alias: z.string({
        required_error: "Alias is required.",
    })
        .min(1, "Alias cannot be empty.")
        .refine((val) => !/\s/.test(val), {
            message: "Alias cannot contain spaces.",
        })
        .refine((val) => !/^www\./i.test(val), {
            message: "Alias cannot start with www.",
        })
        .refine((val) => !/\.com$/i.test(val), {
            message: "Alias cannot end with .com.",
        })
        .refine((val) => !/^https?:\/\//i.test(val), {
            message: "Alias cannot contain http or https.",
        }),
});

export type originalUrlFormType = z.infer<typeof originalUrlFormSchema>;
