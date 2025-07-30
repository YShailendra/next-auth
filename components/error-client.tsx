"use client"
import { useSearchParams } from "next/navigation";

export default function ErrorClient() {
    const searchParams = useSearchParams()
    const error = searchParams.get("error");
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error || "An error occurred during authentication"}
    </div>
}