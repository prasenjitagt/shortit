"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ResponseDataType {
    redirectLink: string;
}

interface UserPageProps {
    params: Promise<{ link: string }>; // ✅ Params is now a Promise
}

const LinkPage: React.FC<UserPageProps> = ({ params }) => {
    const [link, setLink] = useState<string | null>(null);

    const router = useRouter();

    // ✅ Unwrap params using useEffect
    useEffect(() => {
        const fetchParams = async () => {
            const resolvedParams = await params; // Await params Promise
            setLink(resolvedParams.link);
        };

        fetchParams();
    }, [params]); // ✅ Ensure it runs when params change

    useEffect(() => {
        if (!link) return; // ✅ Avoid running API call with undefined link

        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/redirect/${link}`);
                const data: ResponseDataType = response.data; // ✅ Type the response data

                router.replace(data.redirectLink);
            } catch (error) {
                console.error("API Error:", error);
            }
        };

        fetchData();
    }, [link]); // ✅ Run API call when link is available

    return <div>{link ? "Redirecting..." : "Loading..."}</div>; // ✅ Show "Loading..." until params resolve
};

export default LinkPage;
