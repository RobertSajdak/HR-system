import React from 'react';

interface EmployeeNameInputProps {
	value: string; // Aktualna wartość inputu
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Funkcja obsługująca zmianę wartości
}

const EmployeeNameInput: React.FC<EmployeeNameInputProps> = ({ value, onChange }) => {
	return (
		<div className="mb-4">
			<label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">
				Imię i nazwisko pracownika
			</label>
			<input
				type="text"
				id="employeeName"
				value={value}
				onChange={onChange}
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="Wprowadź imię i nazwisko"
			/>
		</div>
	);
};

export default EmployeeNameInput;
