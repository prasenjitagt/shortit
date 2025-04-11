"use client";



import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LinkTable from "@/components/link-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type ShortURL = {
    _id: string;
    originalLink: string;
    alias: string;
    clicks: number;
};

const MyURLs = () => {
    const { data: session, status } = useSession();
    const [urls, setUrls] = useState<ShortURL[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);             // Track current page
    const [pageCount, setPageCount] = useState(0);  // Intially zero


    useEffect(() => {
        const fetchURLs = async () => {
            try {
                const api_endpoint = `/api/get-urls?currentPage=${currentPage - 1}`;
                const res = await axios.get(api_endpoint);

                setUrls(res.data.urls);

                const linksPerPage = 10;
                setPageCount(Math.ceil(res.data.totalCount / linksPerPage));
            } catch (error) {
                console.error('Error fetching URLs:', error);
            } finally {
                setLoading(false);
            }
        };

        if (status === "authenticated") {    // safer than session
            fetchURLs();
        }
    }, [status, currentPage]);



    function handlePreviousPage() {
        setLoading(true);
        setCurrentPage((prev) => {

            if (prev === 1) {
                return pageCount;
            }

            return prev - 1;
        });
    }


    function handleNextPage() {
        setLoading(true);

        setCurrentPage((prev) => {

            if (prev === pageCount) {
                return 1;
            }

            return prev + 1;
        });
    }


    if (loading) {
        return (
            <div className="flex flex-col w-full">
                <Skeleton className="mr-[28px] mt-14  flex-grow mb-5" />
                <footer className="flex items-center justify-center gap-6  mb-3">
                    <Button
                        variant="destructive"
                        onClick={handlePreviousPage}
                    >
                        Prev
                    </Button>

                    <span className="text-sm ">
                        Page {currentPage} of {pageCount}
                    </span>

                    <Button
                        variant="destructive"
                        onClick={handleNextPage}
                    >
                        Next
                    </Button>
                </footer>
            </div>
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


            <footer className="flex items-center justify-center gap-6  mb-3">
                <Button
                    variant="destructive"
                    onClick={handlePreviousPage}
                >
                    Prev
                </Button>

                <span className="text-sm ">
                    Page {currentPage} of {pageCount}
                </span>

                <Button
                    variant="destructive"
                    onClick={handleNextPage}
                >
                    Next
                </Button>
            </footer>


        </div>
    );
};

export default MyURLs;
