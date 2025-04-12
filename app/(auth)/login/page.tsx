"use client";

import { HandleLogin } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc"; // Google Icon

const Login = () => {
    return (
        <main className="h-screen flex items-center justify-center ">
            <Card className="w-[380px] shadow-2xl border-0 rounded-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold ">Welcome Back</CardTitle>
                    <CardDescription className="text-gray-500 mt-2">
                        Login to your account
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-4 pb-6">
                    <Button
                        onClick={HandleLogin}
                        variant="outline"
                        className="w-full flex items-center gap-3 hover:bg-gray-100"
                    >
                        <FcGoogle size={24} />
                        Continue with Google
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
};

export default Login;
