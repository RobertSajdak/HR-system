import React from "react";

// Komponent odpowiedzialny za wprowadzanie imienia i nazwiska pracownika.
interface EmployeeNameInputProps {
    employeeName: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const EmployeeNameInput: React.FC<EmployeeNameInputProps> = ({ employeeName, onChange }) => {
    return (
      <div className="mb-6">
        <label htmlFor="employeeName" className="block font-medium text-lg mb-2">
          Imię i nazwisko pracownika:
        </label>
        <input
          id="employeeName"
          type="text"
          value={employeeName}
          onChange={onChange}
          placeholder="Wpisz imię i nazwisko"
          className="border border-gray-300 rounded-md p-3 w-full text-lg"
        />
      </div>
    );
  };
  
  export default EmployeeNameInput;
  