import React, { useState } from "react";
import AttendanceTable from "../components/AttendanceTable";
import SummaryRow from "../components/SummaryRow";
import SaveResetButtons from "../components/SaveResetButtons";
import { saveAttendance } from "../utils/api";
import { WorkHours } from "../types/attendance";

const initialData: WorkHours = {
    "2024-12-01": 8,
    "2024-12-02": 6,
    "2024-12-03": 0,
};

const Home = () => {
    const [workHours, setWorkHours] = useState(initialData);
    const [originalData] = useState(initialData);

    const handleSave = async () => {
        try {
            await saveAttendance({ workHours });
            alert("Data saved successfully!");
        } catch (error) {
            alert("Error saving data!");
        }
    };

    const handleReset = () => {
        setWorkHours(originalData);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Work Attendance</h1>
            <AttendanceTable initialData={workHours} onUpdate={setWorkHours} />
            <SummaryRow data={workHours} />
            <SaveResetButtons onSave={handleSave} onReset={handleReset} />
        </div>
    );
};

export default Home;
