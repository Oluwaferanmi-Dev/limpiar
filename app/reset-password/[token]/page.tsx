import Image from "next/image"
import { ResetPasswordForm } from "@/components/reset-password-form"

interface PageProps {
  params: { token: string }
}

export default function ResetPasswordPage({ params }: PageProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px] mx-auto space-y-8">
        <div className="flex justify-center">
          <Image src="/logo.png" alt="Limpiar Logo" width={165} height={48} priority />
        </div>
        <ResetPasswordForm token={params.token} />
      </div>
    </main>
  );
}
