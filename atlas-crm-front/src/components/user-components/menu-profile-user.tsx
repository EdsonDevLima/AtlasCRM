import { CgProfile } from "react-icons/cg";
import Style from "./menu-profile-user.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { ContextUserApp } from "../../context/contextApp";

export function MenuProfileUser() {
  const { logout } = useContext(ContextUserApp);
  const [displayAction, setDisplayAction] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setDisplayAction(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className={Style.menuProfileUserConteiner}>
      <button 
        type="button"
        className={Style.buttonProfileConteiner} 
        onClick={() => setDisplayAction(!displayAction)}
      >
        <CgProfile />
        
        {displayAction && (
          <ul className={Style.profileActions}>
            <li>Trocar senha</li>
            <li>Configurações</li>
            <li onClick={logout} style={{ color: '#ef4444' }}>Sair</li>
          </ul>
        )}
      </button>
    </div>
  );
}
