//actions/actions.ts
"use client";

import { signIn, signOut } from "next-auth/react";

export const HandleLogin = async () => {
    try {
        await signIn("google", { callbackUrl: "/home" });
    } catch (error) {
        console.error("Login failed:", error);
    }
};

export const HandleLogOut = async () => {
    try {
        await signOut({ callbackUrl: "/login" });
    } catch (error) {
        console.error("Logout failed:", error);
    }
};




