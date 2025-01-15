// Komponent odpowiedzialny za pojedynczy wiersz tabeli z godzinami pracy.

interface AttendanceRowProps {
    date: string;
    hours: number;
    onHoursChange: (date: string, value: string) => void;
  }
  
  const AttendanceRow: React.FC<AttendanceRowProps> = ({ date, hours, onHoursChange }) => {
    return (
      <tr key={date}>
        <td className="border border-gray-300 p-2">{date}</td>
        <td className="border border-gray-300 p-2">
          <input
            type="number"
            value={hours}
            onChange={(e) => onHoursChange(date, e.target.value)}
            min="0"
            max="24"
            className="w-full border border-gray-300 rounded p-1"
          />
        </td>
      </tr>
    );
  };
  
  export default AttendanceRow;
  