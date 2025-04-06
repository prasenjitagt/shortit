import { NextAuthOptions } from "next-auth";
import { connectDB } from "@/lib/db/db_conn";
import GoogleProvider from "next-auth/providers/google";
import UserModel from "@/lib/models/user_model";



export const authOptions: NextAuthOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async session({ session }) {
            if (!session.user?.email) return session;

            const sessionUser = await UserModel.findOne({ email: session.user.email });

            if (!sessionUser) {
                throw new Error("No user found");
            }

            session.user.id = sessionUser._id.toString(); // <- Convert ObjectId to string

            return session;
        },


        async signIn({ profile }) {


            if (!profile || !profile.email || !profile.name) {
                console.log("Profile is undefined or missing fields");
                return false; // prevent sign-in if profile is invalid
            }

            // Connect to the database

            try {
                const db = await connectDB();

                const userExist = await UserModel.findOne({ email: profile.email });



                if (!userExist) {
                    const user = new UserModel({
                        email: profile.email,
                        name: profile.name,

                    });


                    await user.save();
                }



                return true;
            } catch (error) {


                console.log("Error connecting to the database:", error);

                return false;
            }

        }
    },
    pages: {
        signIn: "/login",      // your login page
        signOut: "/", //after sign out redirect to this path
    }
}
