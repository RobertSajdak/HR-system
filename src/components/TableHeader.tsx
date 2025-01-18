import React from 'react';

const TableHeader: React.FC = () => {
	return (
		<thead>
			<tr>
				<th className="border border-gray-300 p-3 bg-gray-200 text-left">Data</th>
				<th className="border border-gray-300 p-3 bg-gray-200 text-left">Liczba godzin w pracy</th>
				<th className="border border-gray-300 p-3 bg-gray-200 text-left">Uwagi i informacje dodatkowe</th>
			</tr>
		</thead>
	);
};

export default TableHeader;
