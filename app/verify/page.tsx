import Image from "next/image"
import { OTPVerification } from "@/components/otp-verification"

export default function VerifyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px] mx-auto space-y-8">
        <div className="flex justify-center">
          <Image src="/logo.png" alt="Limpiar Logo" width={165} height={48} priority />
        </div>
        <OTPVerification phoneNumber="***-***-*900" />
      </div>
    </main>
  )
}

