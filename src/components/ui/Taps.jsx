import * as React from "react"

export function Tabs({ children, ...props }) {
  return <div {...props}>{children}</div>
}

export function TabsList({ className, children }) {
  return <div className={`flex gap-2 ${className}`}>{children}</div>
}

export function TabsTrigger({ value, onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full border hover:bg-muted ${className}`}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children }) {
  return <div>{children}</div>
}
