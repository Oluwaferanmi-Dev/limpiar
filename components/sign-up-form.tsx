"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import "react-phone-input-2/lib/style.css"

import { Button } from "@/components/ui/button"

export function SignUpForm() {
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, always succeed and redirect to OTP verification
    router.push("/verify")
  }

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const hasThreeNumbers = (password.match(/\d/g) || []).length >= 3
    return { hasMinLength, hasSpecialChar, hasThreeNumbers }
  }

  const validation = validatePassword(formData.password)

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Existing form fields remain the same */}
        <Button type="submit" className="w-full bg-[#0082ed] hover:bg-[#0082ed]/90 mt-6" disabled={isLoading}>
          {isLoading ? "Processing..." : "Next"}
        </Button>
      </form>
    </div>
  )
}

