import React from 'react';
import AttendanceRow from './AttendanceRow';
import TotalHoursRow from './TotalHoursRow';

interface AttendanceTableBodyProps {
	workHours: Record<string, number>;
	handleHoursChange: (date: string, value: string) => void;
	handleDeleteRow: (date: string) => void;
	totalHours: number;
}

const AttendanceTableBody: React.FC<AttendanceTableBodyProps> = ({
	workHours,
	handleHoursChange,
	handleDeleteRow,
	totalHours,
}) => (
	<tbody>
		{Object.entries(workHours).length > 0 ? (
			Object.entries(workHours).map(([date, hours]) => (
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
);

export default AttendanceTableBody;
