"use client";

import { useState } from "react";
import Image from "next/image";

const HASH = "dfd1d70782dbb6002cec7b1e95fc3ea1dafb534f3e17b11e57d01dd640a9c35c";

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

interface Day {
  day: number;
  title: string;
  highlights: string[];
  rating?: string;
  photos?: { src: string; alt: string }[];
}

interface PreTripEvent {
  period: string;
  note: string;
  type?: "warning" | "info";
}

interface Trip {
  destination: string;
  dates: string;
  description: string;
  emoji: string;
  status?: "completed" | "in-progress";
  rating?: string;
  preTripTimeline?: PreTripEvent[];
  days: Day[];
  upcomingPlans?: string[];
}

const trips: Trip[] = [
  {
    destination: "New England Road Trip",
    dates: "May 2026",
    emoji: "🦞",
    status: "in-progress",
    rating: "4.3 / 5",
    description:
      "A family road trip from Long Island north through Portsmouth NH, Bar Harbor ME, and continuing on to Moncton, Hopewell Rocks, and Quebec — with a return to New York by June 1st.",
    days: [
      {
        day: 1,
        title: "Long Island → Portsmouth, NH",
        highlights: [
          "Departed Long Island and drove north",
          "Arrived in Portsmouth, NH for the night",
        ],
      },
      {
        day: 2,
        title: "Portsmouth Sightseeing → Bar Harbor, ME",
        highlights: [
          "Explored downtown Portsmouth — visited the historic theater and picked up local souvenirs",
          "Arrived in Bar Harbor around 3:30 PM",
          "Lunchner at Stewman's Lobster Pound: Lobster Roll, Lobster Bisque & Mussels",
          "Personal rating for Stewman's: 4.5/5 — food was great, mussel was slightly off",
          "Visited Acadia National Park and photographed Bass Harbor Head Light Station with family",
        ],
      },
      {
        day: 3,
        title: "Bar Harbor — Rest Day & Acadia Sunset",
        highlights: [
          "Spent most of the day at Best Western hotel — rest and recovery",
          "Headed out to Acadia National Park in the late afternoon",
          "Watched the sunset before 8:00 PM — stunning coastal views",
          "Good day overall; a minor family dispute about wet jeans — specifically where to hang them to dry (settled on placing them under the exhaust vents)",
        ],
      },
      {
        day: 4,
        title: "En Route to Moncton, New Brunswick",
        highlights: [
          "Departing Bar Harbor and heading to Moncton, NB for the evening",
          "Arriving in Moncton for one night, departing the following day",
          "Hotel accommodation still being arranged",
        ],
      },
    ],
    upcomingPlans: [
      "Moncton, New Brunswick (Day 4 — one night)",
      "Hopewell Rocks Provincial Park",
      "Quebec City",
      "Return to New York by June 1st",
    ],
  },
  {
    destination: "Bolivia",
    dates: "December 24 – 30, 2025",
    emoji: "🦙",
    status: "completed",
    description:
      "A family trip to Bolivia over the Christmas period — from the chaos of a wasted visa application to an unforgettable week exploring South America.",
    preTripTimeline: [
      {
        period: "Late October – November 2025",
        note:
          "Applied for Bolivian tourist visas — $160 per person, $640 total for the family. Shortly after, Bolivia's government changed its entry requirements and visas were no longer required for our nationality. The $640 was non-refundable.",
        type: "warning",
      },
      {
        period: "December 24, 2025",
        note: "Departed for Bolivia — multiple stops via Lima, Peru and La Paz, Bolivia before reaching final destination Uyuni.",
        type: "info",
      },
    ],
    days: [
      {
        day: 1,
        title: "December 24 — Arrival in Uyuni & The Salt Flats",
        highlights: [
          "Long journey with layovers in Lima, Peru and La Paz, Bolivia before finally arriving in Uyuni",
          "Visited the world-famous Uyuni Salt Flats (Salar de Uyuni) — breathtaking, vast white landscape",
          "The exhaustion from travel caught up with everyone — fatigue and irritability led to multiple arguments throughout the day",
          "Tensions were resolved by end of the day — spirits recovered",
          "Checked into a unique salt hotel where the beds were made entirely of salt blocks — an experience in itself, though quite uncomfortable especially on the back",
        ],
        rating: "4.0 / 5",
      },
      {
        day: 2,
        title: "December 25 — Christmas Day: Salt Flats & Altitude Sickness",
        highlights: [
          "Started the day with a homemade breakfast prepared by our guide — a warm and welcome start to Christmas morning",
          "Continued exploring the Salt Flats and surrounding park — stunning landscapes in every direction",
          "Got a close-up view of local wildlife including wild flamingoes",
          "Made our way to the next hotel for the evening",
          "Hotel had no Wi-Fi — and even if it did, guests would have to pay extra for a poor connection",
          "Evening took a turn: began experiencing severe vomiting and intense headaches that felt like being pounded into the ground",
          "Initially suspected food poisoning — soon realized it was high altitude sickness from the elevation of the Bolivian altiplano",
        ],
        rating: "4.5 / 5",
      },
      {
        day: 3,
        title: "December 26",
        highlights: ["Details coming soon — stay tuned!"],
      },
      {
        day: 4,
        title: "December 27",
        highlights: ["Details coming soon — stay tuned!"],
      },
      {
        day: 5,
        title: "December 28",
        highlights: ["Details coming soon — stay tuned!"],
      },
      {
        day: 6,
        title: "December 29",
        highlights: ["Details coming soon — stay tuned!"],
      },
      {
        day: 7,
        title: "December 30 — Departure",
        highlights: ["Details coming soon — stay tuned!"],
      },
    ],
  },
];

