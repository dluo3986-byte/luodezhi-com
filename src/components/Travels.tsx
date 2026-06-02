"use client";

import { useState } from "react";

const HASH = "dfd1d70782dbb6002cec7b1e95fc3ea1dafb534f3e17b11e57d01dd640a9c35c";

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type Tab = "hotels" | "food" | "activities";

interface Hotel {
  trip: string;
  name: string;
  location: string;
  dates: string;
  notes?: string;
}

interface Meal {
  trip: string;
  name: string;
  address?: string;
  location: string;
  date: string;
  ordered: string[];
  cost?: string;
  rating?: string;
  notes?: string;
  recommended?: boolean;
}

interface Activity {
  trip: string;
  date: string;
  title: string;
  highlights: string[];
  dayRating?: string;
}

const hotels: Hotel[] = [
  // ── New England ──────────────────────────────────────────────────
  {
    trip: "New England Road Trip",
    name: "Hotel (name TBD)",
    location: "Portsmouth, NH",
    dates: "May 23–24",
  },
  {
    trip: "New England Road Trip",
    name: "Best Western",
    location: "Bar Harbor, ME",
    dates: "May 24–25",
    notes: "Confined to the hotel on May 25 due to heavy rain",
  },
  {
    trip: "New England Road Trip",
    name: "Hotel (TBD)",
    location: "Moncton, NB",
    dates: "May 26–27",
  },
  {
    trip: "New England Road Trip",
    name: "Sydney Boutique Inn & Suites",
    location: "Charlottetown, PEI",
    dates: "May 27–28",
    notes: "One night stay",
  },
  {
    trip: "New England Road Trip",
    name: "Hilton Garden Inn",
    location: "Fredericton, NB",
    dates: "May 28–29",
  },
  {
    trip: "New England Road Trip",
    name: "Hotel (name TBD)",
    location: "Saratoga Springs, NY",
    dates: "May 31",
    notes: "One night stay on the drive back to Long Island",
  },
  {
    trip: "New England Road Trip",
    name: "Hilton Quebec",
    location: "Quebec City, QC",
    dates: "May 29–31",
  },
  // ── Bolivia ──────────────────────────────────────────────────────
  {
    trip: "Bolivia",
    name: "Salt Hotel",
    location: "Uyuni, Bolivia",
    dates: "Dec 24–25",
    notes: "Beds made entirely of salt blocks — unique experience but very uncomfortable, especially on the back",
  },
  {
    trip: "Bolivia",
    name: "Hotel (name TBD)",
    location: "Uyuni area, Bolivia",
    dates: "Dec 25–26",
    notes: "No Wi-Fi — guests had to pay extra for a poor connection",
  },
];

const food: Meal[] = [
  // ── New England ──────────────────────────────────────────────────
  {
    trip: "New England Road Trip",
    name: "Stewman's Lobster Pound",
    location: "Bar Harbor, ME",
    date: "May 24",
    ordered: ["Lobster Roll", "Lobster Bisque", "Mussels"],
    rating: "4.5 / 5",
    notes: "Food was great overall — mussel was slightly off",
  },
  {
    trip: "New England Road Trip",
    name: "Pink Sushi Restaurant",
    address: "720 Main Street, Moncton, NB",
    location: "Moncton, NB",
    date: "May 26",
    ordered: ["Grilled Salmon Teriyaki", "Sushi Dinner ×2", "Chirashi Sashimi"],
    recommended: true,
  },
  {
    trip: "New England Road Trip",
    name: "Haru K-BBQ",
    location: "Charlottetown, PEI",
    date: "May 27",
    ordered: ["Korean BBQ"],
    notes: "Dinner around 8:00 PM",
  },
  {
    trip: "New England Road Trip",
    name: "Hopewell Rocks Cafeteria",
    location: "Hopewell Rocks, NB",
    date: "May 28",
    ordered: ["Lunch (details TBD)"],
  },
  {
    trip: "New England Road Trip",
    name: "Le Continental",
    location: "Quebec City, QC",
    date: "May 30",
    ordered: ["Filet Mignon", "Oysters"],
    rating: "4.9 / 5",
    notes: "Delicious meal overall — filet mignon was excellent, oysters were the only complaint",
    recommended: true,
  },
  {
    trip: "New England Road Trip",
    name: "Sushi To-Go",
    address: "636 Rue Saint-Jean, Québec, QC G1R 1P8",
    location: "Quebec City, QC",
    date: "May 29",
    ordered: ["Sushi", "Udon", "Gyoza"],
    cost: "$176",
    rating: "4.3 / 5",
    notes: "Food was nice and decent — personal complaint: mushroom in the Udon tasted off",
  },
  // ── Bolivia ──────────────────────────────────────────────────────
  {
    trip: "Bolivia",
    name: "Homemade Breakfast (by Guide)",
    location: "Uyuni, Bolivia",
    date: "Dec 25",
    ordered: ["Homemade breakfast prepared by local guide"],
    notes: "A warm and welcome start to Christmas morning",
  },
];

