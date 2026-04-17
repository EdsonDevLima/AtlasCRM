import type { PropsSearch } from "../../types/sales";
import Style from "./searchCustomers.module.css"
import { IoSearch } from "react-icons/io5";
export function SearchCustomers({ value, onChange }: PropsSearch){
     return (
    <div className={Style.SearchCustomers}>
      <input
        type="text"
        placeholder="Buscar cliente."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button>
        <IoSearch />
      </button>
    </div>
  )
}