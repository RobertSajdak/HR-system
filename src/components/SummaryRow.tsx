import React from "react";
import { WorkHours } from "../types/attendance";

interface Props {
    data: WorkHours;
}

const SummaryRow: React.FC<Props> = ({ data }) => {
    const totalHours = Object.values(data).reduce((sum, hours) => sum + hours, 0);

    return (
        <div className="text-right font-bold mt-2">
            Total Hours: {totalHours}
        </div>
    );
};

export default SummaryRow;
