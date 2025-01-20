import { AttendanceData } from "../types/attendance";

export const saveAttendance = async (data: AttendanceData) => {
    const response = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to save attendance data");
    }
};

export const updateNote = async (date: string, contain: string) => {
    const response = await fetch("/api/notes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, contain }),
    });

    if (!response.ok) {
        throw new Error("Failed to update note");
    }

    return await response.json();
};
