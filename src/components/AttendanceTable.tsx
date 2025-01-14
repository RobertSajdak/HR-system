import React, { useState } from "react";
import { WorkHours } from "../types/attendance";

interface Props {
    initialData: WorkHours;
    onUpdate: (updatedData: WorkHours) => void;
}

const AttendanceTable: React.FC<Props> = ({ initialData, onUpdate }) => {
    const [data, setData] = useState(initialData);

    const handleChange = (date: string, value: string) => {
        const hours = parseInt(value) || 0;
        setData((prev) => ({ ...prev, [date]: hours }));
    };

    return (
        <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Hours</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(data).map(([date, hours]) => (
                    <tr key={date}>
                        <td className="border border-gray-300 px-4 py-2">{date}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <input
                                type="number"
                                value={hours}
                                onChange={(e) => handleChange(date, e.target.value)}
                                className="w-full text-center"
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default AttendanceTable;
