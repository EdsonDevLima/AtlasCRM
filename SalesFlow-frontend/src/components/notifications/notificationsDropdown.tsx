import { IoIosNotifications } from "react-icons/io";
import api from "../../service/api";
import { useEffect, useState } from "react";
import type { INotification } from "../../types/notifications";
import Style from "./notificationsDropdown.module.css";

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [pendingNotifications, setPendingNotifications] = useState(false);
  const [open, setOpen] = useState(false);

  const getNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("notification", {
        headers: { token },
      });

      const data = response.data.items || [];
      setNotifications(data);

      const hasPending = data.some((n: INotification) => !n.viewed);
      setPendingNotifications(hasPending);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className={Style.container}>
      <div
        className={Style.iconWrapper}
        onClick={() => setOpen(!open)}
      >
        <IoIosNotifications size={26} />

        {pendingNotifications && <span className={Style.dot} />}
      </div>

      {open && (
        <div className={Style.dropdown}>
          {notifications.length === 0 ? (
            <p className={Style.empty}>Nenhuma notificação</p>
          ) : (
            <ul>
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`${Style.notificationItem} ${
                    !n.viewed ? Style.unread : ""
                  }`}
                >
                  <p>{n.message}</p>
                  <span className={Style.date}>
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}