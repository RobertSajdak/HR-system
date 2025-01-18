import { useState, useEffect } from 'react';

interface AttendanceData {
	workHours: Record<string, number>;
}

const useAttendanceData = (initialData: AttendanceData) => {
	const [editableData, setEditableData] = useState<AttendanceData>(initialData);
	const [savedData, setSavedData] = useState<AttendanceData>(initialData);
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
			const dates = Object.keys(editableData.workHours);
			const lastDate = dates.length > 0 ? new Date(dates[dates.length - 1]) : new Date();
			const newDate = new Date(lastDate);
			newDate.setDate(newDate.getDate() + 1);
			const formattedDate = newDate.toISOString().split('T')[0];

			const newEntry = { date: formattedDate, hours: 0 };

			const response = await fetch('/api/work-hours', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newEntry),
			});

			if (response.ok) {
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

	return {
		editableData,
		savedData,
		loading,
		handleHoursChange,
		handleSave,
		handleReset,
		handleAddRow,
		handleDeleteRow,
	};
};

export default useAttendanceData;
