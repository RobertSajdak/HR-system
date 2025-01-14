'use client';

import { useState } from "react";

interface AttendanceData {
  [date: string]: number;
}

interface Props {
  initialData: AttendanceData;
}

const AttendanceTable = ({ initialData }: Props) => {
  const [editableData, setEditableData] = useState<AttendanceData>({ ...initialData });
  const [savedData, setSavedData] = useState<AttendanceData>({ ...initialData });

  const handleChange = (date: string, value: string) => {
    const hours = Math.max(0, Math.min(24, Number(value))); // Walidacja wartości godzin
    setEditableData((prevData) => ({
      ...prevData,
      [date]: hours,
    }));
  };

  const addRow = () => {
    const lastDate = Object.keys(editableData).sort().pop();
    const newDate = lastDate ? new Date(lastDate) : new Date("2024-12-04");
    newDate.setDate(newDate.getDate() + 1);
    const newDateString = newDate.toISOString().split('T')[0];

    setEditableData((prevData) => ({
      ...prevData,
      [newDateString]: 0,
    }));
  };

  const handleSave = () => {
    setSavedData({ ...editableData });
    alert("Zmiany zapisane.");
  };

  const handleReset = () => {
    // Przywrócenie danych zapisanych bez chwilowego usuwania wierszy
    setEditableData(() => ({ ...savedData }));
    alert("Przywrócono zapisane dane.");
  };

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

      {Object.keys(editableData).length < 31 && (
        <button onClick={addRow}>Dodaj nowy wiersz</button>
      )}

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleSave} style={{ marginRight: "10px" }}>
          Zapisz
        </button>
        <button onClick={handleReset}>
          Odśwież
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;
