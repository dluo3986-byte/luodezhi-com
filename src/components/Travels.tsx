"use client";

import { useState } from "react";

const HASH = "dfd1d70782dbb6002cec7b1e95fc3ea1dafb534f3e17b11e57d01dd640a9c35c";

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

interface Trip {
  destination: string;
  dates: string;
  description: string;
  emoji: string;
  highlights: string[];
  rating?: string;
  status?: "completed" | "in-progress";
}

const trips: Trip[] = [
  {
    destination: "New England Road Trip",
    dates: "May 2026",
    emoji: "🦞",
    status: "in-progress",
    description:
      "A family road trip from Long Island north through Portsmouth, NH and up to Bar Harbor, Maine — still in progress.",
    highlights: [
      "Day 1: Departed Long Island, drove up to Portsmouth, NH",
      "Day 2: Explored downtown Portsmouth — visited the theater and picked up local souvenirs",
      "Highlight lunch at Stewman's Lobster Pound, Bar Harbor: Lobster Roll, Lobster Bisque & Mussel (rating: 4.5/5 — mussel was slightly off)",
      "Visited Acadia National Park and photographed the iconic Bass Harbor Head Light Station with family",
      "Arrived Bar Harbor around 3:30 PM — stunning coastal scenery",
    ],
    rating: "4.5 / 5",
  },
];

export default function Travels() {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const hash = await sha256(input);
    if (hash === HASH) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setInput("");
    }
  }

  return (
    <section id="travels" className="py-24 bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Around the World
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Travels</h2>
        </div>

        {!unlocked ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-xl mb-2">Private Section</h3>
            <p className="text-gray-400 text-sm mb-8">Enter the password to view travel memories.</p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-full max-w-xs">
              <input
                type="password"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false); }}
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              />
              {error && (
                <p className="text-red-400 text-xs">Incorrect password. Try again.</p>
              )}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors duration-200 text-sm"
              >
                Unlock
              </button>
            </form>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {trips.map((trip) => (
              <div
                key={trip.destination}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-indigo-500/50 transition-colors flex flex-col gap-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{trip.emoji}</span>
                    <div>
                      <h3 className="text-white font-semibold text-lg leading-tight">{trip.destination}</h3>
                      <p className="text-indigo-400 text-sm">{trip.dates}</p>
                    </div>
                  </div>
                  {trip.status === "in-progress" && (
                    <span className="shrink-0 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium rounded-full">
                      In Progress
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">{trip.description}</p>

                {/* Highlights */}
                <div>
                  <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-3">Highlights</p>
                  <ul className="space-y-2">
                    {trip.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-gray-400 text-sm leading-relaxed">
                        <span className="text-indigo-400 shrink-0 mt-0.5">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rating */}
                {trip.rating && (
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-800">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-gray-300 text-sm font-medium">{trip.rating}</span>
                    <span className="text-gray-500 text-sm">overall rating</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
