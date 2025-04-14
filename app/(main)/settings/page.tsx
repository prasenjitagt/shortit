"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

interface Items {
    title: string;
    url: string;
}

const items: Items[] = [
    {
        title: "Profile",
        url: "/profile",
    },
    {
        title: "Example",
        url: "/example"
    }
];

const Settings = () => {
    const router = useRouter();
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <Card className="w-[400px] shadow-2xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Settings</CardTitle>
                    <CardDescription>Manage your preferences</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {items.map((currentItem, idx) => {
                        const isLast = idx === items.length - 1;

                        return (
                            <div key={idx}>
                                <Button
                                    variant="ghost"
                                    className="cursor-pointer flex items-center justify-between w-full "
                                    onClick={() => router.push(`/${currentItem.url}`)}
                                >
                                    {currentItem.title}
                                </Button>
                                {!isLast && <Separator className="my-2" />}
                            </div>
                        );
                    })}

                </CardContent>
            </Card>
        </div>
    );
};

export default Settings;
