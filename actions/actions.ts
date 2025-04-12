"use client";

import { signIn, signOut } from "next-auth/react";

export const HandleLogin = async () => signIn("google", { callbackUrl: "/home" });
export const HandleLogOut = async () => signOut({ callbackUrl: "/login" });





