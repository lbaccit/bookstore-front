"use client";

import { useEffect } from "react";
import { useNotificationStore } from "../store/useNotificationStore";

export default function Notification() {
    const { message, type, hideNotification } = useNotificationStore();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                hideNotification();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message, hideNotification]);

    if (!message) return null;

    const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

    return (
        <div className={`fixed top-5 right-5 p-4 rounded-lg text-white ${bgColor} z-50`}
        >
            {message}
        </div>
    );
}