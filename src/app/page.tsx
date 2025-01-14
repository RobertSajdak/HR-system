'use client';

import { useEffect, useState } from "react";
import AttendanceTable from '../components/AttendanceTable';

const Page = () => {
  const [data, setData] = useState<{ workHours: { [key: string]: number } } | null>(null);

  // Pobranie danych z API przy starcie
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/sampleData');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  // Jeżeli dane nie zostały jeszcze załadowane
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>System Obecności Pracownika</h1>
      {/* Przekazujemy dane do komponentu AttendanceTable */}
      <AttendanceTable initialData={data.workHours} />
    </div>
  );
};

export default Page;
