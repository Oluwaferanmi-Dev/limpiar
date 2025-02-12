"use client"

import { useRouter } from "next/navigation"
import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface PropertyImage {
  id: string
  url: string
}

interface PropertyDetails {
  name: string
  location: string
  owner: {
    name: string
    avatar: string
    role: string
  }
  details: {
    floors: number
    units: number
    officeRooms: number
    meetingRooms: number
    lobbies: number
    restrooms: number
    breakRooms: number
    cafeteria: number
    gym: number
  }
  images: PropertyImage[]
}

// This would typically come from your backend/state management
const propertyData: PropertyDetails = {
  name: "Azure Haven",
  location: "Queens Center NY, USA",
  owner: {
    name: "Darren Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Property Owner",
  },
  details: {
    floors: 10,
    units: 30,
    officeRooms: 50,
    meetingRooms: 10,
    lobbies: 20,
    restrooms: 40,
    breakRooms: 3,
    cafeteria: 2,
    gym: 1,
  },
  images: [
    {
      id: "1",
      url: "/logo.png",
    },
    {
      id: "2",
      url: "/logo.png",
    },
    {
      id: "3",
      url: "/logo.png",
    },
  ],
}

export default function PropertyPreviewPage() {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = React.useState(propertyData.images[0])

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
            Back
          </button>
          <span className="text-muted-foreground">/</span>
          <span>Preview Property</span>
        </div>
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          Exit preview
        </Button>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="space-y-6">
          {/* Main Image */}
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={selectedImage.url || "/placeholder.svg"}
              alt={propertyData.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-4">
            {propertyData.images.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className={`relative aspect-[4/3] w-32 rounded-lg overflow-hidden ${
                  selectedImage.id === image.id ? "ring-2 ring-[#0082ed]" : ""
                }`}
              >
                <Image src={image.url || "/placeholder.svg"} alt={propertyData.name} fill className="object-cover" />
              </button>
            ))}
            <button className="flex items-center justify-center w-32 aspect-[4/3] bg-muted rounded-lg text-sm text-muted-foreground hover:bg-muted/80">
              Show all photos
            </button>
          </div>

          {/* Property Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold mb-2">{propertyData.name}</h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {propertyData.location}
              </div>
            </div>

            {/* Owner Info */}
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={propertyData.owner.avatar || "/placeholder.svg"}
                  alt={propertyData.owner.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{propertyData.owner.name}</div>
                <div className="text-sm text-muted-foreground">{propertyData.owner.role}</div>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Property Detail</h2>
              <div className="grid grid-cols-2 gap-y-4">
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Floors</span>
                  <span className="font-medium">{propertyData.details.floors}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Units</span>
                  <span className="font-medium">{propertyData.details.units}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Offices Rooms</span>
                  <span className="font-medium">{propertyData.details.officeRooms}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Meeting Rooms</span>
                  <span className="font-medium">{propertyData.details.meetingRooms}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Lobbies</span>
                  <span className="font-medium">{propertyData.details.lobbies}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Restrooms</span>
                  <span className="font-medium">{propertyData.details.restrooms}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Break Rooms</span>
                  <span className="font-medium">{propertyData.details.breakRooms}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Cafeteria</span>
                  <span className="font-medium">{propertyData.details.cafeteria}</span>
                </div>
                <div className="flex justify-between pr-8">
                  <span className="text-muted-foreground">Gym</span>
                  <span className="font-medium">{propertyData.details.gym}</span>
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

