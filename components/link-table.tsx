

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import { downloadQRCode } from "@/lib/download_qr";
import { useLinkStore } from "@/stores/my_urls_store";


interface LinkTableProps {
    urls: {
        _id: string;
        originalLink: string;
        alias: string;
        clicks: number;
    }[];
}

function showToast(message: string) {
    toast(message, {
        duration: 2000, // 2 seconds
    });
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";




const LinkTable = ({ urls }: LinkTableProps) => {

    const deleteUrl = useLinkStore(state => state.deleteUrl);


    const handleDelete = async (id: string) => {
        try {
            await deleteUrl(id);
            showToast("Link Deleted ✅");
        } catch (error) {
            console.error(error);
            showToast("Failed to delete ❌");
        }
    };




    return (
        <div className="w-full overflow-x-auto">
            <Table className="min-w-[600px] w-full table-fixed">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center ">Sl. No.</TableHead>
                        <TableHead className="text-center">Original Link</TableHead>
                        <TableHead className="text-center">Short Link</TableHead>
                        <TableHead className="text-center ">Clicks</TableHead>
                        <TableHead className="text-center">QR Code</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {urls.map((url, index) => {
                        const shortLink = `${baseUrl}/${url.alias}`;
                        const originalLink = url.originalLink;

                        return (
                            <TableRow key={url._id}>

                                <TableCell className="text-center">{index + 1}</TableCell>

                                <TableCell className="text-center">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(originalLink);
                                                        showToast("Link Copied ✅");
                                                    }}
                                                >
                                                    {originalLink.length > 25
                                                        ? `${originalLink.slice(0, 25)}...`
                                                        : originalLink}
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{originalLink}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </TableCell>

                                <TableCell className="text-center">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(shortLink);
                                                        showToast("Link Copied ✅");
                                                    }}
                                                >
                                                    {shortLink.length > 25
                                                        ? `${shortLink.slice(0, 25)}...`
                                                        : shortLink}
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{shortLink}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </TableCell>

                                <TableCell className="text-center">{url.clicks}</TableCell>

                                <TableCell className="text-center">
                                    <Button
                                        onClick={() => downloadQRCode(shortLink)}
                                        disabled={!shortLink}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400 cursor-pointer"
                                    >Download QR</Button>
                                </TableCell>

                                <TableCell className="text-center">
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(url._id)}
                                        className="cursor-pointer"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>

                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

        </div>
    );
};

export default LinkTable;
