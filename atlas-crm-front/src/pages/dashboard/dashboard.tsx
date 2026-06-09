import { useState } from "react";
import { HeaderWorkspace } from "../../components/headers/workspaceHeader";
import { ProductEntryReport } from "../../components/reports/ProductEntryReport";
import { ProductExitReport } from "../../components/reports/ProductExitReport";
import { UsersReport } from "../../components/reports/UsersReport";
import { RecentCustomers } from "../../components/list/RecentCustomers"; 
import { RecentSales } from "../../components/list/RecentSales"; 
import { SalesFilter, type FilterOptions } from "../../components/filtrers/Salesfilter"; 

import Styles from "./dashboard.module.css"

export function Dashboard(){
    const [salesFilters, setSalesFilters] = useState<FilterOptions>({
        period: "all",
        status: "all"
    })

    const handleFilterChange = (filters: FilterOptions) => {
        setSalesFilters(filters)
    }

    return <>
    <HeaderWorkspace/>
    <section className={Styles.sectionReports}>
        <div className={Styles.filtersArea}>
            <SalesFilter onFilterChange={handleFilterChange} />
        </div>
        <div className={Styles.leftColumn}>
            <div className={Styles.conteinerNotification}>
                <h2>Últimos clientes cadastrados.</h2>
                <div className={Styles.conteinerListDashboard}>
                    <RecentCustomers />
                </div>
            </div>
            <div className={Styles.conteinerNotification}>
                <h2>Últimos Pedidos.</h2>
                <div className={Styles.conteinerListDashboard}>
                    <RecentSales filters={salesFilters} />
                </div>
            </div>
        </div>
        <div className={Styles.conteinerReport}>
        <ProductEntryReport/>
        <ProductExitReport/>
        <UsersReport/>
        </div>
    </section></>
}
