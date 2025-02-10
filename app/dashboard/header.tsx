import { Bell, ChevronDown } from "lucide-react"
import Image from "next/image"

export function Header() {
  return (
    <header className="h-16 px-4 flex items-center justify-end border-b">
      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
            2
          </span>
        </button>
        <button className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <Image src="/placeholder.svg?height=32&width=32" alt="Profile" width={32} height={32} />
            </div>
            <span className="text-sm font-medium">William Scott</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </header>
  )
}

