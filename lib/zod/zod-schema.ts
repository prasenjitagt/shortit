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
    }),
});

export type originalUrlFormType = z.infer<typeof originalUrlFormSchema>;
