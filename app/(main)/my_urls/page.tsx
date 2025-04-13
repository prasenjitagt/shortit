"use client";

import NoUrlsFoundPage from "@/components/no-urls-found";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LinkTable from "@/components/link-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useLinkStore } from "@/stores/my_urls_store";  // Import your Zustand store!

const MyURLs = () => {
    const { status } = useSession();
    const { urls, loading, page, totalPages, fetchUrls, nextPage, prevPage } = useLinkStore();

    useEffect(() => {
        if (status === "authenticated") {
            fetchUrls();
        }
    }, [status, page, fetchUrls]); // Whenever page changes, refetch URLs

    if (loading) {
        return (
            <div className="flex flex-col w-full">
                <Skeleton className="mr-[28px] mt-14 flex-grow mb-5" />
                <footer className="flex items-center justify-center gap-6 mb-3">
                    <Button variant="destructive" onClick={prevPage}>
                        Prev
                    </Button>
                    <span className="text-sm">
                        Page {page} of {totalPages}
                    </span>
                    <Button variant="destructive" onClick={nextPage}>
                        Next
                    </Button>
                </footer>
            </div>
        );
    }

    if (!urls || urls.length === 0) {
        return (
            <NoUrlsFoundPage />
        );

    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <Card className="mr-[28px] mt-14">
                    <CardHeader>
                        <CardTitle>My URLs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LinkTable urls={urls} />
                    </CardContent>
                </Card>
            </main>
            <footer className="flex items-center justify-center gap-6 mb-3">
                <Button variant="destructive" onClick={prevPage}>
                    Prev
                </Button>
                <span className="text-sm">
                    Page {page} of {totalPages}
                </span>
                <Button variant="destructive" onClick={nextPage}>
                    Next
                </Button>
            </footer>
        </div>
    );
};

export default MyURLs;
