import { useEffect, useRef, useState } from "react";
import Style from "./menu.module.css";
import { MdPointOfSale } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { Link } from "react-router-dom";


export function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen,setIsModalOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement | null>(null);

    const closeMenu = () => {
        setIsOpen(false);
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className={`${Style.menuList} ${isModalOpen ? Style.openModal:""}`}>
        <div 
            onClick={() =>{ setIsOpen(!isOpen); setIsModalOpen(!isModalOpen)}}
            className={`${Style.menu} ${isOpen ? Style.isOpen : ""}`}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul>
            <li><Link onClick={closeMenu} to={"/sales"}>Vendas <MdPointOfSale /></Link></li>
            <li><Link onClick={closeMenu} to={"/customers"}>Clientes <RiCustomerService2Fill /></Link></li>
            <li><Link onClick={closeMenu} to={"/products"}>Produtos <MdOutlineProductionQuantityLimits /></Link></li>    
            <li><Link onClick={closeMenu} to={"/dashboard"}>Dashboard <BiSolidReport /></Link></li>      
        </ul>

        </div>
    );
}
