export function PropertySteps() {
  const steps = [
    {
      number: "1.",
      title: "Category",
      description: "Basic info like property category and sub-category.",
    },
    {
      number: "2.",
      title: "Title",
      description: "Give your property a name.",
    },
    {
      number: "3.",
      title: "Units",
      description: "Add all kinds of units of your property.",
    },
    {
      number: "4.",
      title: "Location",
      description: "Add location of your property.",
    },
    {
      number: "5.",
      title: "Image",
      description: "Add photos of your property.",
    },
  ]

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-medium mb-8">Add your property in few simple steps</h2>
      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.number} className="space-y-1">
            <div className="flex gap-2 items-baseline">
              <span className="font-medium">{step.number}</span>
              <span className="font-medium">{step.title}</span>
            </div>
            <p className="text-gray-600 text-sm ml-6">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

