import Link from "next/link"
import { Button } from "@/components/ui/button"

export function WelcomeCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-gradient-to-r from-[#0082ed] to-[#add7f9] text-white p-8 relative">
      <div className="max-w-lg">
        <h1 className="text-3xl font-semibold mb-2">Welcome, William!</h1>
        <p className="text-base opacity-90 mb-6">Let's go ahead and add your first property to get you started.</p>
        <Link href="/dashboard/add-property">
          <Button size="lg" className="bg-white text-[#0082ed] hover:bg-white/90">
            Add property
          </Button>
        </Link>
      </div>
      <div className="absolute right-0 bottom-0 w-[300px]">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DB1NwsUwEqUebS4gJDF4SPXkDeMx2a.png"
          alt="Building"
          className="object-contain"
        />
      </div>
    </div>
  )
}

