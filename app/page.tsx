"use client";
import { ShortenedLinkResponse } from "@/lib/types/next_response";
import Link from "next/link";
import { useState } from "react";


export default function Home() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [original_link, setOriginal_link] = useState("");

  const [original_link_error, setOriginal_link_error] = useState("");

  const [loading, setLoading] = useState(false);


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleOriginalLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginal_link(e.target.value);
    setOriginal_link_error("");
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setEmailError("Invalid Email");
      return;
    }
    if (!original_link.includes("https://")) {
      setOriginal_link_error("Invalid link");
      return;
    }



    setLoading(true);


    try {
      const res = await fetch("/api/reg_link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, original_link }),
      });

      const data: ShortenedLinkResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }



      window.alert(`Link created successfully: ${data.short_link}`);
      setEmail("");
      setOriginal_link("");
      setEmailError("");
      setOriginal_link_error("");
      setLoading(false);
    } catch (error) {
      setEmailError("Invalid email or password" + error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative md:mt-10 mt-8">
      <div className="p-6">

        <button className="absolute top-5 right-4">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 4L12 12"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex justify-center mb-6 py-2">

        </div>

        <h2 className="text-2xl font-semibold mb-1">Paste Link</h2>


        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-xl mb-1 md:py-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full p-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#5C2FA8] ${emailError ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="example@gmail.com"
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          <input
            type="text"
            id="original_link"
            value={original_link}
            onChange={handleOriginalLinkChange}
            className={`w-full p-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#5C2FA8] ${original_link_error ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="https://example.com"
          />

          <button
            type="submit"
            className="mt-10 w-full bg-[#5C2FA8] text-xl font-semibold text-white py-4 rounded-md hover:bg-purple-700 transition-colors"
            disabled={loading}
          >
            {loading ? "In progress..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
