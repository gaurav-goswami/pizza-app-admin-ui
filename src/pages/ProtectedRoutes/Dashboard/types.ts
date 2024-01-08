import { ReactNode } from "react"

export type TDashboardCard = {
    title: string,
    icon: ReactNode,
    value: number | string,
    color: string
}