"use client"

import { useState } from "react"
import { Calendar, ChevronDown, MapPin, X } from "lucide-react"

interface PlanJourneyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PlanJourneyModal({ isOpen, onClose }: PlanJourneyModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Close button for desktop */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full">
          <X className="h-6 w-6" />
        </button>

        <div className="space-y-8 py-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Plan Your Journey, Your Way!</h1>
            <p className="text-gray-400">Let's create your personalised travel experience</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xl font-medium text-white">Where would you like to go?</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Enter Destination"
                  className="w-full bg-gray-800 border-none rounded-md py-3 pl-10 pr-3 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xl font-medium text-white">How long will you stay?</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <select className="w-full appearance-none bg-gray-800 border-none rounded-md py-3 pl-10 pr-10 text-white focus:ring-2 focus:ring-blue-500">
                  <option value="" disabled selected>
                    Select Duration
                  </option>
                  <option value="weekend">Weekend (2-3 days)</option>
                  <option value="week">1 Week</option>
                  <option value="twoweeks">2 Weeks</option>
                  <option value="month">1 Month</option>
                  <option value="custom">Custom</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xl font-medium text-white">Who are you traveling with?</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "solo", label: "Solo", icon: "👤" },
                  { id: "couple", label: "Couple", icon: "👫" },
                  { id: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
                  { id: "friends", label: "Friends", icon: "👥" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedOption(option.id)}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-colors ${
                      selectedOption === option.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-white hover:bg-gray-700"
                    }`}
                  >
                    <span className="text-xl">{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
