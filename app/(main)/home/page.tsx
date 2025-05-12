import React from "react";
import OriginalUrlForm from "@/components/original-url-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
    return (
        <div className="h-full w-full flex items-center justify-center p-4 ">

            <Card className=" max-w-md shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Paste Your Link Here
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* This is the form component */}
                    <OriginalUrlForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default Home;
