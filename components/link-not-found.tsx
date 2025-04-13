// app/error-page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LinkNotFound = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.push("/"); // Redirect the user back to the homepage or another page
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="text-center text-white p-6 rounded-lg shadow-lg max-w-sm">
                <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
                <p className="mb-4 text-lg">We couldn&apos;t find the link you were looking for.</p>

                <Button
                    onClick={handleGoBack}
                    className="cursor-pointer"
                >
                    Go Back
                </Button>
            </div>
        </div>
    );
};

export default LinkNotFound;
