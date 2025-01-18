import { useState } from 'react';

const useEmployeeName = () => {
	const [employeeName, setEmployeeName] = useState<string>('');

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmployeeName(e.target.value);
	};

	return { employeeName, setEmployeeName, handleNameChange };
};

export default useEmployeeName;
