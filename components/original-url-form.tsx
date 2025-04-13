"use client";

import { toast } from "sonner"; // 👈 ADD this import at the top
import { AxiosError } from "axios";
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
import { useSession } from "next-auth/react";  // Import next-auth session hook

const OriginalUrlForm = () => {
    const [submitting, setSubmitting] = useState(false);

    // Fetch current user email from next-auth session
    const { data: session } = useSession();
    const currentUserEmail = session?.user?.email || "";  // Fallback to empty string if no email is available

    const form = useForm<originalUrlFormType & { alias: string }>({
        resolver: zodResolver(originalUrlFormSchema),
        defaultValues: {
            email: currentUserEmail,  // Use the dynamic email here
            originalUrl: "",
            alias: "",
        },
    });

    async function onSubmit(values: originalUrlFormType & { alias: string }) {
        setSubmitting(true);

        try {
            // 1. Check alias availability first
            const res = await axios.get(`/api/check-alias?alias=${values.alias}`);
            const available = res.data.available;

            if (!available) {
                form.setError("alias", { type: "manual", message: "Alias is already taken ❌" });
                return;
            }



            await axios.post("/api/reg-link", {
                alias: values.alias,
                originalUrl: values.originalUrl,
                email: values.email,
            });

            function showToast() {
                const toastId = toast("Your link is live ✅", {
                    description: "Click the button below to collapse me.",
                    duration: Infinity, // 👈 Stay open forever until user clicks
                    action: {
                        label: "Collapse",
                        onClick: () => {
                            toast.dismiss(toastId); // 👈 Collapse/dismiss on button click
                        },
                    },
                });
            }

            showToast(); // 👈 Call the function to show the toast

            form.reset(); // 👈 Optional: reset form after success

        } catch (err) {
            const error = err as AxiosError<{ error: string }>;

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
                                <Input placeholder="https://example.com" {...field} />
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
                                        />
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-center">
                    <Button type="submit" disabled={submitting} className="w-[150px] cursor-pointer">
                        {submitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            "Register"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default OriginalUrlForm;
