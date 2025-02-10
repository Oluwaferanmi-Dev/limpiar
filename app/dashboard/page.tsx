import { WelcomeCard } from "./welcome-card"
import { PropertySteps } from "./property-steps"

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-12">
      <WelcomeCard />
      <PropertySteps />
    </div>
  )
}

