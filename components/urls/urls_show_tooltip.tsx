import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface UrlsShowToolTipProps {
    longLink: string,
    slicedLongLink: string
}

export default function UrlsShowToolTip({ longLink, slicedLongLink }: UrlsShowToolTipProps) {

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{slicedLongLink}</TooltipTrigger>
                <TooltipContent>
                    <p>{longLink}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}



