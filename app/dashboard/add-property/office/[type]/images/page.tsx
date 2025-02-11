"use client"

import { useRouter } from "next/navigation"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"

interface UploadedImage {
  id: string
  url: string
  file: File
}

export default function PropertyImagesPage() {
  const router = useRouter()
  const [images, setImages] = React.useState<UploadedImage[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const [coverPhotoId, setCoverPhotoId] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    const newImages = imageFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file,
    }))

    setImages((prev) => {
      const combined = [...prev, ...newImages]
      if (!coverPhotoId && combined.length > 0) {
        setCoverPhotoId(combined[0].id)
      }
      return combined
    })
  }

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
    if (coverPhotoId === id) {
      setCoverPhotoId(images[0]?.id || null)
    }
  }

  const setCoverPhoto = (id: string) => {
    setCoverPhotoId(id)
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
          <Button variant="outline">Preview</Button>
          <Button onClick={() => router.push("/dashboard")} disabled={images.length < 5}>
            Publish
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
          <div className="mt-2 h-1 bg-[#0082ed] w-full" />
        </div>

        <div className="space-y-1 mb-8">
          <h1 className="text-2xl font-semibold">Add Images of your property</h1>
          <p className="text-muted-foreground">Upload atleast 5 photos for now. You can add more later.</p>
        </div>

        {images.length === 0 ? (
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center ${
              isDragging ? "border-[#0082ed] bg-[#0082ed]/5" : "border-border"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Drag & drop your images</p>
            <p className="text-sm text-muted-foreground">
              or{" "}
              <button onClick={() => fileInputRef.current?.click()} className="text-[#0082ed] hover:underline">
                browse
              </button>
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`relative aspect-square rounded-lg overflow-hidden ${
                    coverPhotoId === image.id ? "ring-2 ring-[#0082ed]" : ""
                  }`}
                >
                  <Image src={image.url || "/placeholder.svg"} alt="Property" fill className="object-cover" />
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {coverPhotoId === image.id && (
                    <div className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
                      Cover photo
                    </div>
                  )}
                  {coverPhotoId !== image.id && (
                    <button
                      onClick={() => setCoverPhoto(image.id)}
                      className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded hover:bg-black/70"
                    >
                      Set as cover
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-[#0082ed] hover:text-[#0082ed]"
              >
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm">Add more</span>
              </button>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Back
              </Button>
              <Button onClick={() => router.push("/dashboard")} disabled={images.length < 5}>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

