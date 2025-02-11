"use client"

import { useRouter } from "next/navigation"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProgressSteps } from "@/components/progress-steps"

export default function PropertyTitlePage() {
  const router = useRouter()
  const [title, setTitle] = React.useState("")
  const maxLength = 40

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

      <div className="max-w-5xl mx-auto p-6">
        <div className="space-y-1 mb-8">
          <h1 className="text-2xl font-semibold">Give a name to your property</h1>
        </div>

        <div className="max-w-md mb-8">
          <div className="relative">
            <Input
              placeholder="Property title"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, maxLength))}
              className="pr-16"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {title.length}/{maxLength}
            </div>
          </div>
        </div>

        <ProgressSteps currentStep={2} />
      </div>
    </div>
  )
}

