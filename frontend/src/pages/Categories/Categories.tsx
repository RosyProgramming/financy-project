import { Page } from "@/components/Page"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpDown, BriefcaseBusiness, CarFront, HeartPulse, PiggyBank, Plus, ShoppingCart, Tag, Ticket, ToolCase, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MainCard } from "./components/MainCard"
import { CategoryCard } from "./components/CategoryCard"
import { CreateCategoryDialog } from "./components/CreateCategoryDialog"
import { useState } from "react"

export function CategoriesPage() {

    const [openDialog, setOpenDialog] = useState(false)

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

                <CreateCategoryDialog open={openDialog} onOpenChange={setOpenDialog} onSuccess={() => {}} />
                             

                {/* Main */}
                <div className="flex flex-row items-start gap-6 w-full bg-gray-100">
                    <MainCard
                        icon={Tag}
                        value="8"
                        label="TOTAL DE CATEGORIAS"
                    />

                    <MainCard
                        icon={ArrowUpDown}
                        value="27"
                        label="TOTAL DE TRANSAÇÕES"
                        iconColor="text-purple-base"
                    />

                    <MainCard
                        icon={Utensils}
                        value="Alimentação"
                        label="CATEGORIA MAIS UTILIZADA"
                        iconColor="text-blue-base"
                    />
                </div>

                {/*Conteudo Principal*/}
                <div className="w-full bg-gray-100 ">
                    <div className="grid grid-cols-4 gap-6">
                        <CategoryCard title="Alimentação" description="Restaurantes,delivery e refeições" items={12} tag="Alimentação" icon={Utensils} iconColor="text-blue-base bg-blue-light" color=" text-blue-dark bg-blue-light" />
                        <CategoryCard title="Entretenimento" description="Cinema,jogos e lazer" items={2} tag="Entretenimento" icon={Ticket} iconColor="text-pink-base bg-pink-light" color="text-pink-dark bg-pink-light" />
                        <CategoryCard title="Investimento" description="Aplicações e retornos financeiros" items={1} tag="Investimento" icon={PiggyBank} iconColor="text-green-base bg-green-light" color=" text-green-dark bg-green-light" />
                        <CategoryCard title="Mercado" description="Compras de supermercado" items={3} tag="Mercado" icon={ShoppingCart} iconColor="text-orange-base bg-orange-light" color=" text-orange-dark bg-orange-light" />
                        <CategoryCard title="Salário" description="Renda mensal e bonificações" items={3} tag="Salário" icon={BriefcaseBusiness} iconColor="text-green-base bg-green-light" color="text-green-dark bg-green-light" />
                        <CategoryCard title="Saúde" description="Medicamentos,consultas e exames" items={0} tag="Saúde" icon={HeartPulse} iconColor="text-red-base bg-red-light" color=" text-red-dark bg-red-light" />
                        <CategoryCard title="Transporte" description="Gasolina,transporte público e viagens" items={8} tag="Transporte" icon={CarFront} iconColor="text-purple-base bg-purple-light" color="text-purple-dark bg-purple-light" />
                        <CategoryCard title="Utilidades" description="Energia,água,internet e telefone" items={7} tag="Utilidades" icon={ToolCase} iconColor="text-yellow-base bg-yellow-light" color="text-yellow-dark bg-yellow-light" />
                    </div>
                </div>
            </div>
        </Page>
    )
}