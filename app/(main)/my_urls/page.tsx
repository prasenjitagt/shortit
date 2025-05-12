//app/(main)/my_urls/page.tsx

import { columns } from "./columns";
import { MyURLsDataTable } from "./data-table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/db/db_conn";
import LinkModel from "@/lib/models/link_model";
import { IndividualURLFromDataBaseType, URLType } from "@/types/my_ulrs_type";
import { sanitizeMyURLs } from "@/helpers/sanitize_my_urls";






async function getMyUrlsData(): Promise<URLType[]> {
    try {
        await connectDB("app/(main)/my_urls/page.tsx");

        const session = await getServerSession(authOptions);
        if (!session) {
            console.log("Unauthorized");
            throw new Error("Unauthorized");
        }

        const userEmail = session.user.email;
        const myUrls = await LinkModel.find({ userEmail: userEmail })
            .sort({ createdAt: -1 })
            .lean<IndividualURLFromDataBaseType[]>();




        if (!myUrls) {
            console.log("No URLs Found");
            return [];
        }

        return myUrls.map(sanitizeMyURLs);



    } catch (error) {
        console.error("Error in fetching URLs:", error);
        return [];
    }
}






export default async function InvoicesDesktopView() {



    const myUrlsData = await getMyUrlsData();


    return (
        <div className="h-full flex flex-col border p-5 rounded-lg container mx-auto">


            {/* Desktop and Tablet View Table Section */}
            <section className="hidden md:block w-full flex-1 overflow-scroll">
                <MyURLsDataTable
                    columns={columns}
                    data={myUrlsData}
                />
            </section>
        </div>
    );
}
