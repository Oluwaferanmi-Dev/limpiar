"use client"

import { useRouter } from "next/navigation"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus } from "lucide-react"
import { usePropertyStore } from "@/store/property-store"

interface CounterProps {
  label: string
  value: number
  onChange: (value: number) => void
}

function Counter({ label, value, onChange }: CounterProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-center">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="h-10 w-10 flex items-center justify-center rounded-lg border border-input hover:bg-accent"
          disabled={value === 0}
        >
          <Minus className="h-4 w-4" />
        </button>
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.max(0, Number.parseInt(e.target.value) || 0))}
          className="h-10 w-16 text-center mx-2"
          min={0}
        />
        <button
          onClick={() => onChange(value + 1)}
          className="h-10 w-10 flex items-center justify-center rounded-lg border border-input hover:bg-accent"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default function PropertyUnitsPage() {
  const router = useRouter()
  const { property, setPropertyDetails } = usePropertyStore()
  const [details, setDetails] = React.useState(property.details)

  const updateDetail = (key: keyof typeof details) => (value: number) => {
    const newDetails = { ...details, [key]: value }
    setDetails(newDetails)
    setPropertyDetails(newDetails)
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
          <Button
            onClick={() => router.push("/dashboard/add-property/office/location")}
            className="bg-[#0082ed] hover:bg-[#0082ed]/90"
          >
            Next
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        <div className="mb-12">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex items-center">
                  <div className="text-sm text-muted-foreground">
                    {step}. {["Category", "Title", "Units", "Location", "Image"][index]}
                  </div>
                </div>
                {index < 4 && <div className="flex-1 h-[1px] bg-border mx-2" />}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-2 h-1 bg-[#0082ed] w-[60%]" />
        </div>

        <div className="space-y-8">
          <h1 className="text-2xl font-semibold">Add some details about your property</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            <div className="space-y-6">
              <Counter label="Floors" value={details.floors} onChange={updateDetail("floors")} />
              <Counter label="Units" value={details.units} onChange={updateDetail("units")} />
              <Counter label="Offices Rooms" value={details.officeRooms} onChange={updateDetail("officeRooms")} />
              <Counter label="Meeting Rooms" value={details.meetingRooms} onChange={updateDetail("meetingRooms")} />
              <Counter label="Lobbies" value={details.lobbies} onChange={updateDetail("lobbies")} />
            </div>
            <div className="space-y-6">
              <Counter label="Restrooms" value={details.restrooms} onChange={updateDetail("restrooms")} />
              <Counter label="Break Rooms" value={details.breakRooms} onChange={updateDetail("breakRooms")} />
              <Counter label="Cafeteria" value={details.cafeteria} onChange={updateDetail("cafeteria")} />
              <Counter label="Gym" value={details.gym} onChange={updateDetail("gym")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

