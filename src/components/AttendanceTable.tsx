'use client';

import { useState } from "react";

interface AttendanceData {
  [date: string]: number;
}

interface Props {
  initialData: AttendanceData;
}

const AttendanceTable = ({ initialData }: Props) => {
  const [editableData, setEditableData] = useState<AttendanceData>(initialData);

  // Funkcja do obsługi zmiany godzin
  const handleChange = (date: string, value: string) => {
    const hours = Math.max(0, Math.min(24, Number(value))); // Walidacja wartości godzin
    setEditableData((prevData) => ({
      ...prevData,
      [date]: hours,
    }));
  };

  // Funkcja do dodawania nowych wierszy (dni)
  const addRow = () => {
    const lastDate = Object.keys(editableData).sort().pop(); // Pobierz ostatnią datę
    const newDate = lastDate ? new Date(lastDate) : new Date("2024-12-04"); // Jeśli brak daty, zaczynaj od 2024-12-04
    newDate.setDate(newDate.getDate() + 1); // Dodajemy jeden dzień do ostatniej daty
    const newDateString = newDate.toISOString().split('T')[0]; // Format: "YYYY-MM-DD"
    
    setEditableData((prevData) => ({
      ...prevData,
      [newDateString]: 0, // Domyślnie 0 godzin
    }));
  };

  // Funkcja do obliczania sumy godzin
  const totalHours = Object.values(editableData).reduce((acc, hours) => acc + hours, 0);

  return (
    <div>
      <h2>Obecność Pracownika</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Przepracowane godziny</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(editableData).map(([date, hours]) => (
            <tr key={date}>
              <td>{date}</td>
              <td>
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => handleChange(date, e.target.value)}
                  min="0"
                  max="24"
                />
              </td>
            </tr>
          ))}
          <tr>
            <td><strong>Suma godzin</strong></td>
            <td><strong>{totalHours}</strong></td>
          </tr>
        </tbody>
      </table>

      {/* Przycisk do dodania nowego wiersza */}
      {Object.keys(editableData).length < 31 && (
        <button onClick={addRow}>Dodaj nowy wiersz</button>
      )}
    </div>
  );
};

export default AttendanceTable;
