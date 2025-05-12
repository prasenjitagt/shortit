"use client"
import { FaArrowRightLong } from "react-icons/fa6";
import { ColumnDef } from "@tanstack/react-table";
import { LuCopy } from "react-icons/lu";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import { URLType } from "@/types/my_ulrs_type";
import { my_urls_route } from "@/lib/api_endpoints";
import { showToast } from "@/helpers/show_toast";
import UrlsShowToolTip from "@/components/urls/urls_show_tooltip";
import { TbClick } from "react-icons/tb";
import { LuDelete } from "react-icons/lu";
import { LuQrCode } from "react-icons/lu";
import QRCodeDialog from "@/components/urls/qr_code_dialog";


export const columns: ColumnDef<URLType>[] = [

    //select
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />

        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    //URL
    {
        accessorKey: "alias",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    URL
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },


        cell: ({ row }) => {
            const shortLink = `http://localhost:3000/${row.original.alias}`;
            const originalLink = row.original.originalLink;
            const slicedOriginalLink = originalLink.slice(0, 30) + (originalLink.length > 30 ? '...' : '');
            return (
                <div className="flex space-x-2 items-center">
                    <section className="flex items-center space-x-2">

                        <p className="font-semibold">
                            {shortLink}
                        </p>


                        <LuCopy
                            className="cursor-pointer"
                            onClick={() => {
                                navigator.clipboard.writeText(shortLink);
                                showToast("Short URL Copied ✅");
                            }}
                        />
                    </section>

                    <section className="flex items-center space-x-1 text-muted-foreground">
                        <FaArrowRightLong />
                        <UrlsShowToolTip
                            longLink={originalLink}
                            slicedLongLink={slicedOriginalLink}
                        />
                    </section>

                </div>
            )
        }
    },



    //Issue Date
    {
        accessorKey: "createdAt",
        header: "Issue Date",
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt);
            const formattedDate = date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
            return <p>{formattedDate}</p>;
        },
    },

    //Clicks
    {
        accessorKey: "clicks",
        header: "Clicks",
        cell: ({ row }) => {
            const clickCount = row.original.clicks;
            return (
                <div className="flex hover:text-blue-400 justify-center items-center border p-1 space-x-2">
                    <TbClick />
                    <p>
                        {clickCount}
                    </p>
                </div>
            );
        }

    },

    // actions
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const eachURL = row.original;
            return <MyURLsActions eachURL={eachURL} />
        },
    },


]

function MyURLsActions({ eachURL }: { eachURL: URLType }) {
    const router = useRouter();

    const handleDeleteURL = async () => {
        const confirmResult = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete the URL?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete!",
        });

        if (confirmResult.isConfirmed) {
            try {
                // Send the URLId in the URL as a query parameter
                const res = await axios.delete(`${my_urls_route}?URLId=${eachURL._id}`);

                if (res.status === 200) {
                    showToast("URL deleted successfully");

                    router.refresh();
                }
            } catch (error) {
                console.error("Error deleting URL:", error);
                showToast("Error deleting URL");
            }
        }
    };

    const shortLink = `http://localhost:3000/${eachURL.alias}`;


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">


                <QRCodeDialog shortLink={shortLink} />

                <DropdownMenuItem
                    className="cursor-pointer flex space-x-2"

                    onClick={() => {
                        navigator.clipboard.writeText(eachURL._id);
                        showToast("URL ID Copied");
                    }}
                >
                    <LuCopy className="text-accent-foreground" />
                    <p>Copy URL ID</p>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer flex space-x-2"
                    onClick={handleDeleteURL}
                >
                    <LuDelete />
                    <p>Delete URL</p>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}