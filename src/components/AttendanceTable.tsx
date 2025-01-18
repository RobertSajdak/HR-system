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

const AttendanceTable: React.FC<PageProps> = ({ initialData }) => {
	const [editableData, setEditableData] = useState<AttendanceData>(initialData);
	const [savedData, setSavedData] = useState<AttendanceData>(initialData);
	const [employeeName, setEmployeeName] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	// Pobieranie danych inicjalizujących z API
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await fetch('/api/work-hours');
				if (!res.ok) throw new Error(`Błąd HTTP: ${res.status}`);
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
			fetchData();
		}
	}, [initialData]);

	// Aktualizacja danych pracownika
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmployeeName(e.target.value);
	};

	// Funkcja zmiany godzin
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

	// Zapis danych do API
	const handleSave = async () => {
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
	};

	// Funkcja resetu (odświeżania) danych
	const handleReset = async () => {
		setEditableData(savedData); // Przywracanie zapisanych danych
		alert('Zapisane dane zostały przywrócone!');
	};

	// Dodawanie nowego wiersza
	const handleAddRow = async () => {
		try {
			// Pobiera ostatnią datę z tabeli
			const dates = Object.keys(editableData.workHours);
			const lastDate = dates.length > 0 ? new Date(dates[dates.length - 1]) : new Date();

			// Dodaje jeden dzień do ostatniej daty
			const newDate = new Date(lastDate);
			newDate.setDate(newDate.getDate() + 1);

			// Format daty do postaci YYYY-MM-DD
			const formattedDate = newDate.toISOString().split('T')[0];

			// Tworzenie nowego wiersza
			const newEntry = {
				date: formattedDate,
				hours: 0,
			};

			// Wysłanie żądania do API
			const response = await fetch('/api/work-hours', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newEntry),
			});

			if (response.ok) {
				// Aktualizacja stanu tabeli
				setEditableData({
					...editableData,
					workHours: {
						...editableData.workHours,
						[formattedDate]: 0,
					},
				});
			} else {
				console.error('Błąd dodawania wiersza:', response.statusText);
			}
		} catch (error) {
			console.error('Błąd dodawania:', error);
		}
	};

	// Usuwanie wiersza
	const handleDeleteRow = async (date: string) => {
		try {
			const response = await fetch('/api/work-hours', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ date }),
			});

			if (response.ok) {
				setEditableData(prevState => {
					const updatedWorkHours = { ...prevState.workHours };
					delete updatedWorkHours[date];
					return { ...prevState, workHours: updatedWorkHours };
				});
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

					<TotalHoursRow totalHours={totalHours || 0} />
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
