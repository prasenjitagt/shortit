import { IndividualURLFromDataBaseType, URLType } from "@/types/my_ulrs_type";


export
    function sanitizeMyURLs(eachURL: IndividualURLFromDataBaseType): URLType {
    return {
        _id: eachURL._id.toString(),
        userEmail: eachURL.userEmail,
        originalLink: eachURL.originalLink,
        alias: eachURL.alias,
        clicks: eachURL.clicks,
        createdAt: eachURL.createdAt.toString(),
        updatedAt: eachURL.updatedAt.toString(),
        __v: eachURL.__v
    };
}