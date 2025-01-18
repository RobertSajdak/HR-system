import React from 'react';

// Komponent odpowiedzialny za pojedynczy wiersz tabeli z godzinami pracy.
interface AttendanceRowProps {
	date: string;
	hours: number;
	onHoursChange: (date: string, value: string) => void;
	onDeleteRow: (date: string) => void; // Funkcja usuwania przekazana z komponentu nadrzędnego
}

const AttendanceRow: React.FC<AttendanceRowProps> = ({
	date,
	hours,
	onHoursChange,
	onDeleteRow,
}) => {
	return (
		<tr>
			<td className="border border-gray-300 p-2 text-left">{date}</td>
			<td className="border border-gray-300 p-2 text-left">
				<input
					type="number"
					value={hours}
					onChange={e => onHoursChange(date, e.target.value)}
					min="0"
					max="24"
					className="w-full border border-gray-300 rounded-md p-2"
				/>
			</td>
			<td className="border border-gray-300 p-2 text-left">
				<button
					onClick={() => onDeleteRow(date)} // Wywołanie funkcji usuwania
					className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all"
				>
					Usuń
				</button>
			</td>
		</tr>
	);
};

export default AttendanceRow;
