export function PropertySteps() {
  const steps = [
    {
      number: 1,
      title: "Category",
      description: "Basic info like property category and sub-category.",
    },
    {
      number: 2,
      title: "Title",
      description: "Give your property a name.",
    },
    {
      number: 3,
      title: "Units",
      description: "Add all kinds of units of your property.",
    },
    {
      number: 4,
      title: "Location",
      description: "Add location of your property.",
    },
    {
      number: 5,
      title: "Image",
      description: "Add photos of your property.",
    },
  ]

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-semibold mb-8">Add your property in few simple steps</h2>
      <div className="space-y-8">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-6">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium shrink-0">
              {step.number}
            </div>
            <div>
              <h3 className="font-medium mb-1">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

