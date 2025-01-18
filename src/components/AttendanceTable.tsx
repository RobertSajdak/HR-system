'use client';

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
const AttendanceTable: React.FC<PageProps> = ({ initialData }) => {
	const [editableData, setEditableData] = useState<AttendanceData>(initialData);
	const [employeeName, setEmployeeName] = useState<string>('');
	const [savedData, setSavedData] = useState<AttendanceData>(initialData);
	const [loading, setLoading] = useState<boolean>(false); // Inicjalizujemy jako false

	// Fetch danych z API w useEffect
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await fetch('/api/work-hours');
				const data: AttendanceData = await res.json();
				setEditableData(data);
				setSavedData(data);
			} catch (error) {
				console.error('Błąd ładowania danych:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData(); // Zawsze dane pobierane są z API
	}, []);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmployeeName(e.target.value);
	};

	const handleHoursChange = (date: string, value: string) => {
		const hours = parseInt(value, 10);
		if (!isNaN(hours) && hours >= 0 && hours <= 24 && editableData) {
			setEditableData({
				...editableData,
				workHours: {
					...editableData.workHours,
					[date]: hours,
				},
			});
		}
	};

	// Funkcja handleSave() wysyła dane do API
	const handleSave = async () => {
		try {
			const response = await fetch('/api/work-hours', {
				method: 'PUT', // Użycie PUT do aktualizacji
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(editableData),
			});

			if (response.ok) {
				const updatedData = await response.json();
				setSavedData(updatedData);
				alert('Dane zostały zapisane.');
			} else {
				console.error('Błąd zapisu danych:', response.statusText);
			}
		} catch (error) {
			console.error('Błąd zapisu:', error);
		}
	};

	const handleReset = () => {
		setEditableData(savedData);
		alert('Przywrócono zapisane dane.');
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!editableData || !editableData.workHours) {
		return <div>Brak danych do wyświetlenia.</div>;
	}

	const totalHours = Object.values(editableData.workHours).reduce((acc, hours) => acc + hours, 0);

	return (
		<div className="p-4">
			<EmployeeNameInput employeeName={employeeName} onChange={handleNameChange} />

			{employeeName && (
				<h2 className="text-lg font-semibold mb-4">Obecność pracownika: {employeeName}</h2>
			)}

			<table className="border-collapse border border-gray-300 w-full mt-6">
				<thead>
					<tr>
						<th className="border border-gray-300 p-3 bg-gray-100 text-left">Data</th>
						<th className="border border-gray-300 p-3 bg-gray-100 text-left">
							Liczba godzin
						</th>
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

			<div className="flex space-x-4 mt-6">
				<button
					onClick={handleSave}
					className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-all ease-in-out"
				>
					Zapisz
				</button>
				<button
					onClick={handleReset}
					className="bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700 transition-all ease-in-out"
				>
					Odśwież
				</button>
			</div>
		</div>
	);
};

export default AttendanceTable;
