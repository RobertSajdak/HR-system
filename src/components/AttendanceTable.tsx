"use client";

import React, { useState } from "react";
import { WorkHours } from "../types/attendance";

interface Props {
    initialData?: WorkHours;
}

const AttendanceTable: React.FC<Props> = ({ initialData = {} }) => {
    const [workHours, setWorkHours] = useState<WorkHours>(initialData);

    const handleChange = (date: string, hours: number) => {
        setWorkHours({
            ...workHours,
            [date]: hours,
        });
    };

    return (
        <div>
            <h2>Tabela za miesiąc: grudzień 2024 r. pracownik: imię i nazwisko</h2>
            <table style={{ width: "100%", textAlign: "left", border: "1px solid black", borderCollapse: "collapse" }} cellPadding="4">
            {/* <table border={1} cellPadding="10" style={{ width: "100%", textAlign: "left" }}> */}
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Godziny pracy</th>
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
                                        handleChange(date, parseInt(e.target.value, 10) || 0)
                                    }
                                    style={{ width: "60px" }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceTable;
