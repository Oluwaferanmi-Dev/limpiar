"use server"

export async function verifyOTP(otp: string) {
  // Simulate API call to verify OTP
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // For demo purposes, consider "214429" as the correct OTP
  return {
    success: otp === "32454",
    message: otp === "32454" ? "Verification successful" : "Invalid OTP",
  }
}

