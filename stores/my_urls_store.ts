// stores/my_urls_store.ts

import { create } from "zustand";
import axios from "axios";
import { LinkStore, ShortURLResponse } from "@/types/my_urls_store_types";
import { my_urls_route } from "@/lib/api_endpoints";



export const useLinkStore = create<LinkStore>((set, get) => ({
    urls: [],
    loading: false,



    fetchUrls: async () => {
        set({ loading: true });
        try {
            const res = await axios.get(my_urls_route);
            const responseData: ShortURLResponse = res.data;

            set({
                urls: responseData.urls,
            });
        } catch (error) {
            console.error("Failed to fetch URLs:", error);
        } finally {
            set({ loading: false });
        }
    },

    deleteUrl: async (id) => {
        try {
            const res = await axios.delete(`${my_urls_route}?id=${id}`);
            if (res.status !== 200) throw new Error("Failed to delete");

            set((state) => ({
                urls: state.urls.filter((url) => url._id !== id),
            }));
        } catch (error) {
            console.error("Failed to delete URL:", error);
        }
    },

}));
