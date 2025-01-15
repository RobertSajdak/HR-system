"use client";

import { useEffect, useState } from "react";
import AttendanceTable from "../components/AttendanceTable";

interface AttendanceData {
  workHours: Record<string, number>;
}

const Page: React.FC = () => {
  const [data, setData] = useState<AttendanceData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/sampleData");
        const fetchedData: AttendanceData = await res.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Błąd ładowania danych:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      {/* Przekazujemy dane do AttendanceTable */}
      <AttendanceTable initialData={data} />
    </div>
  );
};

export default Page;
