import type { PropsSearch } from "../../types/sales";
import Style from "./searchSales.module.css"
import { IoSearch } from "react-icons/io5";
export function SearchSales({ value, onChange }: PropsSearch){
    return (
    <div className={Style.SearchSales}>
      <input
        type="text"
        placeholder="Buscar venda"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button>
        <IoSearch />
      </button>
    </div>
  )
}