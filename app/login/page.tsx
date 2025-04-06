"use client";


import { useSession, signIn, signOut } from "next-auth/react";


const Login = () => {
    const HandleLogin = async () => signIn("google", { callbackUrl: "/" });
    const HandleLogOut = async () => signOut({ callbackUrl: "/" });

    const { data: session, status } = useSession();




    return (
        <section>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-3xl font-bold">Login</h1>
                <button onClick={HandleLogin} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Login with Google</button>
                <button onClick={HandleLogOut} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Logout</button>

            </div>
        </section>
    )
}

export default Login