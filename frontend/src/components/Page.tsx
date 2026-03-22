interface PageProps {
    children: React.ReactNode;
}

export function Page({children}: PageProps){
    return (
        <div className="flex-1 w-full max-w-[1280px] mx-auto bg-gray-100 p-12">
            {children}
        </div>
    )
}