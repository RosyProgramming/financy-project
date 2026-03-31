import { Page } from "@/components/Page"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpDown, Plus, Tag, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MainCard } from "./components/MainCard"
import { CategoryCard } from "./components/CategoryCard"
import { CreateCategoryDialog } from "./components/CreateCategoryDialog"
import { useState } from "react"
import { iconMap, colorMap } from "@/constants/Category"
import { useQuery } from "@apollo/client/react"
import type { Category, CategorySummaryResponse } from "../../types"
import { LIST_CATEGORIES, GET_CATEGORY_SUMMARY } from "@/lib/graphql/queries/Categories"
import { EditCategoryDialog } from "./components/EditCategoryDialog"
import { DeleteCategoryDialog } from "./components/DeleteCategoryDialog"

export function CategoriesPage() {

    const [openDialog, setOpenDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openDeletetDialog, setOpenDeleteDialog] = useState(false)
    const [category, setCategory] = useState<Category | null>(null)

    //  categorias
    const {
        data: categoriesData,
        loading: loadingCategories,
        refetch,
    } = useQuery<{ categories: Category[] }>(LIST_CATEGORIES)

     // summary
    const {
        data: summaryData,
        loading: loadingSummary,
    } = useQuery<CategorySummaryResponse>(GET_CATEGORY_SUMMARY)

    const categories = categoriesData?.categories || []
    const summary = summaryData?.categorySummary

    const handleEditCategory = (editCategory: Category) => {
        setCategory(editCategory)
        setOpenEditDialog(true)
    }

    const handleDeleteCategory = (deleteCategory: Category) => {
        setCategory(deleteCategory)
        setOpenDeleteDialog(true)
    }

    return (
        <Page>
            <div className="w-full flex flex-col gap-8">

                {/* Header */}
                <Card className="flex flex-row justify-between items-center w-full  h-[58px] ring-0 py-0">
                    <CardHeader className="flex flex-col gap-0.5 flex-1 px-0">
                        <CardTitle className="text-2xl font-bold leading-8 text-gray-800 font-sans">
                            Categorias
                        </CardTitle>
                        <CardDescription className="text-base font-normal leading-6 text-gray-600 font-sans">
                            Organize suas transações por categorias
                        </CardDescription>
                    </CardHeader>

                    <Button 
                    onClick={() => setOpenDialog(true)}
                    className="flex items-center gap-2 px-3 py-2 h-9 bg-brand rounded-lg text-sm font-medium text-white hover:bg-brand-dark transition-colors">
                        <Plus className="w-4 h-4" />
                        Nova categoria
                    </Button>
                </Card>

                <CreateCategoryDialog open={openDialog} onOpenChange={setOpenDialog} onSuccess={() => refetch()} />
                             

                {/* Main */}
                <div className="flex flex-row items-start gap-6 w-full bg-gray-100">
                    
                    <MainCard
                        icon={Tag}
                        value={loadingSummary ? "..." : String(summary?.totalCategories ?? 0)}
                        label="TOTAL DE CATEGORIAS"
                    />

                    <MainCard
                        icon={ArrowUpDown}
                        value={loadingSummary ? "..." : String(summary?.totalTransactions ?? 0)}
                        label="TOTAL DE TRANSAÇÕES"
                        iconColor="text-purple-base"
                    />

                    <MainCard
                        icon={Utensils}
                        value={
                        loadingSummary
                            ? "..."
                            : summary?.mostUsedCategory?.title ?? "—"
                        }
                        label="CATEGORIA MAIS UTILIZADA"
                        iconColor="text-blue-base"
                    />
                </div>

                {/*Conteudo Principal*/}
                <div className="w-full bg-gray-100 ">
                    <div className="grid grid-cols-4 gap-6">
                        {loadingCategories ? (
                        Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="h-40 rounded-xl bg-gray-200 animate-pulse" />
                        ))
                        ) : categories.length === 0 ? (
                        <p className="text-gray-500">Nenhuma categoria cadastrada</p>
                        ) : (
                        categories.map((category) => {
                            const Icon =
                            iconMap[category.icon as keyof typeof iconMap] ?? Tag

                            const colors =
                            colorMap[category.color as keyof typeof colorMap] ??
                            colorMap.blue

                            return (
                            <CategoryCard
                                key={category.id}
                                icon={Icon}
                                iconColor={colors.icon}
                                color={colors.tag}
                                title={category.title}
                                description={category.description ?? '-'}
                                items={category._count?.transactions ?? 0}
                                tag={category.title}
                                onEdit={()=>handleEditCategory(category)}
                                onDelete={()=>handleDeleteCategory(category)}
                            />
                            )
                        })
                        )}
                    </div>
                </div>
            </div>
            
            <EditCategoryDialog
                open={openEditDialog}
                onOpenChange={setOpenEditDialog}
                categoria={category}
                onUpdated={()=> refetch()}
            />

            <DeleteCategoryDialog
              open={openDeletetDialog}
              onOpenChange={setOpenDeleteDialog}
              categoria={category}
            />

        </Page>
    )
}