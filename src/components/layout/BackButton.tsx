"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="hover:opacity-70">
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 6 6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.5}
          d="M3.75 4.75l-1.75-1.75 1.75-1.75"
        />
      </svg>
    </button>
  );
}