const activities: Activity[] = [
  // ── New England ──────────────────────────────────────────────────
  {
    trip: "New England Road Trip",
    date: "May 23",
    title: "Day 1 — Long Island → Portsmouth, NH",
    highlights: ["Departed Long Island", "Arrived in Portsmouth, NH for the night"],
  },
  {
    trip: "New England Road Trip",
    date: "May 24",
    title: "Day 2 — Portsmouth Sightseeing → Bar Harbor, ME",
    highlights: [
      "Explored downtown Portsmouth — visited the historic theater and picked up souvenirs",
      "Arrived in Bar Harbor around 3:30 PM",
      "Lunchner at Stewman's Lobster Pound",
      "Visited Acadia National Park and photographed Bass Harbor Head Light Station with family",
    ],
  },
  {
    trip: "New England Road Trip",
    date: "May 25",
    title: "Day 3 — Bar Harbor: Rain Day, Acadia & Sunset",
    highlights: [
      "Heavy rain confined us to the Best Western hotel for most of the day",
      "Headed out to Acadia National Park in the late afternoon once the weather cleared",
      "Watched the sunset before 8:00 PM",
      "Minor family dispute about wet jeans — rule: if hanging on the rack, it is clean",
    ],
  },
  {
    trip: "New England Road Trip",
    date: "May 26",
    title: "Day 4 — Moncton, NB",
    highlights: [
      "Morning dispute over hotel towels — rule established: rack = clean, off rack = dirty",
      "Arrived in Moncton near 5:00 PM",
      "Dinner at Pink Sushi Restaurant",
      "Researched Hopewell Rocks tide schedule: High Tide 10:00 AM, Low Tide 2:00–5:00 PM",
    ],
  },
  {
    trip: "New England Road Trip",
    date: "May 27",
    title: "Day 5 — Hopewell Rocks & Prince Edward Island",
    highlights: [
      "Arrived at Hopewell Rocks Provincial Park around 10:30 AM — hiked the trails",
      "Timing mishap — saw low tide but missed high tide, leading to a minor family debacle",
      "Departed early and pivoted to Prince Edward Island",
      "Visited the North PEI Lighthouse and red sands of Cavendish Beach",
      "Dinner at Haru K-BBQ in Charlottetown around 8:00 PM",
    ],
  },
  {
    trip: "New England Road Trip",
    date: "May 28",
    title: "Day 6 — Hopewell Rocks (High Tide ✓) → Fredericton",
    highlights: [
      "Left PEI early and rushed back to Hopewell Rocks — arrived 11:30 AM",
      "Successfully saw the high tide despite the rain",
      "Meaningful pep-talk with mom — Hopewell Rock marks a new beginning",
      "Lunch at Hopewell Rocks Cafeteria",
      "Stayed until 3:30 PM — witnessed the full dramatic low tide",
      "Arrived in Fredericton at 6:17 PM",
    ],
  },
  {
    trip: "New England Road Trip",
    date: "May 29",
    title: "Day 7 — Fredericton → Quebec City",
    highlights: [
      "Morning: Fredericton Legislative Assembly Building and City Hall",
      "Departed ~10:30–11:00 AM — 6–7 hour drive to Quebec City",
      "Crossed the St. Lawrence River by ferry",
      "Arrived Hilton Quebec at 5:16 PM in heavy rain",
      "Evening: explored Old Quebec City, dinner at Sushi To-Go",
    ],
  },
  {
    trip: "New England Road Trip",
    date: "May 30",
    title: "Day 8 — Quebec City (Day 1)",
    highlights: [
      "Morning workout — good start to the day",
      "Mom upset about not dressing well enough — two lectures dampened the mood early on",
      "Visited Montmorency Falls — stunning waterfall views",
      "Shopping at Quebec Costco — notably cheaper than US Costco locations",
      "Walked through Old Quebec City and strolled the Plains of Abraham",
      "🍽️ Dinner at Le Continental — filet mignon was exceptional, oysters were the only weak point",
    ],
    dayRating: "4.9 / 5 (Le Continental)",
  },
  {
    trip: "New England Road Trip",
    date: "May 31",
    title: "Day 9 — Quebec City → Saratoga Springs, NY",
    highlights: [
      "Morning rain — packed up and began the drive back toward the United States",
      "Crossed back into the US",
      "Stayed overnight in Saratoga Springs, NY",
    ],
  },
  {
    trip: "New England Road Trip",
    date: "June 1",
    title: "Day 10 — Woodbury Common & Return to Long Island ✓",
    highlights: [
      "Stopped at Woodbury Common Premium Outlets for clothes shopping",
      "Long and exhausting day of trying on and taking off clothes",
      "Finally arrived back home at 8:12 PM — trip complete",
    ],
  },
  // ── Bolivia ──────────────────────────────────────────────────────
  {
    trip: "Bolivia",
    date: "Dec 24",
    title: "Day 1 — Arrival in Uyuni & The Salt Flats",
    highlights: [
      "Long journey via Lima, Peru and La Paz, Bolivia before arriving in Uyuni",
      "Visited the Uyuni Salt Flats — breathtaking vast white landscape",
      "Travel exhaustion led to multiple arguments — resolved by end of day",
      "Stayed at a salt hotel — beds made of salt blocks, very uncomfortable",
    ],
    dayRating: "4.0 / 5",
  },
  {
    trip: "Bolivia",
    date: "Dec 25",
    title: "Day 2 — Christmas: Salt Flats & Altitude Sickness",
    highlights: [
      "Homemade Christmas breakfast prepared by our guide",
      "Continued exploring the Salt Flats — stunning landscapes",
      "Close-up views of wild flamingoes",
      "Checked into next hotel — no Wi-Fi (pay extra for poor connection)",
      "Evening: severe vomiting and crushing headaches — high altitude sickness",
    ],
    dayRating: "4.5 / 5",
  },
  {
    trip: "Bolivia",
    date: "Dec 26–30",
    title: "Days 3–7 — Bolivia Continued",
    highlights: ["Details coming soon — stay tuned!"],
  },
];

