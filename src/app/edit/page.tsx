"use client";

import Link from "next/link";

export default function EditPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Video Editor</h1>
          <Link href="/">
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Back to Home
            </button>
          </Link>
        </div>

        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl text-gray-600 mb-4">Coming Soon</h2>
          <p className="text-gray-500">
            The video editor interface is under development. Check back later
            for updates!
          </p>
        </div>
      </div>
    </div>
  );
}
