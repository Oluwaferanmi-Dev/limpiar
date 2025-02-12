"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import Image from "next/image"

interface Property {
  name: string
  location: string
  details: {
    floors: number
    units: number
    officeRooms: number
    meetingRooms: number
    lobbies: number
    restrooms: number
    breakRooms: number
    cafeteria: boolean
    gym: boolean
  }
}

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()

  const property: Property = {
    name: "Acme Corporation Headquarters",
    location: "123 Main Street, Anytown, CA 91234",
    details: {
      floors: 10,
      units: 50,
      officeRooms: 200,
      meetingRooms: 10,
      lobbies: 2,
      restrooms: 50,
      breakRooms: 5,
      cafeteria: true,
      gym: true,
    },
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white">
      <div className="flex h-[500px] w-full items-center justify-center bg-[url('/property-image.jpg')] bg-cover">
        <div className="relative flex h-[300px] w-[600px] flex-col items-center justify-center rounded-lg bg-white/50 p-4 backdrop-blur-lg">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.707l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 10.586l2.293-2.293a1 1 0 111.414 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back
            </button>
          </div>

          {/* Property Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold mb-2">{property.name}</h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}
              </div>
            </div>

            {/* Owner Info */}
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=40&width=40" alt="Property Owner" fill className="object-cover" />
              </div>
              <div>
                <div className="font-medium">Darren Smith</div>
                <div className="text-sm text-muted-foreground">Property Owner</div>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Property Detail</h2>
              <div className="grid grid-cols-2 gap-y-4">
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Floors</span>
                  <span className="font-medium">{property.details.floors}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Units</span>
                  <span className="font-medium">{property.details.units}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Offices Rooms</span>
                  <span className="font-medium">{property.details.officeRooms}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Meeting Rooms</span>
                  <span className="font-medium">{property.details.meetingRooms}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Lobbies</span>
                  <span className="font-medium">{property.details.lobbies}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Restrooms</span>
                  <span className="font-medium">{property.details.restrooms}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Break Rooms</span>
                  <span className="font-medium">{property.details.breakRooms}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Cafeteria</span>
                  <span className="font-medium">{property.details.cafeteria}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Gym</span>
                  <span className="font-medium">{property.details.gym}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => router.back()}>
                Edit
              </Button>
              <Button onClick={() => router.push("/dashboard")} className="bg-[#0082ed] hover:bg-[#0082ed]/90">
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

