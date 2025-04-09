"use client";

import { signIn, signOut } from "next-auth/react";

export const HandleLogin = async () => signIn("google", { callbackUrl: "/" });
export const HandleLogOut = async () => signOut({ callbackUrl: "/" });





