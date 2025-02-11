"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignUpPage() {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validatePassword = (password: string) => {
    return {
      hasMinLength: password.length >= 8,
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasThreeNumbers: (password.match(/\d/g) || []).length >= 3,
    }
  }

  const validation = validatePassword(formData.password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/verify")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Logo */}
      <img src="/logo.png" alt="LIMPIAR Logo" className="mb-6 w-24" />

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign up</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <Input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="hello@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <PhoneInput
              country={"us"}
              value={formData.phone}
              onChange={(phone) => setFormData({ ...formData, phone })}
              inputClass="w-full !h-10 !pl-12 !border-gray-300 rounded-md"
              containerClass="w-full"
            />
            {!formData.phone && <p className="text-red-500 text-sm">Phone number is required</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button type="button" className="absolute right-3 top-2.5" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="text-xs text-gray-500 flex gap-2 mt-1">
              <span className={validation.hasMinLength ? "text-green-500" : ""}>✔ Min 8 characters</span>
              <span className={validation.hasSpecialChar ? "text-green-500" : ""}>✔ 1 special character</span>
              <span className={validation.hasThreeNumbers ? "text-green-500" : ""}>✔ 3 numbers</span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#0082ed] hover:bg-[#0082ed]/90 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              isLoading ||
              !formData.fullName.trim() ||
              !formData.email.trim() ||
              !formData.phone.trim() ||
              !formData.password.trim() ||
              !formData.confirmPassword.trim() ||
              formData.password !== formData.confirmPassword
            }
          >
            {isLoading ? "Processing..." : "Next"}
          </Button>
        </form>
      </div>
    </div>
  )
}

