import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface PropertyImage {
  id: string
  url: string
  file: File
}

interface PropertyDetails {
  name: string
  location: string
  type: string
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

interface PropertyStore {
  property: PropertyDetails
  setPropertyName: (name: string) => void
  setPropertyLocation: (location: string) => void
  setPropertyType: (type: string) => void
  setPropertyDetails: (details: PropertyDetails["details"]) => void
  setPropertyImages: (images: PropertyImage[]) => void
  reset: () => void
}

const initialState: PropertyDetails = {
  name: "",
  location: "",
  type: "",
  details: {
    floors: 0,
    units: 0,
    officeRooms: 0,
    meetingRooms: 0,
    lobbies: 0,
    restrooms: 0,
    breakRooms: 0,
    cafeteria: 0,
    gym: 0,
  },
  images: [],
}

export const usePropertyStore = create<PropertyStore>()(
  persist(
    (set) => ({
      property: initialState,
      setPropertyName: (name) =>
        set((state) => ({
          property: { ...state.property, name },
        })),
      setPropertyLocation: (location) =>
        set((state) => ({
          property: { ...state.property, location },
        })),
      setPropertyType: (type) =>
        set((state) => ({
          property: { ...state.property, type },
        })),
      setPropertyDetails: (details) =>
        set((state) => ({
          property: { ...state.property, details },
        })),
      setPropertyImages: (images) =>
        set((state) => ({
          property: { ...state.property, images },
        })),
      reset: () => set({ property: initialState }),
    }),
    {
      name: "property-storage",
    },
  ),
)

