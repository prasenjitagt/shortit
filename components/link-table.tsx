

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
        <div>
            <Table>
                <TableCaption>My URLs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Original Link</TableHead>
                        <TableHead>Short Link</TableHead>
                        <TableHead>Clicks</TableHead>
                    </TableRow>
                </TableHeader>



                <TableBody>
                    {urls.map((url) => (
                        <TableRow key={url._id}>
                            <TableCell className="w-[300px]">{url.originalLink}</TableCell>
                            <TableCell className="w-[300px]">{`${process.env.NEXT_PUBLIC_SITE_URL}/${url.alias}`}</TableCell>
                            <TableCell>{url.clicks}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </div>
    );
};

export default LinkTable;
