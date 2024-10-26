import { ReactNode } from "react"

export const Container = ({children} : {children: ReactNode}) => {
    return (
        <section className="max-w-[1280px] w-full mx-auto px-3 h-full items-center min-h-[80vh]">
            {children}
        </section>
    )
}