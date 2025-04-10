
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button"
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
import { toast } from "sonner";
import { downloadQRCode } from "@/lib/download_qr";


function showToast() {
    toast("Link Copied ✅", {
        duration: 2000, // 2 seconds
    });
}



interface LinkTableProps {
    urls: {
        _id: string;
        originalLink: string;
        alias: string;
        clicks: number;
    }[];
}

const LinkTable = ({ urls }: LinkTableProps) => {

    if (!urls || urls.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 w-">
                <span className="text-muted-foreground text-lg">No URLs found</span>
            </div>
        );

    }


    return (
        <div className="w-full overflow-x-auto">
            <Table className="min-w-[600px] w-full table-fixed">
                <TableCaption>My URLs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Original Link</TableHead>
                        <TableHead className="text-center">Short Link</TableHead>
                        <TableHead className="text-center">Clicks</TableHead>
                        <TableHead className="text-center">QR Code</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {urls.map((url) => {
                        const shortLink = `${process.env.NEXT_PUBLIC_SITE_URL}/${url.alias}`;
                        const originalLink = url.originalLink;

                        return (
                            <TableRow key={url._id}>
                                <TableCell className="text-center">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(originalLink);
                                                        showToast();
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
                                                        showToast();
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


                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

        </div>
    );
};

export default LinkTable;
