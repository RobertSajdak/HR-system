'use client';

import { useEffect, useState } from "react";

interface AttendanceData {
  workHours: { [date: string]: number };
}

const AttendanceTable: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null);
  const [editableData, setEditableData] = useState<AttendanceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdited, setIsEdited] = useState(false);

  // Fetch data from the sampleData endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/sampleData");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setAttendanceData(data);
        setEditableData(data); // Initially, editable data is the same as fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle changes in the hours input field
  const handleChange = (date: string, value: string) => {
    if (editableData) {
      const parsedValue = parseFloat(value);
      if (parsedValue >= 0 && parsedValue <= 24) {
        const updatedData = {
          ...editableData,
          workHours: {
            ...editableData.workHours,
            [date]: parsedValue,
          },
        };
        setEditableData(updatedData);
        setIsEdited(true);
      }
    }
  };

  // Save changes to the API
  const handleSave = async () => {
    if (editableData) {
      try {
        const response = await fetch("/api/attendance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editableData),
        });

        if (response.ok) {
          console.log("Data saved successfully");
          setIsEdited(false); // Reset edited state after saving
        } else {
          throw new Error("Failed to save data");
        }
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
  };

  // Reset changes
  const handleReset = () => {
    if (attendanceData) {
      setEditableData(attendanceData); // Reset editable data to the original
      setIsEdited(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!attendanceData) {
    return <div>Error: No data found</div>;
  }

  // Calculate total hours worked for the month
  const totalHours = Object.values(editableData?.workHours ?? {}).reduce(
    (acc, hours) => acc + hours,
    0
  );

  return (
    <div>
      <table border={1} className="table-auto w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Work Hours</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(editableData?.workHours ?? {}).map((date) => (
            <tr key={date}>
              <td>{date}</td>
              <td>
                <input
                  type="number"
                  value={editableData?.workHours[date] ?? ""}
                  onChange={(e) => handleChange(date, e.target.value)}
                  min="0"
                  max="24"
                  className="border px-2 py-1"
                />
              </td>
            </tr>
          ))}
          <tr>
            <td><strong>Total Hours</strong></td>
            <td>{totalHours}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={handleSave}
          disabled={!isEdited}
          className="bg-blue-500 text-white px-4 py-2 mr-2"
        >
          Save
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;
