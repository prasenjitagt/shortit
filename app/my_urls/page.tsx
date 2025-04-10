"use client";


import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { my_screensizes } from "@/constants/screensize";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LinkTable from "@/components/link-table";
import { Skeleton } from "@/components/ui/skeleton";

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

                const api_endpoint = '/api/get-urls'

                const res = await axios.get(api_endpoint);

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
            <div className="w-full">
                <Skeleton className="mr-[28px] mt-14 h-full" />
            </div>
        );
    }

    return (
        <div >
            <Card className="mr-[28px] mt-14">
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
