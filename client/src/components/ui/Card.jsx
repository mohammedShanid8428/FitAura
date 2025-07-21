export function Card({ className, children, ...props }) {
  return (
    <div className={`bg-gray-600 rounded-xl border border-green-300 shadow-md  ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  )
}
