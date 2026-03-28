import { Card, CardDescription, CardTitle } from "@/components/ui/card"


interface MainCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  value: string | number
  label: string
  iconColor?: string
}

export function MainCard({
  icon: Icon,
  value,
  label,
  iconColor = "text-gray-700",
}: MainCardProps) {
  return (
    <Card className="w-[378.67px] h-[106px] border border-gray-200 bg-white rounded-xl p-6 flex flex-row items-start gap-4">
      
      {/* ICON */}
      <div className="flex items-center justify-center w-8 h-8">
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>

      {/* TEXT */}
      <div className="flex flex-col justify-center gap-2 flex-1">
        <CardTitle className="text-[28px] leading-8 font-bold text-gray-800">
          {value}
        </CardTitle>

        <CardDescription className="text-xs leading-4 font-medium uppercase tracking-[0.6px] text-gray-500">
          {label}
        </CardDescription>
      </div>

    </Card>
  )
}