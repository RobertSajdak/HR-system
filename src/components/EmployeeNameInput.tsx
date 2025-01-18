import React from 'react';

interface EmployeeNameInputProps {
	employeeName: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Komponent odpowiedzialny za wyświetlanie inputa do wpisania imienia pracownika.
const EmployeeNameInput: React.FC<EmployeeNameInputProps> = ({ employeeName, onChange }) => {
	return (
		<div className="mb-4">
			<label htmlFor="employee-name" className="block text-sm font-medium text-gray-700">
				Imię i nazwisko pracownika:
			</label>
			<input
				id="employee-name"
				type="text"
				value={employeeName}
				onChange={onChange}
				className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				placeholder="Podaj imię i nazwisko"
			/>
		</div>
	);
};

export default EmployeeNameInput;
