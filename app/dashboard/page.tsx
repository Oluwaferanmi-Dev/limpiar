import { WelcomeCard } from "./welcome-card"
import { PropertySteps } from "./property-steps"

export default function DashboardPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-12">
      <WelcomeCard />
      <PropertySteps />
    </div>
  )
}

