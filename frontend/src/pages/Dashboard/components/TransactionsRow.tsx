import { CircleArrowUp, CircleArrowDown } from "lucide-react"

type TransactionsRowProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  date: string
  category: string
  positive: boolean
  value: string
  color: {
    bg: string
    text: string
  }
}

export function TransactionsRow({
  icon: Icon,
  title,
  date,
  category,
  value,
  positive,
  color,
}: TransactionsRowProps) {
  return (
    <div className="flex items-center h-20 border-b border-gray-200">

      {/* 🔹 LEFT (ÍCONE + TEXTO) */}
      <div className="flex items-center gap-4 px-6 flex-1">

        {/* ÍCONE */}
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color.bg}`}>
          <Icon className={`w-4 h-4 ${color.text}`} />
        </div>

        {/* TEXTO */}
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium text-gray-800">
            {title}
          </p>
          <span className="text-sm text-gray-600">
            {date}
          </span>
        </div>

      </div>

      {/* 🔹 CATEGORIA */}
      <div className="px-6">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${color.bg} ${color.text}`}>
          {category}
        </span>
      </div>

      {/* 🔹 VALOR */}
      <div className="flex items-center gap-2 px-6">

        <span className="text-sm font-semibold text-gray-800">
          {value}
        </span>

        {positive ? (
          <CircleArrowUp className="w-4 h-4 text-brand" />
        ) : (
          <CircleArrowDown className="w-4 h-4 text-red-base" />
        )}

      </div>

    </div>
  )
}