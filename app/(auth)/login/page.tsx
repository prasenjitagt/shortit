//app/(auth)/login/page.tsx
"use client";

import { HandleLogin } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Loader2 } from "lucide-react"; // spinner icon

const Login = () => {
    const [loading, setLoading] = useState(false); // ⬅️ Add loading state

    const handleGoogleLogin = async () => {
        setLoading(true); // show loader
        await HandleLogin(); // login
        setLoading(false); // optional: might not run if redirected immediately
    };

    return (
        <main className="h-screen flex items-center justify-center">
            <Card className="w-[380px] shadow-2xl border-0 rounded-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription className="text-gray-500 mt-2">
                        Login to your account
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-4 pb-6">
                    <Button
                        onClick={handleGoogleLogin}
                        variant="outline"
                        disabled={loading} // disable while loading
                        className="w-full flex items-center justify-center gap-3 hover:bg-gray-100"
                    >
                        {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" /> // ⬅️ Show spinner if loading
                        ) : (
                            <>
                                <FcGoogle size={24} />
                                Continue with Google
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
};

export default Login;