export default function Travels() {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [missingPhotos, setMissingPhotos] = useState<Set<string>>(new Set());

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

  function handleImageError(src: string) {
    setMissingPhotos((prev) => new Set(prev).add(src));
  }

  return (
    <section id="travels" className="py-24 bg-gray-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {error && <p className="text-red-400 text-xs">Incorrect password. Try again.</p>}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors duration-200 text-sm"
              >
                Unlock
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-10">
            {trips.map((trip) => (
              <div key={trip.destination} className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">

                {/* Trip header */}
                <div className="p-6 border-b border-gray-800 flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{trip.emoji}</span>
                    <div>
                      <h3 className="text-white font-bold text-xl">{trip.destination}</h3>
                      <p className="text-indigo-400 text-sm">{trip.dates}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {trip.rating && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm font-medium">
                        <span>★</span> {trip.rating}
                      </span>
                    )}
                    {trip.status === "in-progress" && (
                      <span className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium rounded-full">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">{trip.description}</p>

                  {/* Pre-trip timeline */}
                  {trip.preTripTimeline && (
                    <div className="mb-8">
                      <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-4">Pre-Trip</p>
                      <div className="space-y-3">
                        {trip.preTripTimeline.map((event) => (
                          <div
                            key={event.period}
                            className={`p-4 rounded-xl border text-sm leading-relaxed ${
                              event.type === "warning"
                                ? "bg-red-500/5 border-red-500/20 text-gray-400"
                                : "bg-indigo-500/5 border-indigo-500/20 text-gray-400"
                            }`}
                          >
                            <span className={`font-semibold block mb-1 ${event.type === "warning" ? "text-red-400" : "text-indigo-400"}`}>
                              {event.type === "warning" ? "⚠️ " : "📅 "}{event.period}
                            </span>
                            {event.note}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Day-by-day timeline */}
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-800" />
                    <div className="space-y-8">
                      {trip.days.map((day) => (
                        <div key={day.day} className="relative pl-12">
                          <div className="absolute left-0 top-1 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {day.day}
                          </div>
                          <h4 className="text-white font-semibold mb-3">{day.title}</h4>
                          <ul className="space-y-2 mb-4">
                            {day.highlights.map((h) => (
                              <li key={h} className="flex gap-2 text-gray-400 text-sm leading-relaxed">
                                <span className="text-indigo-400 shrink-0 mt-0.5">▸</span>
                                {h}
                              </li>
                            ))}
                          </ul>

                          {/* Day rating */}
                          {day.rating && (
                            <div className="flex items-center gap-2 mt-3">
                              <span className="text-yellow-400 text-sm">★</span>
                              <span className="text-gray-300 text-sm font-medium">{day.rating}</span>
                              <span className="text-gray-500 text-sm">day rating</span>
                            </div>
                          )}

                          {/* Photos */}
                          {day.photos && day.photos.length > 0 && (
                            <div className="grid grid-cols-2 gap-3 mt-4">
                              {day.photos.map((photo) =>
                                missingPhotos.has(photo.src) ? (
                                  <div
                                    key={photo.src}
                                    className="aspect-video bg-gray-800 rounded-xl border border-dashed border-gray-700 flex flex-col items-center justify-center text-gray-600 text-xs gap-2"
                                  >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Photo coming soon
                                  </div>
                                ) : (
                                  <div key={photo.src} className="relative aspect-video rounded-xl overflow-hidden bg-gray-800">
                                    <Image
                                      src={photo.src}
                                      alt={photo.alt}
                                      fill
                                      className="object-cover"
                                      onError={() => handleImageError(photo.src)}
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming plans */}
                  {trip.upcomingPlans && (
                    <div className="mt-8 p-4 bg-gray-800/60 rounded-xl border border-gray-700">
                      <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-3">
                        🗺️ Upcoming Plans
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {trip.upcomingPlans.map((plan) => (
                          <span
                            key={plan}
                            className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm rounded-full"
                          >
                            {plan}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
