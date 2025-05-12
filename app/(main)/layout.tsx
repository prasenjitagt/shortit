// app/(main)/layout.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import MySessionProvider from "@/components/my-session-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    return (
        <MySessionProvider session={session}>
            <SidebarProvider>
                <AppSidebar />
                <section className="w-full px-6 pb-4">
                    <div className="my-2 ">
                        <SidebarTrigger />
                    </div>
                    {children}
                </section>
            </SidebarProvider>
        </MySessionProvider>
    );
}
