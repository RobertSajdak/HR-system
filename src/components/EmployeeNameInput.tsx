// Komponent odpowiedzialny za wprowadzanie imienia i nazwiska pracownika.

interface EmployeeNameInputProps {
    employeeName: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const EmployeeNameInput: React.FC<EmployeeNameInputProps> = ({ employeeName, onChange }) => {
    return (
      <div className="mb-4">
        <label htmlFor="employeeName" className="block font-medium mb-2">
          Imię i nazwisko pracownika:
        </label>
        <input
          id="employeeName"
          type="text"
          value={employeeName}
          onChange={onChange}
          placeholder="Wpisz imię i nazwisko"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
    );
  };
  
  export default EmployeeNameInput;
  