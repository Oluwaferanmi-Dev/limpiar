"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { requestPasswordReset } from "@/actions/password-reset"

export function ForgotPasswordForm() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle")
  const [error, setError] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setError("")

    try {
      const result = await requestPasswordReset(email)
      if (result.success) {
        // Store email for potential resend
        localStorage.setItem("resetEmail", email)
        // Redirect to check email page
        router.push("/check-email")
      } else {
        setError(result.message)
        setStatus("idle")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      setStatus("idle")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Forgot Password</h1>
        <p className="text-muted-foreground">
          Enter the email you registered with and we&apos;ll send you a link in few minutes.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="hello@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        {status === "success" && (
          <p className="text-sm text-green-500 text-center">Password reset link has been sent to your email.</p>
        )}
        <Button
          type="submit"
          className="w-full bg-[#0082ed] hover:bg-[#0082ed]/90"
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" ? "Sending..." : "Send reset link"}
        </Button>
      </form>
    </div>
  )
}

