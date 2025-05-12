// app/api/auth/[...nextauth]/options.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import UserModel from "@/lib/models/user_model";
import connectDB from "@/lib/db/db_conn";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            // Increase the timeout for OAuth requests
            httpOptions: {
                timeout: 10000, // Increase timeout to 10 seconds (default is 3500ms)
            },
        }),
    ],

    callbacks: {
        async session({ session }) {
            if (!session.user?.email) return session;

            try {
                await connectDB("app/api/auth/[...nextauth]/options.ts"); // Ensure DB connection

                const sessionUser = await UserModel.findOne({ email: session.user.email });

                if (!sessionUser) {
                    throw new Error("No user found");
                }

                session.user.id = sessionUser._id.toString();
                return session;
            } catch (error) {
                console.error("Error during session callback:", error);
                return session; // Return the session even if there's an error
            }
        },

        async signIn({ profile }) {
            if (!profile || !profile.email || !profile.name) {
                console.log("Profile is undefined or missing fields");
                return false; // Prevent sign-in if profile is invalid
            }

            // Connect to the database
            try {
                await connectDB(); // This ensures the DB is connected

                const userExist = await UserModel.findOne({ email: profile.email });

                if (!userExist) {
                    const user = new UserModel({
                        email: profile.email,
                        name: profile.name,
                    });

                    await user.save(); // Save new user to the database
                }

                return true;
            } catch (error) {
                console.error("Error connecting to the database:", error);
                return false; // Prevent sign-in if database connection fails
            }
        },
    },

    pages: {
        signIn: "/login", // your login page
        signOut: "/", // after sign out, redirect to this path
    },

    debug: true, // Enable debug logging for more detailed logs
};
