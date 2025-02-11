"use client"

import { useRouter } from "next/navigation"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProgressSteps } from "@/components/progress-steps"
import { MapPin } from "lucide-react"

const suggestions = [
  "Queens NY, USA",
  "Queens Center NY, USA",
  "Queens Place Mall NY, USA",
  "Queens Boulevard NY, USA",
  "Queens Blvrd Woodside NY, USA",
]

export default function PropertyLocationPage() {
  const router = useRouter()
  const [search, setSearch] = React.useState("")
  const [showSuggestions, setShowSuggestions] = React.useState(false)

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
          <Button onClick={() => router.push("/dashboard/add-property/office/images")} disabled={!search.trim()}>
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
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setShowSuggestions(true)
                  }}
                  className="pl-9"
                />
              </div>
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      className="w-full px-3 py-2 text-left hover:bg-muted"
                      onClick={() => {
                        setSearch(suggestion)
                        setShowSuggestions(false)
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="aspect-square bg-muted rounded-lg">
            {/* Map placeholder */}
            <img src="/placeholder.svg" alt="Map" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>

        <ProgressSteps currentStep={4} />
      </div>
    </div>
  )
}

