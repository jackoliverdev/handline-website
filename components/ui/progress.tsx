"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, indicatorClassName, ...props }, ref) => {
  const [progress, setProgress] = React.useState(value)

  React.useEffect(() => {
    setProgress(value)
  }, [value])

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
      {...props}
      value={progress}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 bg-primary transition-all duration-200 ease-out",
          indicatorClassName
        )}
        style={{
          transform: `translateX(-${100 - (progress || 0)}%)`
        }}
      />
    </ProgressPrimitive.Root>
  )
})

Progress.displayName = "Progress"

export { Progress } 