const trips = ["New England Road Trip", "Bolivia"] as const;

const tripMeta: Record<string, { emoji: string; dates: string; status: string; rating: string }> = {
  "New England Road Trip": {
    emoji: "🦞",
    dates: "May 23 – June 1, 2026",
    status: "Completed",
    rating: "4.5 / 5",
  },
  Bolivia: {
    emoji: "🦙",
    dates: "December 24–30, 2025",
    status: "Completed",
    rating: "TBD",
  },
};

const tripEmojis: Record<string, string> = {
  "New England Road Trip": "🦞",
  Bolivia: "🦙",
};

export default function Travels() {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("activities");

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

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "activities", label: "Activities", icon: "🗺️" },
    { id: "food", label: "Food", icon: "🍽️" },
    { id: "hotels", label: "Hotels", icon: "🏨" },
  ];

  return (
    <section id="travels" className="py-24 bg-gray-900/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <button type="submit" className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors duration-200 text-sm">
                Unlock
              </button>
            </form>
          </div>
        ) : (
          <div>
            {/* Tabs */}
            <div className="flex gap-2 mb-8 bg-gray-900 rounded-xl p-1.5 border border-gray-800 w-fit mx-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Activities Tab */}
            {activeTab === "activities" && (
              <div className="space-y-10">
                {trips.map((trip) => {
                  const tripActivities = activities.filter((a) => a.trip === trip);
                  return (
                    <div key={trip}>
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{tripEmojis[trip]}</span>
                          <div>
                            <h3 className="text-white font-bold text-lg leading-tight">{trip}</h3>
                            <p className="text-gray-500 text-xs">{tripMeta[trip].dates}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-full">{tripMeta[trip].status}</span>
                          {tripMeta[trip].rating !== "TBD" && (
                            <span className="flex items-center gap-1 px-2.5 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs rounded-full font-medium">
                              ★ {tripMeta[trip].rating} overall
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-800" />
                        <div className="space-y-6">
                          {tripActivities.map((a) => (
                            <div key={a.date + a.title} className="relative pl-12">
                              <div className="absolute left-0 top-1 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                                {a.date.split(" ")[1]?.replace(",", "") ?? "–"}
                              </div>
                              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-indigo-500/40 transition-colors">
                                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                  <h4 className="text-white font-semibold">{a.title}</h4>
                                  <span className="text-indigo-400 text-xs font-medium">{a.date}</span>
                                </div>
                                <ul className="space-y-1.5">
                                  {a.highlights.map((h) => (
                                    <li key={h} className="flex gap-2 text-gray-400 text-sm leading-relaxed">
                                      <span className="text-indigo-400 shrink-0 mt-0.5">▸</span>
                                      {h}
                                    </li>
                                  ))}
                                </ul>
                                {a.dayRating && (
                                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-800">
                                    <span className="text-yellow-400 text-sm">★</span>
                                    <span className="text-gray-300 text-sm font-medium">{a.dayRating}</span>
                                    <span className="text-gray-500 text-sm">day rating</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Food Tab */}
            {activeTab === "food" && (
              <div className="space-y-10">
                {trips.map((trip) => {
                  const tripFood = food.filter((f) => f.trip === trip);
                  return (
                    <div key={trip}>
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{tripEmojis[trip]}</span>
                          <div>
                            <h3 className="text-white font-bold text-lg leading-tight">{trip}</h3>
                            <p className="text-gray-500 text-xs">{tripMeta[trip].dates}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-full">{tripMeta[trip].status}</span>
                          {tripMeta[trip].rating !== "TBD" && (
                            <span className="flex items-center gap-1 px-2.5 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs rounded-full font-medium">
                              ★ {tripMeta[trip].rating} overall
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {tripFood.map((meal) => (
                          <div key={meal.name + meal.date} className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-indigo-500/40 transition-colors flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="text-white font-semibold">{meal.name}</h4>
                                {meal.address
                                  ? <p className="text-gray-500 text-xs mt-0.5">{meal.address}</p>
                                  : <p className="text-gray-500 text-xs mt-0.5">{meal.location}</p>
                                }
                              </div>
                              <span className="text-indigo-400 text-xs font-medium shrink-0">{meal.date}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {meal.ordered.map((item) => (
                                <span key={item} className="px-2.5 py-1 bg-gray-800 text-gray-300 text-xs rounded-lg">{item}</span>
                              ))}
                            </div>
                            {meal.notes && <p className="text-gray-400 text-xs leading-relaxed">{meal.notes}</p>}
                            <div className="flex items-center gap-3 mt-auto pt-2 border-t border-gray-800 flex-wrap">
                              {meal.rating && (
                                <span className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
                                  ★ {meal.rating}
                                </span>
                              )}
                              {meal.cost && (
                                <span className="text-gray-400 text-xs">{meal.cost}</span>
                              )}
                              {meal.recommended && (
                                <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs rounded-full">
                                  Highly Recommended
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Hotels Tab */}
            {activeTab === "hotels" && (
              <div className="space-y-10">
                {trips.map((trip) => {
                  const tripHotels = hotels.filter((h) => h.trip === trip);
                  return (
                    <div key={trip}>
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{tripEmojis[trip]}</span>
                          <div>
                            <h3 className="text-white font-bold text-lg leading-tight">{trip}</h3>
                            <p className="text-gray-500 text-xs">{tripMeta[trip].dates}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-full">{tripMeta[trip].status}</span>
                          {tripMeta[trip].rating !== "TBD" && (
                            <span className="flex items-center gap-1 px-2.5 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs rounded-full font-medium">
                              ★ {tripMeta[trip].rating} overall
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {tripHotels.map((hotel) => (
                          <div key={hotel.name + hotel.dates} className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-indigo-500/40 transition-colors flex flex-col gap-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="text-white font-semibold">{hotel.name}</h4>
                                <p className="text-indigo-400 text-sm">{hotel.location}</p>
                              </div>
                              <span className="text-gray-400 text-xs font-medium shrink-0 bg-gray-800 px-2.5 py-1 rounded-lg">{hotel.dates}</span>
                            </div>
                            {hotel.notes && (
                              <p className="text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-2">{hotel.notes}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
