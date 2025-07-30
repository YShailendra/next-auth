"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSSOLogin = async () => {
    setLoading(true);
    try {
      await signIn("supertokens",{ prompt: 'none', });
    } catch (err) {
      console.error("SSO login error:", err);
      setError(err instanceof Error ? err.message : "SSO login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back 👋</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <button
        onClick={() => void handleSSOLogin()}
        disabled={loading}
        className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 text-white font-semibold py-2 px-4 rounded shadow-lg transition disabled:bg-gray-500 flex items-center justify-center cursor-pointer"
      >
        {loading ? "Loading..." : "Login with Supertokens"}
      </button>
    </div>
  );
}
