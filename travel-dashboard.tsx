"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  MapPin,
  Star,
  Users,
  Heart,
  Home,
  Plus,
  Search,
  User,
  Moon,
  Sun,
} from "lucide-react"
import { cn } from "@/lib/utils"
import PlanJourneyModal from "./components/plan-journey-modal"

function NavButton({ icon, label, active = false, className = "", onClick = () => {} }) {
  return (
    <button
      onClick={onClick}
      className={cn("flex flex-col items-center justify-center", active ? "text-lime-400" : "text-gray-500", className)}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  )
}

function NavLink({ label, active = false }) {
  return (
    <a
      href="#"
      className={cn(
        "text-sm font-medium hover:text-lime-400 transition-colors",
        active ? "text-lime-400" : "text-gray-300",
      )}
    >
      {label}
    </a>
  )
}

export default function TravelDashboard() {
  const [activeDay, setActiveDay] = useState(1)
  const [isPlanningModalOpen, setIsPlanningModalOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [selectedDay, setSelectedDay] = useState(27)

  // Detect theme on mount (client-side)
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null
    if (stored === "dark" || stored === "light") {
      setTheme(stored)
      document.documentElement.classList.toggle("dark", stored === "dark")
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    } else {
      setTheme("light")
      document.documentElement.classList.remove("dark")
    }
  }, [])

  // Update theme and persist to localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <div className={cn("min-h-screen", theme === "dark" ? "bg-black text-white" : "bg-white text-black")}>
      {/* Container with responsive padding */}
      <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
        {/* Header - Similar on mobile and desktop */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Hello Chhavi!</h1>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Ready for the trip?</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Theme toggle button */}
            <button
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                  : "bg-gray-200 hover:bg-gray-300 text-blue-600"
              )}
            >
              {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center font-bold",
              theme === "dark" ? "bg-orange-500 text-white" : "bg-orange-400 text-black"
            )}>
              C
            </div>
          </div>
        </header>

        {/* Main content - Responsive layout changes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trip overview - Takes full width on mobile, 2/3 on desktop */}
          <div className="lg:col-span-2 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">Your Upcoming Trip</h2>
              <div className="relative rounded-xl overflow-hidden">
                <Image
                  src="/Tokyo.svg"
                  alt="Tokyo skyline with Tokyo Tower"
                  width={800}
                  height={400}
                  className="w-full h-[200px] md:h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-4xl font-bold">TOKYO</h3>
                  <p className="text-gray-300">27.01.2025 - 02.02.2025</p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-black/40 p-1 rounded-full">
                        <Clock className="h-4 w-4 text-yellow-400" />
                      </div>
                      <div>
                        <div className="font-bold">8 Days</div>
                        <div className="text-xs text-gray-300">Duration</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-black/40 p-1 rounded-full">
                        <Users className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <div className="font-bold">4 (2M,2F)</div>
                        <div className="text-xs text-gray-300">Group Size</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-black/40 p-1 rounded-full">
                        <Calendar className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-bold">14</div>
                        <div className="text-xs text-gray-300">Activities</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <ArrowUpRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </section>

            <section className="rounded-xl overflow-hidden">
              <Image
                src="/Flight details.svg"
                alt="Flight Details"
                width={800}
                height={200}
                className="w-full h-auto"
                priority
              />
            </section>
          </div>

          {/* Accommodation section - Takes full width on mobile, 1/3 on desktop */}
          <div className="space-y-6">
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-mont-700">Accomodation</h2>
                <a href="#" className="text-sm text-yellow-400">
                  See all
                </a>
              </div>
              {/* Responsive: horizontal scroll on mobile, grid on desktop */}
              <div
                className={cn(
                  "flex overflow-x-auto gap-4 pb-2 -mx-4 px-4 lg:grid lg:grid-cols-1 lg:gap-4 lg:overflow-visible lg:mx-0 lg:px-0 rounded-xl",
                  theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                )}
              >
                {/* Card 1 */}
                <div className={cn(
                  "rounded-xl overflow-hidden min-w-[270px] max-w-xs flex-shrink-0 lg:min-w-0 lg:max-w-none border border-gray-300",
                  theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                )}>
                  <div className="relative">
                    <Image
                      src="/real shinagawa.jpg"
                      alt="Shinagawa Prince Hotel"
                      width={300}
                      height={150}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-blue-600 py-1 px-2 rounded-md flex items-center">
                      <Star className="h-3 w-3 fill-current text-white mr-1" />
                      <span className="text-xs">4.0 Very Good</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className={cn(
                      "font-mont-700 text-lg",
                      theme === "dark" ? "text-white" : "text-black"
                    )}>
                      Shinagawa Prince Hotel
                    </h3>
                    <div className={cn(
                      "text-sm font-mont-700",
                      theme === "dark" ? "text-white" : "text-black"
                    )}>
                      <p>Check in: 26.01.2025, 11:15 pm</p>
                      <p>Check out: 28.01.2025, 11:15 am</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className={cn(
                        "text-sm font-mont-700",
                        theme === "dark" ? "text-white" : "text-black"
                      )}>
                        2 Nights
                      </div>
                      <div className={cn(
                        "flex items-center text-sm font-mont-700",
                        theme === "dark" ? "text-blue-400" : "text-green-400"
                      )}>
                        <div className={cn(
                          "h-4 w-4 rounded-full border flex items-center justify-center mr-1",
                          theme === "dark" ? "border-blue-400" : "border-green-400"
                        )}>
                          <div className={cn(
                            "h-2 w-2 rounded-full",
                            theme === "dark" ? "bg-blue-400" : "bg-green-400"
                          )}></div>
                        </div>
                        Confirmed
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card 2 */}
                <div className={cn(
                  "rounded-xl overflow-hidden min-w-[270px] max-w-xs flex-shrink-0 lg:min-w-0 lg:max-w-none border border-gray-300",
                  theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                )}>
                  <div className="relative">
                    <Image
                      src="/shinagawa hotel.jpg"
                      alt="Mercure Tokyo Hotel"
                      width={300}
                      height={150}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-blue-600 py-1 px-2 rounded-md flex items-center">
                      <Star className="h-3 w-3 fill-current text-white mr-1" />
                      <span className="text-xs">4.1 Very Good</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className={cn(
                      "font-mont-700 text-lg",
                      theme === "dark" ? "text-white" : "text-black"
                    )}>
                      Mercure Tokyo Hotel
                    </h3>
                    <div className={cn(
                      "text-sm font-mont-700",
                      theme === "dark" ? "text-white" : "text-black"
                    )}>
                      <p>Check in: 28.01.2025, 6:00 pm</p>
                      <p>Check out: 30.01.2025, 11:15 am</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className={cn(
                        "text-sm font-mont-700",
                        theme === "dark" ? "text-white" : "text-black"
                      )}>
                        2 Nights
                      </div>
                      <div className="flex items-center text-orange-400 text-sm font-mont-700">
                        <div className="h-4 w-4 rounded-full border border-orange-400 flex items-center justify-center mr-1">
                          <div className="h-2 w-2 bg-orange-400 rounded-full"></div>
                        </div>
                        Pending
                      </div>
                    </div>
                  </div>
                </div>
                {/* ...existing code for more cards... */}
              </div>
            </section>
          </div>
        </div>

        {/* Activities section - Full width on both layouts but with responsive adjustments */}
        <section className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className={cn(
              "text-xl font-semibold",
              theme === "dark" ? "text-white" : "text-black"
            )}>Activities</h2>
            <a
              href="#"
              className={cn(
                "text-sm",
                theme === "dark" ? "text-yellow-400" : "text-blue-600"
              )}
            >
              See all
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-1 space-y-4">
              {/* Day Plan and Activities */}
              <div className="flex gap-2 mb-4">
                <div className={cn(
                  "font-medium py-1 px-3 rounded-full text-sm",
                  theme === "dark" ? "bg-lime-400 text-black" : "bg-blue-600 text-white"
                )}>
                  Day Plan
                </div>
                <div className={cn(
                  "font-medium py-1 px-3 rounded-full text-sm flex items-center",
                  theme === "dark" ? "bg-[#181f2a] text-white" : "bg-white text-blue-600 border border-blue-600"
                )}>
                  <span>14 Activities</span>
                </div>
              </div>

              {/* Calendar days */}
              <div className={cn(
                "rounded-2xl p-6",
                theme === "dark" ? "bg-[#181f2a]" : "bg-gray-100"
              )}>
                <div className="grid grid-cols-7 gap-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "text-xs font-bold",
                      theme === "dark" ? "text-lime-400" : "text-blue-600"
                    )}>JAN</div>
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-base mt-1 font-bold cursor-pointer",
                        selectedDay === 27
                          ? (theme === "dark" ? "bg-lime-400 text-black" : "bg-blue-600 text-white")
                          : (theme === "dark" ? "bg-[#232b39] text-white" : "bg-white text-blue-600 border border-blue-600")
                      )}
                      onClick={() => setSelectedDay(27)}
                    >
                      27
                    </div>
                    <div className={cn(
                      "text-xs mt-1",
                      theme === "dark" ? "text-white" : "text-black"
                    )}>MON</div>
                  </div>
                  {[28, 29, 30, 31, 1].map((day, idx) => (
                    <div key={day} className="flex flex-col items-center">
                      <div className={cn(
                        "text-xs font-bold",
                        idx === 4
                          ? (theme === "dark" ? "text-gray-400" : "text-blue-600")
                          : "text-transparent"
                      )}>
                        {idx === 4 ? "FEB" : "JAN"}
                      </div>
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-base mt-1 font-bold cursor-pointer",
                          selectedDay === day
                            ? (theme === "dark" ? "bg-lime-400 text-black" : "bg-blue-600 text-white")
                            : (theme === "dark" ? "bg-[#232b39] text-white" : "bg-white text-blue-600 border border-blue-600")
                        )}
                        onClick={() => setSelectedDay(day)}
                      >
                        {day}
                      </div>
                      <div className={cn(
                        "text-xs mt-1",
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      )}>
                        {["TUE", "WED", "THU", "FRI", "SAT"][idx]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day info */}
              <div className={cn(
                "rounded-2xl p-6",
                theme === "dark" ? "bg-[#181f2a]" : "bg-gray-100"
              )}>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "font-medium py-1 px-3 rounded-full text-sm",
                    theme === "dark" ? "bg-lime-400 text-black" : "bg-blue-600 text-white"
                  )}>Day 1</div>
                  <div className={cn(
                    "text-sm",
                    theme === "dark" ? "text-white" : "text-black"
                  )}>27.01.2025</div>
                  <div className={cn(
                    "ml-auto text-sm font-medium",
                    theme === "dark" ? "text-lime-400" : "text-blue-600"
                  )}>3 Activities</div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-2">
              <div className={cn(
                "rounded-2xl p-6 space-y-6",
                theme === "dark" ? "bg-[#181f2a]" : "bg-gray-100"
              )}>
                {/* Activity 1 */}
                <div className="flex gap-4">
                  <Image
                    src="/1.webp"
                    alt="Senso-ji Temple"
                    width={100}
                    height={100}
                    className={cn(
                      "w-20 h-20 rounded-xl object-cover",
                      theme === "dark" ? "bg-[#232b39]" : "bg-white border border-blue-100"
                    )}
                  />
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-semibold",
                      theme === "dark" ? "text-white" : "text-black"
                    )}>Senso-ji Temple & Nakamise Shopping Street Senso-ji</h3>
                    <div className={cn(
                      "text-sm mt-1 space-y-1",
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    )}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Timing: 8:15 am Morning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Duration: 3 hours</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>Pick up: From Hotel</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Activity 2 */}
                <div className="flex gap-4">
                  <Image
                    src="/2.jpg"
                    alt="Tokyo Sky Tree"
                    width={100}
                    height={100}
                    className={cn(
                      "w-20 h-20 rounded-xl object-cover",
                      theme === "dark" ? "bg-[#232b39]" : "bg-white border border-blue-100"
                    )}
                  />
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-semibold",
                      theme === "dark" ? "text-white" : "text-black"
                    )}>Tokyo Sky Tree</h3>
                    <div className={cn(
                      "text-sm mt-1 space-y-1",
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    )}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Timing: 1:00 pm Afternoon</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Duration: 3 hours</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>Pick up: From Nakamise Street</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Activity 3 */}
                <div className="flex gap-4">
                  <Image
                    src="/3.jpg"
                    alt="Kimono Wearing"
                    width={100}
                    height={100}
                    className={cn(
                      "w-20 h-20 rounded-xl object-cover",
                      theme === "dark" ? "bg-[#232b39]" : "bg-white border border-blue-100"
                    )}
                  />
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-semibold",
                      theme === "dark" ? "text-white" : "text-black"
                    )}>Kimono Wearing</h3>
                    <div className={cn(
                      "text-sm mt-1 space-y-1",
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    )}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Timing: Anytime before 8:00pm</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Duration: 1-2 hours</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>Pick up: From Hotel</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 py-2 px-4 md:py-4 z-10">
          <div className="md:hidden flex justify-between items-center">
            <NavButton icon={<Home className="h-6 w-6" />} label="Home" active />
            <NavButton icon={<Search className="h-6 w-6" />} label="Search" />
            <button
              onClick={() => setIsPlanningModalOpen(true)}
              className="flex flex-col items-center justify-center"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              <span className="relative flex items-center justify-center">
                <span className="bg-lime-400/10 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="bg-lime-400 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                    <Plus className="h-6 w-6 text-black" />
                  </span>
                </span>
              </span>
              <span className="text-xs mt-1 text-lime-400">Add</span>
            </button>
            <NavButton icon={<Heart className="h-6 w-6" />} label="Favorites" />
            <NavButton icon={<User className="h-6 w-6" />} label="Profile" />
          </div>

          {/* Desktop Footer */}
          <div className="hidden md:block max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-lime-400">
                  <Home className="h-5 w-5" />
                  <span className="font-medium">TravelBuddy</span>
                </div>
                <span className="text-gray-500">|</span>
                <span className="text-sm text-gray-400">© 2025 TravelBuddy Inc.</span>
              </div>

              <div className="flex gap-8">
                <NavLink label="Home" active />
                <NavLink label="Destinations" />
                <NavLink label="Trips" />
                <NavLink label="Support" />
                <NavLink label="About Us" />
              </div>

              <div className="flex gap-4">
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                  <Search className="h-5 w-5" />
                </button>
                <button
                  className="p-2 rounded-full bg-lime-400 text-black hover:bg-lime-500 transition-colors"
                  onClick={() => setIsPlanningModalOpen(true)}
                >
                  <Plus className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                  <User className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </footer>

        {/* Add padding at the bottom to prevent content from being hidden behind the footer */}
        <div className="h-16 md:h-20"></div>
      </div>

      {/* Journey Planning Modal */}
      <PlanJourneyModal isOpen={isPlanningModalOpen} onClose={() => setIsPlanningModalOpen(false)} />
    </div>
  )
}
