"use client";

import React, { useState } from "react";
import { WorkHours } from "../types/attendance";

interface Props {
    initialData?: WorkHours;
}

const AttendanceTable: React.FC<Props> = ({ initialData = {} }) => {
    const [workHours, setWorkHours] = useState<WorkHours>(initialData);
    const [error, setError] = useState<string | null>(null);
    const [originalData] = useState<WorkHours>(initialData); // Przechowujemy oryginalne dane

    const handleChange = (date: string, hours: number) => {
        // Walidacja godzin
        if (hours < 0 || hours > 24) {
            setError(`Hours for ${date} must be between 0 and 24.`);
            return;
        }
        setError(null);
        setWorkHours({
            ...workHours,
            [date]: hours,
        });
    };

    // Funkcja do zapisu danych
    const handleSave = async () => {
        // Symulacja zapisu do lokalnego API
        try {
            const response = await fetch("/api/attendance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ workHours }),
            });
            if (response.ok) {
                alert("Dane zostały zapisane!");
            } else {
                alert("Błąd podczas zapisu danych.");
            }
        } catch (error) {
            alert("Wystąpił błąd: " + error);
        }
    };

    // Funkcja do resetowania danych
    const handleReset = () => {
        setWorkHours(originalData);
        setError(null); // Resetowanie ewentualnych błędów
    };

    // Obliczanie sumy godzin
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
                                            parseInt(e.target.value, 10) || 0
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
            <div style={{ marginTop: "20px" }}>
                <button onClick={handleSave} style={{ marginRight: "10px" }}>
                    Zapisz
                </button>
                <button onClick={handleReset}>Odśwież</button>
            </div>
        </div>
    );
};

export default AttendanceTable;
