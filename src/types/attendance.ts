export interface WorkHours {
    [date: string]: number; // np. "2024-12-01": 8
}

export interface AttendanceData {
    workHours: WorkHours;
}
