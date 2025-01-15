"use client";

import React, { useState, useEffect } from "react";

interface AttendanceData {
  workHours: Record<string, number>;
}

const AttendanceTable: React.FC = () => {
  const [editableData, setEditableData] = useState<AttendanceData | null>(null);
  const [employeeName, setEmployeeName] = useState<string>("");
  const [savedData, setSavedData] = useState<AttendanceData | null>(null);

  useEffect(() => {
    // Pobieranie danych z API
    fetch("/api/sampleData")
      .then((res) => res.json())
      .then((data: AttendanceData) => {
        setEditableData(data);
        setSavedData(data);  // Przechowywanie danych początkowych w savedData
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeName(e.target.value);
  };

  const handleHoursChange = (date: string, value: string) => {
    if (editableData) {
      const hours = parseInt(value, 10);
      if (!isNaN(hours) && hours >= 0 && hours <= 24) {
        setEditableData({
          ...editableData,
          workHours: {
            ...editableData.workHours,
            [date]: hours,
          },
        });
      }
    }
  };

  const handleSave = () => {
    if (editableData) {
      setSavedData(editableData); // Zapisujemy zmodyfikowane dane
      alert("Dane zostały zapisane.");
    }
  };

  const handleReset = () => {
    if (savedData) {
      setEditableData(savedData);  // Przywracamy zapisane dane
      alert("Przywrócono zapisane dane.");
    }
  };

  if (!editableData) {
    return <div>Loading...</div>;
  }

  // Oblicz całkowitą liczbę godzin
  const totalHours = Object.values(editableData.workHours).reduce(
    (acc, hours) => acc + hours,
    0
  );

  return (
    <div className="p-4">
      {/* Formularz wprowadzania danych pracownika */}
      <div className="mb-4">
        <label htmlFor="employeeName" className="block font-medium mb-2">
          Imię i nazwisko pracownika:
        </label>
        <input
          id="employeeName"
          type="text"
          value={employeeName}
          onChange={handleNameChange}
          placeholder="Wpisz imię i nazwisko"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      {/* Wyświetlanie danych pracownika */}
      {employeeName && (
        <h2 className="text-lg font-semibold mb-4">
          Obecność pracownika: {employeeName}
        </h2>
      )}

      {/* Tabela */}
      <table className="border-collapse border border-gray-300 w-full mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Data</th>
            <th className="border border-gray-300 p-2">Liczba godzin</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(editableData.workHours).map(([date, hours]) => (
            <tr key={date}>
              <td className="border border-gray-300 p-2">{date}</td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => handleHoursChange(date, e.target.value)}
                  min="0"
                  max="24"
                  className="w-full border border-gray-300 rounded p-1"
                />
              </td>
            </tr>
          ))}
          {/* Wiersz sumujący */}
          <tr className="bg-gray-100 font-bold">
            <td className="border border-gray-300 p-2">Łącznie</td>
            <td className="border border-gray-300 p-2">{totalHours}</td>
          </tr>
        </tbody>
      </table>

      {/* Przyciski */}
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Zapisz
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Odśwież
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;
