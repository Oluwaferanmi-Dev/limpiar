"use client"

import { useRouter } from "next/navigation"
import {
  Building2,
  ShoppingBag,
  Warehouse,
  Hotel,
  Stethoscope,
  BuildingIcon as Buildings,
  GraduationCap,
  Train,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react" // Import React

const categories = [
  {
    id: "office",
    icon: Building2,
    title: "Office",
    description: "Corporate & Administrative",
  },
  {
    id: "mixed-use",
    icon: Buildings,
    title: "Mixed-Use",
    description: "Multi-Purpose Developments",
  },
  {
    id: "retail",
    icon: ShoppingBag,
    title: "Retail",
    description: "Shopping & Consumer Goods",
  },
  {
    id: "educational",
    icon: GraduationCap,
    title: "Educational & Institutional",
    description: "Learning & Public Services",
  },
  {
    id: "industrial",
    icon: Warehouse,
    title: "Industrial",
    description: "Production & Logistics",
  },
  {
    id: "entertainment",
    icon: Hotel,
    title: "Entertainment & Recreational",
    description: "Leisure & Fun",
  },
  {
    id: "hospitality",
    icon: Hotel,
    title: "Hospitality",
    description: "Lodging & Dining",
  },
  {
    id: "transportation",
    icon: Train,
    title: "Transportation & Infrastructure",
    description: "Corporate & Administrative",
  },
  {
    id: "healthcare",
    icon: Stethoscope,
    title: "Healthcare",
    description: "Medical & Wellness",
  },
]

export default function AddPropertyPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)

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
            onClick={() => selectedCategory && router.push(`/dashboard/add-property/${selectedCategory}/type`)}
            disabled={!selectedCategory}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Select your property category</h1>
          <p className="text-muted-foreground">Basic info like property category and sub-category.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg border text-left transition-colors ${
                selectedCategory === category.id
                  ? "border-[#0082ed] bg-[#0082ed]/5"
                  : "hover:border-border hover:bg-muted/50"
              }`}
            >
              <category.icon className="w-6 h-6 mb-2" />
              <h3 className="font-medium">{category.title}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

