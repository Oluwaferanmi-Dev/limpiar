"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import React from "react"

const officeTypes = [
  {
    id: "corporate-headquarters",
    title: "Corporate Headquarters",
    description: "Large office building / Single company's HQ",
  },
  {
    id: "skyscrapers",
    title: "Skyscrapers / High-Rise Offices",
    description: "Multi-floor buildings with different businesses",
  },
  {
    id: "business-parks",
    title: "Business Parks / Office Parks",
    description: "Clusters of mid-rise office buildings",
  },
  {
    id: "low-rise",
    title: "Low-Rise / Single-Tenant Offices",
    description: "Smaller office buildings for specific companies",
  },
  {
    id: "co-working",
    title: "Co-Working Spaces",
    description: "Shared workspaces for freelancers and startups",
  },
  {
    id: "call-centers",
    title: "Call Centers",
    description: "Offices designed for customer support services",
  },
  {
    id: "government",
    title: "Government & Municipal Offices",
    description: "Administrative centers for public service",
  },
]

export default function OfficeTypePage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = React.useState<string | null>(null)

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
            onClick={() => selectedType && router.push(`/dashboard/add-property/office/${selectedType}/title`)}
            disabled={!selectedType}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        {/* Progress Steps */}
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
          <div className="mt-2 h-1 bg-[#0082ed] w-[20%]" />
        </div>

        <div className="space-y-1 mb-8">
          <h1 className="text-2xl font-semibold">What kind of office building do you have?</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {officeTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-4 rounded-lg border text-left transition-colors ${
                selectedType === type.id
                  ? "border-[#0082ed] bg-[#0082ed]/5"
                  : "border-border hover:border-[#0082ed] hover:bg-[#0082ed]/5"
              }`}
            >
              <h3 className="font-medium mb-1">{type.title}</h3>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

