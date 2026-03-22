type CategoriesRowProps = {
  label: string
  value: string
  count: string
  color: string
}

export function CategoriesRow({ label, value, count, color }: CategoriesRowProps) {
  return (
    <div className="flex items-center gap-2 w-full">

      {/* TAG */}
      <div className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
        {label}
      </div>

      {/* COUNT */}
      <span className="text-sm text-gray-600 flex-1 text-right">
        {count}
      </span>

      {/* VALUE */}
      <span className="text-sm font-semibold text-gray-800">
        {value}
      </span>

    </div>
  )
}