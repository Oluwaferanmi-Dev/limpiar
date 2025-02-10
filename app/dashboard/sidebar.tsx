import {
  LayoutGrid,
  Home,
  MessageCircle,
  ClipboardList,
  Activity,
  Calendar,
  CreditCard,
  Headphones,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type React from "react" // Added import for React

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-60 bg-[#101113] text-white p-4 flex flex-col">
      <div className="mb-8">
        <Image src="/logo.png" alt="Limpiar Logo" width={120} height={40} className="w-auto h-8" />
      </div>

      <nav className="flex-1 space-y-1">
        <NavItem href="/dashboard" icon={LayoutGrid} active>
          Dashboard
        </NavItem>
        <NavItem href="/property" icon={Home}>
          My Property
        </NavItem>
        <NavItem href="/inbox" icon={MessageCircle}>
          Inbox
        </NavItem>
        <NavItem href="/orders" icon={ClipboardList}>
          New Orders
        </NavItem>
        <NavItem href="/activities" icon={Activity}>
          Activities
        </NavItem>
        <NavItem href="/bookings" icon={Calendar}>
          Bookings
        </NavItem>
        <NavItem href="/payment" icon={CreditCard}>
          Payment
        </NavItem>
      </nav>

      <div className="border-t border-white/10 pt-4 mt-4 space-y-1">
        <NavItem href="/support" icon={Headphones}>
          Help and Support
        </NavItem>
        <NavItem href="/logout" icon={LogOut}>
          Logout
        </NavItem>
      </div>
    </div>
  )
}

function NavItem({
  href,
  icon: Icon,
  children,
  active,
}: {
  href: string
  icon: React.ElementType
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${active ? "bg-white/10" : "hover:bg-white/5"}`}
    >
      <Icon className="w-5 h-5" />
      {children}
    </Link>
  )
}

