import React from 'react';

// Komponent odpowiedzialny za wiersz sumujący godziny pracy.
interface TotalHoursRowProps {
	totalHours: number;
}

const TotalHoursRow: React.FC<TotalHoursRowProps> = ({ totalHours }) => {
	// Jeśli totalHours jest NaN, ustawiam wartość domyślną 0
	const displayTotalHours = isNaN(totalHours) ? 0 : totalHours;

	return (
		<tr className="bg-gray-200 font-bold">
			<td className="border border-gray-300 p-2 text-left">Łącznie</td>
			<td className="border border-gray-300 p-2 pl-4 text-left">{displayTotalHours}</td>
		</tr>
	);
};

export default TotalHoursRow;
