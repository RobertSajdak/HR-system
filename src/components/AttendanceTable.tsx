'use client';

import React from 'react';

// Components:
import EmployeeNameInput from './EmployeeNameInput';
import ActionButtons from './ActionButtons';
import TableHeader from './TableHeader';
import AttendanceTableBody from './AttendanceTableBody';

// Custom hooks:
import useAttendanceData from '../hooks/useAttendanceData';
import useEmployeeName from '../hooks/useEmployeeName';

interface AttendanceData {
	workHours: Record<string, number>;
}

interface PageProps {
	initialData: AttendanceData;
}

const AttendanceTable: React.FC<PageProps> = ({ initialData }) => {
	const { employeeName, handleNameChange } = useEmployeeName(); // Korzystamy z custom hooka
	const {
		editableData,
		loading,
		handleHoursChange,
		handleSave,
		handleReset,
		handleAddRow,
		handleDeleteRow,
	} = useAttendanceData(initialData); // Korzystamy z custom hooka

	const totalHours = Object.values(editableData.workHours).reduce((acc, hours) => acc + hours, 0);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!editableData || !editableData.workHours) {
		return <div>Brak danych do wyświetlenia.</div>;
	}

	return (
		<div className="p-4">
			<EmployeeNameInput value={employeeName} onChange={handleNameChange} />

			{employeeName && (
				<h2 className="text-lg font-semibold mb-4">
					Lista obecności pracownika: {employeeName}
				</h2>
			)}

			<table className="border-collapse border border-gray-300 w-full mt-6">
				<TableHeader />
				<AttendanceTableBody
					workHours={editableData.workHours}
					handleHoursChange={handleHoursChange}
					handleDeleteRow={handleDeleteRow}
					totalHours={totalHours}
				/>
			</table>

			<ActionButtons onSave={handleSave} onReset={handleReset} onAddRow={handleAddRow} />
		</div>
	);
};

export default AttendanceTable;
