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
			<td className="w-40 p-2 text-left">{date}</td>
			<td className="w-auto p-2 flex items-center space-x-4">
				<input
					type="number"
					value={hours}
					onChange={e => onHoursChange(date, e.target.value)}
					min="0"
					max="24"
					className="w-8 rounded-md p-2 text-left"
				/>
				<button
					onClick={() => onDeleteRow(date)} // Wywołanie funkcji usuwania
					className="w-40 h-8 justify-items-end bg-red-400 text-white px-2 rounded-2xl hover:bg-red-600 transition-all"
				>
					Usuń wiersz
				</button>
			</td>
		</tr>
	);
};

export default AttendanceRow;
