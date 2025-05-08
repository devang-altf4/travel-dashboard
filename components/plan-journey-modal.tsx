"use client"

import { ChevronDown, MapPin, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface PlanJourneyModalProps {
  isOpen: boolean
  onClose: () => void
  theme: "light" | "dark"
}

export default function PlanJourneyModal({ isOpen, onClose, theme }: PlanJourneyModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div className="relative min-h-full flex items-center justify-center p-4">
        <div className={cn(
          "relative w-full max-w-md transform overflow-hidden rounded-2xl p-6",
          theme === "dark" 
            ? "bg-gray-800" 
            : "bg-white"
        )}>
          {/* Close button */}
          <button
            onClick={onClose}
            className={cn(
              "absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors",
              theme === "dark" ? "text-gray-400 hover:bg-gray-700" : "text-gray-500"
            )}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className={cn(
                "text-2xl font-bold",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Plan Your Journey, Your Way!
              </h3>
              <p className={cn(
                "text-sm mt-1",
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              )}>
                Let's create your personalised travel experience
              </p>
            </div>

            <div className="space-y-2">
              <label className={cn(
                "text-xl font-medium",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Where would you like to go?
              </label>
              <div className="relative">
                <MapPin className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5",
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                )} />
                <input
                  type="text"
                  placeholder="Enter Destination"
                  className={cn(
                    "w-full appearance-none border-none rounded-md py-3 pl-10 pr-4",
                    "focus:ring-2 focus:ring-blue-500",
                    theme === "dark" 
                      ? "bg-gray-800 text-white placeholder-gray-500" 
                      : "bg-gray-100 text-gray-900 placeholder-gray-500"
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={cn(
                "text-xl font-medium",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                How long will you stay?
              </label>
              <div className="relative">
                <select className={cn(
                  "w-full appearance-none border-none rounded-md py-3 pl-10 pr-10",
                  "focus:ring-2 focus:ring-blue-500",
                  theme === "dark" 
                    ? "bg-gray-800 text-white" 
                    : "bg-gray-100 text-gray-900"
                )}>
                  <option value="" disabled selected>Select Duration</option>
                  <option value="weekend">Weekend (2-3 days)</option>
                  <option value="week">1 Week</option>
                  <option value="twoweeks">2 Weeks</option>
                  <option value="month">1 Month</option>
                  <option value="custom">Custom</option>
                </select>
                <ChevronDown className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none",
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                )} />
              </div>
            </div>

            <div className="space-y-2">
              <label className={cn(
                "text-xl font-medium",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Who are you traveling with?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Solo", "Couple", "Family", "Friends"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedOption(option)}
                    className={cn(
                      "py-3 px-4 rounded-md text-center transition-colors",
                      theme === "dark"
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200",
                      selectedOption === option && "ring-2 ring-blue-500"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
