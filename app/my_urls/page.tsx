"use client";


import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { my_screensizes } from "@/constants/screensize";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LinkTable from "@/components/link-table";

type ShortURL = {
    _id: string;
    originalLink: string;
    alias: string;
    clicks: number;
};

const MyURLs = () => {
    const { data: session } = useSession();
    const [urls, setUrls] = useState<ShortURL[]>([]);
    const [loading, setLoading] = useState(true);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    useEffect(() => {
        const fetchURLs = async () => {
            try {
                const res = await axios.get('/api/get-urls');
                setUrls(res.data.urls);
            } catch (error) {
                console.error('Error fetching URLs:', error);
            } finally {
                setLoading(false);
            }
        };

        if (session) {
            fetchURLs();
        }
    }, [session]);


    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 w-">
                <span className="text-muted-foreground text-lg">Loading...</span>
            </div>
        );
    }

    return (
        <div className={`${my_screensizes}  border-red-500 border-[2px] `}>
            <Card>
                <CardHeader>
                    <CardTitle>My URLs</CardTitle>
                </CardHeader>
                <CardContent>
                    <LinkTable urls={urls} />
                </CardContent>


            </Card>
        </div>
    );
};

export default MyURLs;
