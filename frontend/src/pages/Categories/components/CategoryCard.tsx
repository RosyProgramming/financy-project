import { Button } from "@/components/ui/button"
import { SquarePen, Trash } from "lucide-react"

type CategoryCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  iconColor?: string
  color: string
  title: string
  description: string
  items: number
  tag: string

  onEdit: () => void
  onDelete: () => void
}

export function CategoryCard({
  icon: Icon,
  iconColor,
  color,
  title,
  description,
  items,
  tag,
  onEdit,
  onDelete
}: CategoryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-5">


        <div className="flex justify-between items-start">

            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor}`}>
                <Icon className="w-4 h-4" />
            </div>

            <div className="flex items-center gap-2">
            <Button  variant="outline" size="icon" className="bg-white" onClick={onDelete}>
                <Trash className="w-4 h-4 text-danger"/>
            </Button>
            <Button variant="outline" size="icon" className="bg-white" onClick={onEdit}>
                <SquarePen className="w-4 h-4 text-gray-700"/>
            </Button>
            </div>
        </div>


        <div className="flex flex-col gap-1">
            <span className="text-base font-semibold text-gray-800 leading-6">
            {title}
            </span>
            <span className="text-sm text-gray-600 leading-5">
            {description}
            </span>
        </div>

   
        <div className="flex justify-between items-center">
            <div className={`px-3 py-1 rounded-full ${color} flex items-center justify-end`}>
                <span className="text-sm font-mediu leading-5">
                {tag}
                </span>
            </div>
            <span className="text-sm text-gray-600 leading-5">
                {items} itens
            </span>
        </div>
    </div>
  )
}