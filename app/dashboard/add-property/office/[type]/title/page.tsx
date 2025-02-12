"use client"

import { useRouter } from "next/navigation"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePropertyStore } from "@/store/property-store"

export default function PropertyTitlePage() {
  const router = useRouter()
  const { property, setPropertyName } = usePropertyStore()
  const [title, setTitle] = React.useState(property.name)
  const maxLength = 40

  const handleTitleChange = (value: string) => {
    const newValue = value.slice(0, maxLength)
    setTitle(newValue)
    setPropertyName(newValue)
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
          <Button onClick={() => router.push("/dashboard/add-property/office/units")} disabled={!title.trim()}>
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
          <div className="mt-2 h-1 bg-[#0082ed] w-[40%]" />
        </div>

        <div className="space-y-1 mb-8">
          <h1 className="text-2xl font-semibold">Give a name to your property</h1>
        </div>

        <div className="max-w-md">
          <div className="relative">
            <Input
              placeholder="Property title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="pr-16"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {title.length}/{maxLength}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

