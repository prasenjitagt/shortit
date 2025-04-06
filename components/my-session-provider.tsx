"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth"; // import Session type

interface ProviderProps {
    children: React.ReactNode;
    session: Session | null; // session can be null or a Session object
}

const MySessionProvider = ({ children, session }: ProviderProps) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
};

export default MySessionProvider;
