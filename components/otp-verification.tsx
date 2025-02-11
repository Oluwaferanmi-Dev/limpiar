"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { LoadingScreen } from "@/components/loading-screen"
import { verifyOTP } from "@/actions/verify"

interface OTPVerificationProps {
  phoneNumber: string
}

type VerificationStatus = "idle" | "loading" | "success" | "error"

export function OTPVerification({ phoneNumber }: OTPVerificationProps) {
  const router = useRouter()
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""])
  const [status, setStatus] = React.useState<VerificationStatus>("idle")
  const [timeLeft, setTimeLeft] = React.useState(60)
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0]
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpString = otp.join("")
    if (otpString.length !== 6) return

    setStatus("loading")
    try {
      const result = await verifyOTP(otpString)
      setStatus(result.success ? "success" : "error")

      if (result.success) {
        // Show success state briefly before redirecting
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      }
    } catch (error) {
      setStatus("error")
    }
  }

  const handleResend = () => {
    // Add resend OTP logic here
    setTimeLeft(60)
  }

  if (status === "loading") {
    return <LoadingScreen />
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Enter OTP Code</h1>
        <p className="text-muted-foreground">
          Enter the one-time code sent to {phoneNumber} to confirm your account and start with Limpiar
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={cn(
                "w-12 h-12 text-center text-2xl rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-2",
                status === "error" && "border-red-500 text-red-500",
                status === "success" && "border-green-500 text-green-500",
              )}
              maxLength={1}
            />
          ))}
        </div>
        {status === "error" && <p className="text-red-500 text-center">Wrong OTP</p>}
        <Button
          type="submit"
          className="w-full bg-[#0082ed] hover:bg-[#0082ed]/90"
          disabled={otp.some((digit) => !digit)}
        >
          Confirm
        </Button>
      </form>
      <button
        onClick={handleResend}
        disabled={timeLeft > 0}
        className="w-full text-sm text-center text-muted-foreground hover:text-foreground disabled:opacity-50"
      >
        {timeLeft > 0 ? `Resend code in ${timeLeft}s` : "Resend code"}
      </button>
    </div>
  )
}

