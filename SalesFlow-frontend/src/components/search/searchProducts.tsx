import type { PropsSearch } from "../../types/sales";
import Style from "./searchProducts.module.css"
import { IoSearch } from "react-icons/io5";
export function SearchProduct({ value, onChange }: PropsSearch){
    return <div className={Style.SearchProduct}>
    <input type="text" placeholder="Buscar produto" value={value} onChange={(e)=>onChange(e.target.value)}/>
    <button>
    <IoSearch />
    </button>
    </div>
}