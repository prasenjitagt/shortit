// stores/my_urls_store.ts

import { create } from "zustand";
import axios from "axios";

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

interface LinkStore {
    urls: ShortURL[];
    loading: boolean;
    page: number;
    linksPerPage: number;
    totalPages: number;
    fetchUrls: () => Promise<void>;
    deleteUrl: (id: string) => Promise<void>;
    nextPage: () => void;
    prevPage: () => void;
}

export const useLinkStore = create<LinkStore>((set, get) => ({
    urls: [],
    loading: false,
    page: 1,
    linksPerPage: 8, // match API
    totalPages: 1,



    fetchUrls: async () => {
        set({ loading: true });
        try {
            const currentPage = get().page - 1; // Adjust page to zero-based index
            const res = await axios.get(`/api/get-urls?currentPage=${currentPage}&linksPerPage=${get().linksPerPage}`);
            const responseData: ShortURLResponse = res.data;

            set({
                urls: responseData.urls,
                totalPages: Math.ceil(responseData.totalCount / get().linksPerPage), // Calculate total pages
            });
        } catch (error) {
            console.error("Failed to fetch URLs:", error);
        } finally {
            set({ loading: false });
        }
    },

    deleteUrl: async (id) => {
        try {
            const res = await axios.delete(`/api/get-urls?id=${id}`);
            if (res.status !== 200) throw new Error("Failed to delete");

            set((state) => ({
                urls: state.urls.filter((url) => url._id !== id),
            }));
        } catch (error) {
            console.error("Failed to delete URL:", error);
        }
    },

    nextPage: () => {
        const { page, totalPages } = get();
        if (page < totalPages) {
            set({ page: page + 1 });
            get().fetchUrls();
        }
    },

    prevPage: () => {
        const { page } = get();
        if (page > 1) {
            set({ page: page - 1 });
            get().fetchUrls();
        }
    },
}));
