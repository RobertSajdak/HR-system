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
	const [loading, setLoading] = useState<boolean>(false); // Inicjalizacja stanu "false"

	// Pobiera dane z API przy inicjalizacji plikacji.
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await fetch('/api/work-hours'); // Upewnia się, że API działa poprawnie
				if (!res.ok) {
					throw new Error(`Błąd HTTP: ${res.status}`);
				}
				const data: AttendanceData = await res.json();
				setEditableData(data);
				setSavedData(data);
			} catch (error) {
				console.error('Błąd ładowania danych:', error);
			} finally {
				setLoading(false);
			}
		};

		if (!initialData || !initialData.workHours) {
			fetchData(); // Pobiera dane tylko, jeśli initialData jest puste
		}
	}, [initialData]);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmployeeName(e.target.value);
	};

	// Aktualizacja danych w API
	const handleHoursChange = async (date: string, value: string) => {
		const hours = parseInt(value, 10);
		if (!isNaN(hours) && hours >= 0 && hours <= 24) {
			const updatedData = {
				...editableData,
				workHours: {
					...editableData.workHours,
					[date]: hours,
				},
			};

			setEditableData(updatedData);

			try {
				await fetch('/api/work-hours', {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ date, hours }),
				});
			} catch (error) {
				console.error('Błąd aktualizacji danych:', error);
			}
		}
	};

	// Zapis / wysyłka danych do API
	const handleSave = async () => {
		if (editableData) {
			try {
				const response = await fetch('/api/work-hours', {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(editableData),
				});

				if (response.ok) {
					setSavedData(editableData); // Aktualizacja zapisanych danych
					alert('Dane zostały zapisane!');
				} else {
					alert('Błąd podczas zapisywania danych.');
				}
			} catch (error) {
				console.error('Błąd zapisu danych:', error);
				alert('Błąd podczas zapisywania danych.');
			}
		}
	};

	// Odświeżanie / reset danych
	const handleReset = () => {
		if (savedData && savedData.workHours) {
			setEditableData(savedData); // Przywraca zapisane dane
			alert('Zapisane dane zostały przywrócone!');
		} else {
			alert('Brak zapisanych danych do przywrócenia.');
		}
	};

	// Dodawanie nowego wiersza
	const handleAddRow = async () => {
		try {
			const newEntry = {
				date: new Date().toISOString().split('T')[0], // Aktualna data
				hours: 0,
			};

			const response = await fetch('/api/work-hours', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newEntry),
			});

			if (response.ok) {
				const addedEntry = await response.json();
				setEditableData({
					...editableData,
					workHours: {
						...editableData.workHours,
						[addedEntry.date]: addedEntry.hours,
					},
				});
			} else {
				console.error('Błąd dodawania wiersza:', response.statusText);
			}
		} catch (error) {
			console.error('Błąd dodawania:', error);
		}
	};

	// Usuwanie pojedynczego wiersza
	const handleDeleteRow = async (date: string) => {
		try {
			const response = await fetch('/api/work-hours', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ date }),
			});

			if (response.ok) {
				const filteredData = { ...editableData };
				delete filteredData.workHours[date];
				setEditableData(filteredData);
			} else {
				console.error('Błąd usuwania wiersza:', response.statusText);
			}
		} catch (error) {
			console.error('Błąd usuwania:', error);
		}
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
					{Object.entries(editableData.workHours || {}).length > 0 ? (
						Object.entries(editableData.workHours).map(([date, hours]) => (
							<AttendanceRow
								key={date}
								date={date}
								hours={hours}
								onHoursChange={handleHoursChange}
								onDeleteRow={handleDeleteRow}
							/>
						))
					) : (
						<tr>
							<td colSpan={3} className="text-center p-4">
								Brak danych do wyświetlenia.
							</td>
						</tr>
					)}

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
			<button
				onClick={handleAddRow}
				className="bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-all ease-in-out"
			>
				Dodaj wiersz
			</button>
		</div>
	);
};

export default AttendanceTable;
