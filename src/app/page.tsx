import AttendanceTable from "@/components/AttendanceTable";

const Home = () => {
    const testData = {
        "2024-12-01": 8,
        "2024-12-02": 6,
        "2024-12-03": 0,
        "2024-12-04": 0,
        "2024-12-05": 0,
        "2024-12-06": 0,
        "2024-12-07": 0,
        "2024-12-08": 0,
        "2024-12-09": 0,
        "2024-12-10": 0,
        "2024-12-11": 0,
        "2024-12-12": 0,
        "2024-12-13": 0,
        "2024-12-14": 0,
        "2024-12-15": 0,
        "2024-12-16": 0,
        "2024-12-17": 0,
        "2024-12-18": 0,
        "2024-12-19": 0,
        "2024-12-20": 0,
        "2024-12-21": 0,
        "2024-12-22": 0,
        "2024-12-23": 0,
        "2024-12-24": 0,
        "2024-12-25": 0,
        "2024-12-26": 0,
        "2024-12-27": 0,
        "2024-12-28": 0,
        "2024-12-29": 0,
        "2024-12-30": 0,
        "2024-12-31": 0,
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <h1>Witaj w HR System!</h1>
            <p>Zarządzaj efektywnie czasem pracy swojego zespołu</p>
            <AttendanceTable initialData={testData} />
        </div>
    );
};

export default Home;

