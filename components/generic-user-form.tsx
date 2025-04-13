"use client";

import type { AxiosError } from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { originalUrlFormSchema, originalUrlFormType } from "@/lib/zod/zod-schema";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useRouter } from "next/navigation";

const genericUserEmail: string = "genericuser@example.com";

// 👇 cleaner type
type FormDataType = originalUrlFormType & { alias: string };

const GenericUserUrlForm = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [shortLink, setShortLink] = useState<string | null>(null); // 👈 for displaying short link

    const form = useForm<FormDataType>({
        resolver: zodResolver(originalUrlFormSchema),
        defaultValues: {
            email: genericUserEmail,
            originalUrl: "",
            alias: "",
        },
    });

    async function onSubmit(values: FormDataType) {
        setSubmitting(true);
        setShortLink(null); // Reset old short link

        try {
            // 1. Check alias availability
            const resCheckAlias = await axios.get(`/api/check-alias?alias=${values.alias}`);
            const available = resCheckAlias.data.available;

            if (!available) {
                form.setError("alias", { type: "manual", message: "Alias is already taken ❌" });
                return;
            }

            // 2. Register short link
            const resRegShortLink = await axios.post("/api/reg-link", {
                alias: values.alias,
                originalUrl: values.originalUrl,
                email: values.email,
            });

            const resRegShortLinkData: { message: string; shortLink: string } = resRegShortLink.data;

            // 3. Show success toast
            const toastId = toast(`Your link is live ✅`, {
                description: (
                    <div className="text-lg">
                        Sign In for more options
                    </div>
                ),
                duration: Infinity,
                action: {
                    label: "SignIn",
                    onClick: () => {
                        toast.dismiss(toastId);
                        router.replace("/login")
                    },
                },
            });

            // 4. Set shortLink to show below form too
            setShortLink(resRegShortLinkData.shortLink);

            form.reset(); // Optional: reset form after success

        } catch (err: unknown) {
            const error = err as AxiosError<{ error: string }>; // 👈 cast it properly
            console.error(error);

            if (error.response?.data?.error) {
                form.setError("alias", { type: "manual", message: error.response.data.error });
            } else {
                form.setError("alias", { type: "manual", message: "Failed to register alias. Try again!" });
            }

            toast.error("Something went wrong ❌", {
                description: "Please try again later.",
            });
        }
        finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Original URL Input */}
                    <FormField
                        control={form.control}
                        name="originalUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Original URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com" disabled={submitting} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Alias Input */}
                    <FormField
                        control={form.control}
                        name="alias"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Customize Link</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-2">
                                        <Card className="px-4 py-2">
                                            <CardContent className="p-0">
                                                <p className="text-gray-500">www.shortit.com</p>
                                            </CardContent>
                                        </Card>
                                        <div className="flex items-center border rounded-md px-3 py-2 w-full">
                                            <span className="text-gray-400">/</span>
                                            <input
                                                {...field}
                                                placeholder="Enter Alias"
                                                className="border-none focus:outline-none focus:ring-0 w-full bg-transparent pl-2"
                                                disabled={submitting}
                                            />
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <Button type="submit" disabled={submitting} className="w-[150px]">
                            {submitting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>

            {/* Short Link Display */}
            {shortLink && (
                <div className="text-center space-y-2">
                    <p className="text-gray-600">Your shortened URL:</p>
                    <a href={shortLink} target="_blank" className=" underline text-lg">
                        {shortLink}
                    </a>
                </div>
            )}
        </div>
    );
};

export default GenericUserUrlForm;
