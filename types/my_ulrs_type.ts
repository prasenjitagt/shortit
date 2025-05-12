// types/Link.ts (or wherever you organize types)

import { ObjectId } from 'mongodb';

//Individual URL Type for Client Components
export interface URLType {
    _id: string;
    userEmail: string;
    originalLink: string;
    alias: string;
    clicks: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


//Individual Expense Type for Server Components
export interface IndividualURLFromDataBaseType {
    _id: ObjectId;
    userEmail: string;
    originalLink: string;
    alias: string;
    clicks: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

