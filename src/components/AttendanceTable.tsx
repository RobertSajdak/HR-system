"use client";

import React, { useState } from "react";
import { WorkHours } from "../types/attendance";

interface Props {
    initialData?: WorkHours;
}

const AttendanceTable: React.FC<Props> = ({ initialData = {} }) => {
    const [workHours, setWorkHours] = useState<WorkHours>(initialData);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (date: string, hours: number) => {
        // Walidacja: godziny muszą być w zakresie 0–24
        if (hours < 0 || hours > 24) {
            setError(`Hours for ${date} must be between 0 and 24.`);
            return;
        }
        setError(null); // Reset błędu, jeśli wartość jest poprawna
        setWorkHours({
            ...workHours,
            [date]: hours,
        });
    };

    const totalHours = Object.values(workHours).reduce((sum, hours) => sum + hours, 0);

    return (
        <div>
            <h2>Attendance Table</h2>
            {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
            <table border={1} cellPadding={10} style={{ width: "100%", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Hours Worked</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(workHours).map(([date, hours]) => (
                        <tr key={date}>
                            <td>{date}</td>
                            <td>
                                <input
                                    type="number"
                                    value={hours}
                                    onChange={(e) =>
                                        handleChange(
                                            date,
                                            parseInt(e.target.value, 10) || 0 // Domyślnie ustaw na 0, jeśli puste
                                        )
                                    }
                                    style={{ width: "60px" }}
                                    min={0}
                                    max={24}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>{totalHours}</strong></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default AttendanceTable;
