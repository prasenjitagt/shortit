"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LinkNotFound from "@/components/link-not-found";
import { ImSpinner9 } from "react-icons/im";

interface ResponseDataType {
    originalLink: string;
}

interface UserPageProps {
    params: Promise<{ alias: string }>; // Params is now a Promise
}

const LinkPage: React.FC<UserPageProps> = ({ params }) => {
    const [alias, setAlias] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null); // State for error messages
    const router = useRouter();

    useEffect(() => {
        const fetchParams = async () => {
            const resolvedParams = await params; // Unwrap the promise to access alias
            setAlias(resolvedParams.alias);
        };

        fetchParams();
    }, [params]); // Ensure this effect runs when params changes

    useEffect(() => {
        if (!alias) return;

        const getOriginalLink = async () => {
            try {
                const response = await axios.get(`/api/redirect?alias=${alias}`);
                const data: ResponseDataType = response.data;

                // Redirect the user to the original link
                router.replace(data.originalLink);
            } catch (error) {
                console.error("API Error:", error);
                setError("The link you requested could not be found.");
            }
        };

        getOriginalLink();
    }, [alias, router]); // Run this effect when alias changes

    return (
        <div>
            {error ? (
                <LinkNotFound />
            ) : (
                <div className="h-screen w-screen flex justify-center items-center">

                    <ImSpinner9 className="animate-spin scale-[3]" />
                </div>
            )}
        </div>
    );
};

export default LinkPage;
