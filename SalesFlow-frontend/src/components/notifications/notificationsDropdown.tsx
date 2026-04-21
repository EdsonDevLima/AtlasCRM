import { IoIosNotifications } from "react-icons/io";
import api from "../../service/api";
import { useEffect, useRef, useState } from "react";
import type { INotification } from "../../types/notifications";
import Style from "./notificationsDropdown.module.css";

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [pendingNotifications, setPendingNotifications] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className={Style.container}>
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
