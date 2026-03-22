import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

type DashboardCardProps = {
  title: string
  value: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  iconClassName: string
}

export function DashboardCard({ title, value, icon: Icon, iconClassName }: DashboardCardProps) {
  return (
    <Card className=" h-[118px] p-6 gap-4 border border-gray-200 bg-white rounded-xl">

      {/* HEADER */}
      <CardHeader className="flex flex-row items-center gap-3 p-0">

        {/* Ícone */}
        {Icon && (
          <Icon className={`w-5 h-5 ${iconClassName}`} />
        )}

        {/* Título */}
        <CardTitle className="text-xs font-medium uppercase tracking-[0.6px] text-gray-500">
          {title}
        </CardTitle>

      </CardHeader>

      {/* VALOR */}
      <CardContent className="p-0">
        <p className="text-[28px] leading-8 font-bold text-gray-800">
          {value}
        </p>
      </CardContent>

    </Card>
  )
}