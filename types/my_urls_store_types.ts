export interface ShortURL {
    _id: string;
    userEmail: string;
    originalLink: string;
    alias: string;
    clicks: number;
    createdAt: string;
    updatedAt: string;
}

export interface ShortURLResponse {
    urls: ShortURL[];
    totalCount: number;
}

export interface LinkStore {
    urls: ShortURL[];
    loading: boolean;
    fetchUrls: () => Promise<void>;
    deleteUrl: (id: string) => Promise<void>;
}