"use client"

import React from "react"
import { useState, useEffect } from "react"
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
              <div className="flex overflow-x-auto gap-4 pb-2 -mx-4 px-4 lg:grid lg:grid-cols-1 lg:gap-4 lg:overflow-visible lg:mx-0 lg:px-0">
                {/* Card 1 */}
                <div className="bg-gray-900 rounded-xl overflow-hidden min-w-[270px] max-w-xs flex-shrink-0 lg:min-w-0 lg:max-w-none">
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
                    <h3 className="font-mont-700">Shinagawa Prince Hotel</h3>
                    <div className="text-sm text-gray-400 font-mont-700">
                      <p>Check in: 26.01.2025, 11:15 pm</p>
                      <p>Check out: 28.01.2025, 11:15 am</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm font-mont-700">2 Nights</div>
                      <div className="flex items-center text-green-400 text-sm font-mont-700">
                        <div className="h-4 w-4 rounded-full border border-green-400 flex items-center justify-center mr-1">
                          <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                        </div>
                        Confirmed
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card 2 */}
                <div className="bg-gray-900 rounded-xl overflow-hidden min-w-[270px] max-w-xs flex-shrink-0 lg:min-w-0 lg:max-w-none">
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
                    <h3 className="font-mont-700">Mercure Tokyo Hotel</h3>
                    <div className="text-sm text-gray-400 font-mont-700">
                      <p>Check in: 28.01.2025, 6:00 pm</p>
                      <p>Check out: 30.01.2025, 11:15 am</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm font-mont-700">2 Nights</div>
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
            <h2 className="text-xl font-mont-700">Activities</h2>
            <a href="#" className="text-sm text-yellow-400">
              See all
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <div className="flex gap-2 mb-4">
                <div className="bg-lime-400 text-black font-medium py-1 px-3 rounded-full text-sm">Day Plan</div>
                <div className="bg-gray-800 text-white font-medium py-1 px-3 rounded-full text-sm flex items-center">
                  <span>14 Activities</span>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-4">
                <div className="grid grid-cols-7 gap-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-lime-400 font-bold">JAN</div>
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm mt-1",
                        "bg-lime-400 text-black font-bold",
                      )}
                    >
                      27
                    </div>
                    <div className="text-xs mt-1">MON</div>
                  </div>
                  {[
                    { day: 28, label: "TUE" },
                    { day: 29, label: "WED" },
                    { day: 30, label: "THU" },
                    { day: 31, label: "FRI" },
                    { day: 1, label: "SAT" },
                  ].map((date, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="text-xs text-gray-500 font-bold">{index === 4 ? "FEB" : ""}</div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm mt-1 bg-gray-800">
                        {date.day}
                      </div>
                      <div className="text-xs mt-1 text-gray-500">{date.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-lime-400 text-black font-medium py-1 px-3 rounded-full text-sm">Day 1</div>
                  <div className="text-sm text-gray-400">27.01.2025</div>
                  <div className="ml-auto text-sm text-lime-400">3 Activities</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-4">
                {/* Activity 1 */}
                <div className="bg-gray-900 rounded-xl flex overflow-hidden h-40">
                  <div className="w-40 h-full flex-shrink-0">
                    <Image
                      src="/1.webp"
                      alt="Senso-ji Temple"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center px-4 py-2">
                    <h3 className="font-mont-700 text-lg text-white leading-tight">Senso-ji Temple & Nakamise Shopping Street Senso-ji</h3>
                    <div className="text-xs text-gray-400 mt-2 mb-1 space-y-1 font-mont-700">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span><span className="font-mont-700">Timing:</span> 8:15 am Morning</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-mont-700">Duration: 3 hours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="font-mont-700">Pick up: From Hotel</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity 2 */}
                <div className="bg-gray-900 rounded-xl flex overflow-hidden h-40">
                  <div className="w-40 h-full flex-shrink-0">
                    <Image
                      src="/2.jpg"
                      alt="Tokyo Sky Tree"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-center">
                    <h3 className="font-mont-700 text-lg text-white">Tokyo Sky Tree</h3>
                    <div className="text-sm text-gray-400 mt-1 font-mont-700">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-mont-700">Timing: 1:00 pm Afternoon</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-mont-700">Duration: 3 hours</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span className="font-mont-700">Pick up: From Nakamise Street</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity 3 */}
                <div className="bg-gray-900 rounded-xl flex overflow-hidden h-40">
                  <div className="w-40 h-full flex-shrink-0">
                    <Image
                      src="/3.jpg"
                      alt="Kimono Wearing"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-center">
                    <h3 className="font-mont-700 text-lg text-white">Kimono Wearing</h3>
                    <div className="text-sm text-gray-400 mt-1 font-mont-700">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-mont-700">Timing: Anytime before 8:00pm</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-mont-700">Duration: 1-2 hours</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span className="font-mont-700">Pick up: From Hotel</span>
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
