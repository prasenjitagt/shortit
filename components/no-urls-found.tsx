"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FcBrokenLink } from "react-icons/fc";
import { useRouter } from 'next/navigation';


const NoUrlsFoundPage = () => {
    const router = useRouter();  // Initialize the router

    const handleRedirect = () => {
        router.push('/home');  // Navigate to the /home page
    };
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <Card className="mx-4">
                <CardHeader className='flex flex-col items-center justify-center'>
                    <CardTitle className=" ">
                        Oops, No URLs Found!
                    </CardTitle>
                    <FcBrokenLink className=' text-5xl' />
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center">
                    It looks like you haven’t created any URLs yet.
                    <br />
                    Start by adding a new one!
                    <Button onClick={handleRedirect} className="mt-5 text-slate-400 bg-blue-500 hover:bg-blue-600 cursor-pointer">
                        Create New URL
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default NoUrlsFoundPage;
