// Komponent odpowiedzialny za wiersz sumujący godziny pracy.

interface TotalHoursRowProps {
    totalHours: number;
  }
  
  const TotalHoursRow: React.FC<TotalHoursRowProps> = ({ totalHours }) => {
    return (
      <tr className="bg-gray-100 font-bold">
        <td className="border border-gray-300 p-2">Łącznie</td>
        <td className="border border-gray-300 p-2">{totalHours}</td>
      </tr>
    );
  };
  
  export default TotalHoursRow;
  