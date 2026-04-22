
import { Menu } from "../menu/menu"
import Style from "./workspaceHeader.module.css"
import { MenuProfileUser } from "../user-components/menu-profile-user"
import { NotificationsDropdown } from "../notifications/notificationsDropdown"
export function HeaderWorkspace(){
    return <header className={Style.workspaceHeader}>
            <Menu/>
            <NotificationsDropdown/>
            <MenuProfileUser/>
    </header>
}