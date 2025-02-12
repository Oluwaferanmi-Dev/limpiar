import { Bell, ChevronDown } from "lucide-react"

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
          <span className="text-sm font-medium">William Scott</span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </header>
  )
}

