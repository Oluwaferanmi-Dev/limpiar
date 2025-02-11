"use client"

import { useRouter } from "next/navigation"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { ProgressSteps } from "@/components/progress-steps"
import { Input } from "@/components/ui/input"
import { Minus, Plus } from "lucide-react"

interface CounterProps {
  label: string
  value: number
  onChange: (value: number) => void
}

function Counter({ label, value, onChange }: CounterProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="p-1 rounded-md hover:bg-muted"
          disabled={value === 0}
        >
          <Minus className="w-4 h-4" />
        </button>
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.max(0, Number.parseInt(e.target.value) || 0))}
          className="w-16 text-center"
          min={0}
        />
        <button onClick={() => onChange(value + 1)} className="p-1 rounded-md hover:bg-muted">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default function PropertyUnitsPage() {
  const router = useRouter()
  const [details, setDetails] = React.useState({
    floors: 1,
    units: 1,
    officeRooms: 1,
    meetingRooms: 1,
    lobbies: 1,
    restrooms: 1,
    breakRooms: 1,
    cafeteria: 1,
    gym: 1,
  })

  const updateDetail = (key: keyof typeof details) => (value: number) => {
    setDetails((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
            Back
          </button>
          <span className="text-muted-foreground">/</span>
          <span>Add New Property</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Save & Exit</Button>
          <Button onClick={() => router.push("/dashboard/add-property/office/location")}>Next</Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="space-y-1 mb-8">
          <h1 className="text-2xl font-semibold">Add some details about your property</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-8">
          <Counter label="Floors" value={details.floors} onChange={updateDetail("floors")} />
          <Counter label="Restrooms" value={details.restrooms} onChange={updateDetail("restrooms")} />
          <Counter label="Units" value={details.units} onChange={updateDetail("units")} />
          <Counter label="Break Rooms" value={details.breakRooms} onChange={updateDetail("breakRooms")} />
          <Counter label="Office Rooms" value={details.officeRooms} onChange={updateDetail("officeRooms")} />
          <Counter label="Cafeteria" value={details.cafeteria} onChange={updateDetail("cafeteria")} />
          <Counter label="Meeting Rooms" value={details.meetingRooms} onChange={updateDetail("meetingRooms")} />
          <Counter label="Gym" value={details.gym} onChange={updateDetail("gym")} />
          <Counter label="Lobbies" value={details.lobbies} onChange={updateDetail("lobbies")} />
        </div>

        <ProgressSteps currentStep={3} />
      </div>
    </div>
  )
}

