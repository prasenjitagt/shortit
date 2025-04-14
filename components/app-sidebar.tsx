import { Home, Settings, LogOut, LayoutDashboard, Link as IconLink } from "lucide-react";
import Link from "next/link";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./dark-mode";

// Menu items
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Home",
        url: "/home",
        icon: Home,
    },


    {
        title: "My URLs",
        url: "/my_urls",
        icon: IconLink,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent >


                <SidebarGroup>
                    <SidebarGroupLabel className="flex items-center justify-between gap-2">
                        {/* Dark Mode Toggle */}
                        <ModeToggle />
                        {/* Logout Button at Top */}

                    </SidebarGroupLabel>
                </SidebarGroup>



                <SidebarGroup>


                    <SidebarGroupContent >
                        <SidebarMenu >
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="flex items-center gap-2">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>


                <SidebarGroup>
                    <ModeToggle />

                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
