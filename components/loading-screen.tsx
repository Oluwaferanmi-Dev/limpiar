import Image from "next/image"

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Image src="/logo.png" alt="Limpiar Logo" width={165} height={48} priority />
      <p className="mt-4 text-muted-foreground">Loading your account...</p>
    </div>
  )
}

