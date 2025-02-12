"use client"

import { useRouter } from "next/navigation"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProgressSteps } from "@/components/progress-steps"
import { MapPin } from "lucide-react"

// Define types for Google Maps
declare global {
  interface Window {
    google: typeof google
    initMap: () => void
  }
}

export default function PropertyLocationPage() {
  const router = useRouter()
  const [search, setSearch] = React.useState("")
  const [suggestions, setSuggestions] = React.useState<google.maps.places.AutocompletePrediction[]>([])
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const [map, setMap] = React.useState<google.maps.Map | null>(null)
  const [marker, setMarker] = React.useState<google.maps.Marker | null>(null)
  const mapRef = React.useRef<HTMLDivElement>(null)
  const autocompleteService = React.useRef<google.maps.places.AutocompleteService | null>(null)
  const placesService = React.useRef<google.maps.places.PlacesService | null>(null)

  React.useEffect(() => {
    // Load Google Maps JavaScript API
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = initMap
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const initMap = () => {
    if (!mapRef.current) return

    const defaultLocation = { lat: 40.7128, lng: -74.006 } // New York City
    const newMap = new window.google.maps.Map(mapRef.current, {
      center: defaultLocation,
      zoom: 13,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    })

    const newMarker = new window.google.maps.Marker({
      map: newMap,
      position: defaultLocation,
      draggable: true,
    })

    setMap(newMap)
    setMarker(newMarker)
    autocompleteService.current = new window.google.maps.places.AutocompleteService()
    placesService.current = new window.google.maps.places.PlacesService(newMap)
  }

  const handleSearchChange = async (value: string) => {
    setSearch(value)
    setShowSuggestions(!!value.trim())

    if (value.trim() && autocompleteService.current) {
      try {
        const response = await new Promise<google.maps.places.AutocompletePrediction[]>((resolve, reject) => {
          autocompleteService.current?.getPlacePredictions(
            {
              input: value,
              types: ["address"],
            },
            (predictions, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                resolve(predictions)
              } else {
                reject(status)
              }
            },
          )
        })
        setSuggestions(response)
      } catch (error) {
        console.error("Error fetching suggestions:", error)
        setSuggestions([])
      }
    } else {
      setSuggestions([])
    }
  }

  const handlePlaceSelect = (prediction: google.maps.places.AutocompletePrediction) => {
    if (!placesService.current) return

    placesService.current.getDetails(
      {
        placeId: prediction.place_id,
        fields: ["geometry", "formatted_address"],
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
          setSearch(prediction.description)
          setShowSuggestions(false)

          if (map && marker) {
            map.setCenter(place.geometry.location)
            map.setZoom(17)
            marker.setPosition(place.geometry.location)
          }
        }
      },
    )
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
            onClick={() => router.push("/dashboard/add-property/office/images")}
            disabled={!search.trim()}
            className="bg-[#0082ed] hover:bg-[#0082ed]/90"
          >
            Next
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="space-y-1 mb-8">
          <h1 className="text-2xl font-semibold">Where is your property located?</h1>
          <p className="text-muted-foreground">Search your address or find it on the map.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="relative">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search location"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-9"
                />
              </div>
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.place_id}
                      className="w-full px-3 py-2 text-left hover:bg-muted"
                      onClick={() => handlePlaceSelect(suggestion)}
                    >
                      {suggestion.description}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div ref={mapRef} className="aspect-square bg-muted rounded-lg overflow-hidden" />
        </div>

        <ProgressSteps currentStep={4} />
      </div>
    </div>
  )
}

