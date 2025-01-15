"use client";
import React, { useState, useEffect } from 'react';
import EmployeeNameInput from '../components/EmployeeNameInput';
import AttendanceRow from '../components/AttendanceRow';
import TotalHoursRow from '../components/TotalHoursRow';

interface AttendanceData {
  workHours: Record<string, number>;
}

interface PageProps {
  initialData: AttendanceData;
}

// Główny komponent aplikacji odpowiadający za tabelę danych.
const AttendanceTable: React.FC<PageProps> = () => {
  const [editableData, setEditableData] = useState<AttendanceData | null>(null);
  const [employeeName, setEmployeeName] = useState<string>("");
  const [savedData, setSavedData] = useState<AttendanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Domyślnie ustawiamy jako loading

  // Fetch danych z API w useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/sampleData');
        const data: AttendanceData = await res.json();
        setEditableData(data);
        setSavedData(data);
      } catch (error) {
        console.error('Błąd ładowania danych:', error);
      } finally {
        setLoading(false); // Zakończenie ładowania
      }
    };

    fetchData();
  }, []); // Efekt tylko raz, przy pierwszym załadowaniu

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
      setSavedData(editableData);
      alert('Dane zostały zapisane.');
    }
  };

  const handleReset = () => {
    if (savedData) {
      setEditableData(savedData);
      alert('Przywrócono zapisane dane.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!editableData || !editableData.workHours) {
    return <div>Brak danych do wyświetlenia.</div>;
  }

  const totalHours = Object.values(editableData.workHours).reduce(
    (acc, hours) => acc + hours,
    0
  );

  return (
    <div className="p-4">
      <EmployeeNameInput employeeName={employeeName} onChange={handleNameChange} />

      {employeeName && (
        <h2 className="text-lg font-semibold mb-4">
          Obecność pracownika: {employeeName}
        </h2>
      )}

      <table className="border-collapse border border-gray-300 w-full mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Data</th>
            <th className="border border-gray-300 p-2">Liczba godzin</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(editableData.workHours).map(([date, hours]) => (
            <AttendanceRow
              key={date}
              date={date}
              hours={hours}
              onHoursChange={handleHoursChange}
            />
          ))}
          <TotalHoursRow totalHours={totalHours} />
        </tbody>
      </table>

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
