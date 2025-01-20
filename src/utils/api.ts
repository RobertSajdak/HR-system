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
