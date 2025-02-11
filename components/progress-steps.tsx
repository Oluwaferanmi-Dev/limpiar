interface ProgressStepsProps {
  currentStep: number
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [
    { number: "1", label: "Category" },
    { number: "2", label: "Title" },
    { number: "3", label: "Units" },
    { number: "4", label: "Location" },
    { number: "5", label: "Image" },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex-1">
            <div className={`h-2 rounded-full ${index + 1 <= currentStep ? "bg-[#0082ed]" : "bg-muted"}`} />
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
        {steps.map((step) => (
          <div key={step.number} className="flex-1">
            {step.number}. {step.label}
          </div>
        ))}
      </div>
    </div>
  )
}

