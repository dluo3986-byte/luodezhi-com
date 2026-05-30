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
        title: "May 23 — Long Island → Portsmouth, NH",
        highlights: [
          "Departed Long Island and drove north",
          "Arrived in Portsmouth, NH for the night",
        ],
      },
      {
        day: 2,
        title: "May 24 — Portsmouth Sightseeing → Bar Harbor, ME",
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
        title: "May 25 — Bar Harbor: Rain Day, Acadia & Sunset",
        highlights: [
          "Heavy rain throughout the day kept us confined to the Best Western hotel for most of the day",
          "Headed out to Acadia National Park in the late afternoon once the weather cleared",
          "Watched the sunset before 8:00 PM — stunning coastal views",
          "Good day overall; a minor family dispute about wet jeans — specifically where to hang them to dry (settled on placing them under the exhaust vents)",
        ],
      },
      {
        day: 4,
        title: "May 26 — Moncton, NB: Towel Dispute, Pink Sushi & Tide Planning",
        highlights: [
          "⚠️ Rough start to the morning — a dispute broke out over hotel towels",
          "Learned (or were reminded) that hotel bathrooms typically provide three separate towels: Hand Towel, Facial Towel, and Body Towel",
          "Mom was mildly upset over concern that a dirty towel may have been used — sparked a spat about how to tell clean from dirty",
          "The rule: if a towel is hanging on the rack in the bathroom, it is clean and can be reused. If it is not on the rack, it is dirty — do not use it",
          "Floor mats were also discussed — these are for soaking up water after a shower, not for general use",
          "Arrived in Moncton near 5:00 PM",
          "🍣 Lunchner at Pink Sushi Restaurant — 720 Main Street, Moncton, NB — highly recommended",
          "Ordered: Grilled Salmon Teriyaki, 2× Sushi Dinner, and Chirashi Sashimi — meal was excellent",
          "Walked back to the hotel after dinner",
          "📋 Researched Hopewell Rocks Provincial Park tide schedule for tomorrow — High Tide at 10:00 AM, Low Tide from 2:00 PM to 5:00 PM",
          "Plan: depart one hour early to catch High Tide at 10:00 AM",
          "Still deciding what to do during the interval between High Tide and Low Tide",
        ],
      },
      {
        day: 5,
        title: "May 27 — Hopewell Rocks & Prince Edward Island",
        highlights: [
          "Arrived at Hopewell Rocks Provincial Park around 10:30 AM",
          "Hiked portions of the park trails",
          "⚠️ Timing mishap — arrived during low tide and missed the high tide entirely, leading to a minor debacle with mom upset about the lack of research beforehand",
          "Decided to depart Hopewell Rocks early and pivot to Prince Edward Island",
          "Arrived on the Island by late afternoon",
          "Visited the North Prince Edward Island Lighthouse",
          "Explored the iconic red sands of Cavendish Beach / Cavendish Park",
          "🍽️ Dinner at Haru K-BBQ in Charlottetown around 8:00 PM",
          "Stayed overnight at Sydney Boutique Inn & Suites",
        ],
      },
      {
        day: 6,
        title: "May 28 — Back to Hopewell Rocks & Fredericton",
        highlights: [
          "Left Prince Edward Island early in the morning",
          "Rushed back to Hopewell Rocks Provincial Park — arrived at 11:30 AM",
          "Successfully witnessed the high tide at Hopewell Rocks despite the rain — made it count this time",
          "Had a meaningful pep-talk with mom — reflected on past actions and recent events, and agreed that Hopewell Rock would mark a new beginning",
          "🍽️ Lunch at the Hopewell Rocks Cafeteria",
          "Remained at the park until 3:30 PM and witnessed the full dramatic effects of the low tide",
          "Departed for Fredericton, New Brunswick",
          "Arrived in Fredericton at 6:17 PM — checking into the Hilton Garden Inn for the night",
        ],
      },
      {
        day: 7,
        title: "May 29 — Fredericton Sightseeing & Drive to Quebec City",
        highlights: [
          "Morning visit to the Fredericton Legislative Assembly Building and Fredericton City Hall",
          "Departed Fredericton between 10:30–11:00 AM",
          "6 to 7 hour drive from Fredericton to Quebec City — long but uneventful",
          "Crossed the St. Lawrence River by ferry — a scenic highlight of the drive",
          "Heavy rain set in by the time we arrived in Quebec City",
          "Checked into the Hilton Quebec at 5:16 PM",
          "Evening: explored parts of Old Quebec City",
          "🍣 Lunchner at Sushi To-Go — 636 Rue Saint-Jean, Québec, QC: sushi, Udon & Gyoza",
          "Food was nice and decent overall — personal gripe: the mushroom in the Udon tasted off",
          "Total bill: $176 CAD — Personal rating: 4.3/5",
          "Day wrapped up smoothly with no major complications",
        ],
      },
      {
        day: 8,
        title: "May 30 — Quebec City (Day 1)",
        highlights: [
          "Started the morning with a solid workout — good way to get the blood pumping",
          "⚠️ Mom got mildly upset about not dressing well enough for the day — dampened the mood somewhat",
          "⚠️ Another lecture underway — mood not great, not looking forward to the rest of the day",
          "Written mid-morning — day still unfolding, hoping for the best and bracing for the worst",
        ],
      },
      {
        day: 9,
        title: "May 31 — Quebec City (Day 2)",
        highlights: ["Details coming soon — stay tuned!"],
      },
      {
        day: 10,
        title: "June 1 — Return to Long Island",
        highlights: ["Details coming soon — stay tuned!"],
      },
    ],
    upcomingPlans: [
      "Quebec City (2-night stay — May 30–31)",
      "Return to Long Island — June 1st",
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
